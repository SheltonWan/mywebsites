# 多域名 Nginx 迁移方案

> 目标：将静态网站从 backend 镜像中剥离，由 Nginx 统一对外托管，backend 仅暴露内网 API。

---

## 架构对比

### 迁移前

```
Internet :80/:443
    │
 [backend 容器]  ← 同时托管 API + 4 个静态站
    ├── shelf_static (sango/)
    ├── shelf_static (sangoplay/)
    ├── shelf_static (mini/)
    ├── shelf_static (public/)
    └── Dart API 路由
```

### 迁移后

```
Internet :80/:443
    │
 [Nginx 容器]
    ├── sangogame.com         → /var/www/sangogame/
    │       └── /sangoplay/   → /var/www/sangoplay/
    ├── ibookjoy.com          → /var/www/mini/
    └── ycwithyou.com         → /var/www/ycwithyou/
            └── /api/*        → backend:8080 (内网)

 [backend 容器] :8080 — 仅内网，不对外绑定端口
 [certbot 容器]         — Let's Encrypt 证书自动申请/续签
```

---

## 域名映射表

| 域名 | 静态内容来源 | 服务器目录 | API 代理 |
|---|---|---|---|
| `sangogame.com` | `sangogame.com/out/` | `/opt/iwithyou/static/sangogame/` | 无 |
| `sangogame.com/sangoplay/` | `backend/sangoplay/`（Flutter build） | `/opt/iwithyou/static/sangoplay/` | 无 |
| `ibookjoy.com` | `ibookjoy.com/out/` | `/opt/iwithyou/static/mini/` | 无 |
| `ycwithyou.com` | `ycwithyou.com/out/` | `/opt/iwithyou/static/ycwithyou/` | `/api/*` → backend:8080 |

---

## 文件索引

迁移涉及的所有新增/修改文件：

| 文件 | 类型 | 说明 |
|---|---|---|
| `backend/deploy/docker-compose.yml` | 新增 | 服务编排，上传到服务器 |
| `backend/deploy/nginx/conf.d/sangogame.conf` | 新增 | sangogame.com Nginx 配置 |
| `backend/deploy/nginx/conf.d/ibookjoy.conf` | 新增 | ibookjoy.com Nginx 配置 |
| `backend/deploy/nginx/conf.d/ycwithyou.conf` | 新增 | ycwithyou.com Nginx 配置 |
| `backend/deploy/run_compose.sh` | 新增 | 替换服务器上的 run_New.sh |
| `sangogame.com/deploy.sh` | 新增 | sangogame.com 独立部署 |
| `ibookjoy.com/deploy.sh` | 新增 | ibookjoy.com 独立部署 |
| `ycwithyou.com/deploy.sh` | 新增 | ycwithyou.com 独立部署 |
| `backend/deploy_sangoplay.sh` | 新增 | sangoplay 独立部署 |
| `ibookjoy.com/next.config.ts` | 修改 | 删除 basePath（根路径部署） |
| `backend/Dockerfile` | 修改 | 删除 4 个静态文件 COPY |
| `backend/bin/server.dart` | 修改 | 删除 shelf_static 路由挂载 |

---

## 实施步骤

### Phase 1 — 本地代码修改（已完成，可直接验证）

**1.1 ibookjoy.com — 去掉 basePath**

文件：`ibookjoy.com/next.config.ts`

```diff
- const BASE_PATH = '/mini';
  const nextConfig: NextConfig = {
    output: 'export',
-   basePath: BASE_PATH,
-   env: {
-     NEXT_PUBLIC_BASE_PATH: BASE_PATH,
-   },
    images: {
      unoptimized: true,
    },
  };
```

验证：`npm run build`，检查 `out/index.html` 中资源路径是否为 `/_next/` 而非 `/mini/_next/`

**1.2 backend — Dockerfile 精简**

文件：`backend/Dockerfile`，删除末尾 4 行静态 COPY：

```diff
- COPY --from=build /app/public    /app/public
- COPY --from=build /app/sango     /app/sango
- COPY --from=build /app/sangoplay /app/sangoplay
- COPY --from=build /app/mini      /app/mini
```

**1.3 backend — server.dart 精简**

文件：`backend/bin/server.dart`，删除 sango / sangoplay / mini 静态路由挂载（约 7 行），以及 `Cascade` 里的 `createStaticHandler('public', ...)` 行。

---

### Phase 2 — 服务器初始化（SSH 登录执行）

```bash
# 登录服务器
ssh root@$SERVER_IP

# 创建目录结构
mkdir -p /opt/iwithyou/nginx/conf.d
mkdir -p /opt/iwithyou/certbot/{conf,www}
mkdir -p /opt/iwithyou/static/{sangogame,sangoplay,mini,ycwithyou}
mkdir -p /opt/iwithyou/uploads

# 停止旧容器（先记录容器 ID）
docker ps
docker stop <old_container_id>
# 先不 rm，等新架构验证通过后再清理
```

---

### Phase 3 — 上传配置文件（本地执行）

```bash
cd /Users/wanxt/app/iwithyou/backend/deploy

# 上传 docker-compose 和 nginx 配置
scp docker-compose.yml root@$SERVER_IP:/opt/iwithyou/
scp -r nginx/conf.d root@$SERVER_IP:/opt/iwithyou/nginx/
scp run_compose.sh root@$SERVER_IP:/opt/iwithyou/

# 上传服务器端 .env（从 .env_remote 复制，敏感信息不要提交 git）
scp ../.env_remote root@$SERVER_IP:/opt/iwithyou/.env
```

---

### Phase 4 — 申请 Let's Encrypt SSL 证书

**4.1 启动 HTTP-only 临时 Nginx（用于 acme-challenge 验证）**

```bash
ssh root@$SERVER_IP
cd /opt/iwithyou

# 临时启动 nginx（此时 nginx 配置仅包含 80 端口 acme-challenge 验证）
docker compose up -d nginx
```

**4.2 为每个域名申请证书（在服务器执行，共 3 次）**

```bash
# sangogame.com
docker compose run --rm certbot certonly --webroot \
  -w /var/www/certbot \
  -d sangogame.com -d www.sangogame.com \
  --email your@email.com --agree-tos --no-eff-email

# ibookjoy.com
docker compose run --rm certbot certonly --webroot \
  -w /var/www/certbot \
  -d ibookjoy.com -d www.ibookjoy.com \
  --email your@email.com --agree-tos --no-eff-email

# ycwithyou.com
docker compose run --rm certbot certonly --webroot \
  -w /var/www/certbot \
  -d ycwithyou.com -d www.ycwithyou.com \
  --email your@email.com --agree-tos --no-eff-email
```

**4.3 切换到 HTTPS 配置，重载**

```bash
# 将 nginx/conf.d/ 里的配置替换为 HTTPS 完整版
docker compose exec nginx nginx -t   # 验证配置语法
docker compose exec nginx nginx -s reload
```

**4.4 设置自动续签（服务器 crontab）**

```bash
crontab -e
# 加入以下行（每天凌晨 3:10 检查，证书到期前 30 天自动续签）
10 3 * * * cd /opt/iwithyou && docker compose run --rm certbot renew --quiet && docker compose exec nginx nginx -s reload
```

---

### Phase 5 — 首次部署静态文件（本地执行）

```bash
# sangogame.com
cd /Users/wanxt/app/iwithyou/sangogame.com
bash deploy.sh

# ibookjoy.com
cd /Users/wanxt/app/iwithyou/ibookjoy.com
bash deploy.sh

# ycwithyou.com
cd /Users/wanxt/app/iwithyou/ycwithyou.com
bash deploy.sh

# sangoplay（Flutter web，源文件在 backend/sangoplay/）
cd /Users/wanxt/app/iwithyou/backend
bash deploy_sangoplay.sh
```

---

### Phase 6 — 启动完整服务（服务器执行）

```bash
cd /opt/iwithyou

# 启动所有服务
docker compose up -d

# 验证
docker compose ps
curl -I https://sangogame.com
curl -I https://ibookjoy.com
curl -I https://ycwithyou.com
curl https://ycwithyou.com/api/health
curl https://sangogame.com/sangoplay/
```

---

### Phase 7 — 更新 release.command（后端发布流程）

`release.command` 末尾 SSH 调用改为：

```bash
REMOTE_SCRIPT="bash /opt/iwithyou/run_compose.sh $REMOTE_IMAGE_NAME ${new_version}"
sshpass -p "$SERVER_PASSWORD" ssh root@$SERVER_IP "$REMOTE_SCRIPT"
```

---

### Phase 8 — 清理旧容器

验证所有站点正常后：

```bash
ssh root@$SERVER_IP
docker rm <old_container_id>   # 清理旧 backend 容器
docker rmi <old_image_id>      # 清理旧镜像（可选）
```

---

## 验证清单

| 检查项 | 命令 | 期望结果 |
|---|---|---|
| HTTP → HTTPS 重定向 | `curl -I http://sangogame.com` | `301 → https://` |
| HTTPS 证书有效 | `curl -I https://sangogame.com` | `200 OK` |
| sangogame 主页 | `curl https://sangogame.com/` | Next.js 静态 HTML |
| sangoplay 子路径 | `curl https://sangogame.com/sangoplay/` | Flutter web index |
| ibookjoy 主页 | `curl https://ibookjoy.com/` | Next.js 静态 HTML |
| ycwithyou 主页 | `curl https://ycwithyou.com/` | Next.js 静态 HTML |
| API 代理 | `curl https://ycwithyou.com/api/health` | `{"status":"ok"}` |
| backend 不对外暴露 | `curl http://<SERVER_IP>:8080` | 连接拒绝 |

---

## 回滚方案

如新架构出现问题，可立刻回到旧容器：

```bash
ssh root@$SERVER_IP
docker compose down
docker run ... <old_image>   # 按旧 run_New.sh 参数启动
```

由于旧容器没有删除，回滚仅需 30 秒。
