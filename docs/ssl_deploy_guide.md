# sangogame.com 域名绑定与 SSL 部署指南

> 适用于当前后端架构：Dart Shelf 服务运行在 Docker 容器中，通过 `run_New.sh` 启动。
>
> 本文档同时说明域名内容绑定（将独立域名指向现有路径内容）与 SSL 证书部署两部分的**代码实现原理**，方便后续添加类似域名时参考。

---

## 架构说明

```
浏览器
  │
  ├── http://sangogame.com  (80 端口) → 容器内 8080 → 301 跳转到 https://
  └── https://sangogame.com (443 端口) → 容器内 443 → sango 静态页面
```

证书文件存放于**服务器本地**，通过 `-v` volume 只读挂载进容器，**不打包进镜像**。

---

## 代码实现说明（新增域名时参考此节）

所有改动均在 `backend/bin/server.dart` 和 `backend/run_New.sh` 中完成，**无需 nginx，无需修改 Docker 镜像结构**。

### 第一部分：域名内容绑定

**目标**：访问 `sangogame.com` 时，直接展示 `sango/` 目录的静态内容，URL 保持干净（不带 `/sango/` 前缀），且不影响 `ycwithyou.com` 的任何功能。

**原理**：在 Dart 中间件里检测请求的 `Host` 头，匹配到目标域名时使用独立的静态文件处理器响应，否则交给正常路由。

**`server.dart` 改动 — 新增中间件函数**：

```dart
/// 域名路由中间件：sangogame.com 在根路径直接提供 sango 静态目录内容。
Middleware _sangoGameDomainMiddleware() {
  final sangoRootHandler =
      createStaticHandler('sango', defaultDocument: 'index.html');

  return (Handler innerHandler) {
    // sangogame.com 流量：先尝试 sango 静态文件，找不到再走正常路由
    final sangoCascade =
        Cascade().add(sangoRootHandler).add(innerHandler).handler;

    return (Request request) {
      final host = request.headers['host'] ?? '';
      if (host == 'sangogame.com' || host == 'www.sangogame.com') {
        return sangoCascade(request);
      }
      return innerHandler(request);
    };
  };
}
```

**将中间件加入管线**：

```dart
final handler = Pipeline()
    .addMiddleware(logRequests())
    .addMiddleware(_sangoGameDomainMiddleware())  // ← 新增
    .addMiddleware(authMiddleware())
    .addHandler(app);
```

---

### 第二部分：HTTPS 支持

**目标**：
- `http://sangogame.com` → 301 跳转到 `https://sangogame.com`
- `https://sangogame.com` → 正常展示内容
- `ycwithyou.com` 不受影响（仍走 HTTP）

**原理**：HTTP 和 HTTPS 分别创建独立的处理管线，HTTP 管线对目标域名额外插入重定向中间件；服务启动时检测证书文件是否存在，存在则额外监听 443 端口。

**`server.dart` 改动 — 新增重定向中间件函数**：

```dart
/// sangogame.com HTTP → HTTPS 重定向中间件，其余域名不受影响。
Middleware _sangoHttpToHttpsRedirect() {
  return (Handler innerHandler) {
    return (Request request) {
      final host = request.headers['host'] ?? '';
      if (host == 'sangogame.com' || host == 'www.sangogame.com') {
        final httpsUri = request.requestedUri.replace(scheme: 'https');
        return Response.movedPermanently(httpsUri.toString());
      }
      return innerHandler(request);
    };
  };
}
```

**`server.dart` 改动 — 分离 HTTP / HTTPS 管线，按需启动 443**：

```dart
// HTTPS 管线（不含重定向，直接提供内容）
final httpsHandler = Pipeline()
    .addMiddleware(logRequests())
    .addMiddleware(_sangoGameDomainMiddleware())
    .addMiddleware(authMiddleware())
    .addHandler(app);

// HTTP 管线（sangogame.com 请求 → 301 跳转）
final httpHandler = Pipeline()
    .addMiddleware(logRequests())
    .addMiddleware(_sangoHttpToHttpsRedirect())   // ← 新增
    .addMiddleware(_sangoGameDomainMiddleware())
    .addMiddleware(authMiddleware())
    .addHandler(app);

// HTTP 服务（原有，端口不变）
final server = await serve(httpHandler, ip, port);

// HTTPS 服务（证书存在才启动）
final certDir = Platform.environment['SSL_CERT_DIR'] ?? '/app/certs';
final certFile = File('$certDir/sangogame.com_bundle.pem');
final keyFile  = File('$certDir/sangogame.com.key');
if (await certFile.exists() && await keyFile.exists()) {
  final securityContext = SecurityContext()
    ..useCertificateChain(certFile.path)
    ..usePrivateKey(keyFile.path);
  await serve(httpsHandler, ip, 443, securityContext: securityContext);
}
```

**`run_New.sh` 改动 — 自动挂载证书**：

```bash
SSL_CERT_HOST_DIR="/etc/ssl/sangogame_ssl"

if [ -d "$SSL_CERT_HOST_DIR" ]; then
  HTTPS_OPTS="-p 443:443 -v $SSL_CERT_HOST_DIR:/app/certs:ro -e SSL_CERT_DIR=/app/certs"
fi

docker run ... -p 80:8080 $HTTPS_OPTS $repository:$repository_version
```

---

### 新增类似域名的步骤模板

若将来需要为另一个域名（如 `example.com`）绑定现有某个路径（如 `mini/`）并配置 SSL，参照以下步骤：

1. **`server.dart`** — 新增两个中间件函数，仿照 `_sangoGameDomainMiddleware()` 和 `_sangoHttpToHttpsRedirect()`，将域名和静态目录名换掉
2. **`server.dart`** — 在 HTTP/HTTPS 管线中插入新中间件；在启动逻辑中新增对应证书文件路径的检测和 `serve()` 调用（若需独立端口则用不同端口，若复用 443 则需 SNI 支持）
3. **`run_New.sh`** — 新增对应证书目录的检测和挂载逻辑
4. **`.dockerignore`** — 确保证书目录已添加到排除列表
5. 腾讯云下载"其他"格式证书 → `scp` 上传服务器 → 重新构建发布

> **注意**：当前实现每个 HTTPS 域名需要独立端口（443 只能绑定一个证书），如需多域名复用 443 端口，需引入 SNI（Server Name Indication），Dart `SecurityContext` 目前不原生支持动态 SNI，建议在域名数量增多时改用 nginx。

---

## 一、下载腾讯云证书

1. 登录 [腾讯云 SSL 证书控制台](https://console.cloud.tencent.com/ssl)
2. 找到 `sangogame.com` 证书 → 点击**下载**
3. 格式选择 **"其他"**（得到标准 PEM 格式，直接适配 Dart `SecurityContext`）
4. 解压后得到（已存放于本地 `backend/sangogame_ssl/`）：
   ```
   sangogame.com_bundle.pem   ← 证书链（含中间证书）
   sangogame.com.key          ← 私钥
   sangogame.com_bundle.crt   ← 证书（备用，运行时不使用）
   sangogame.com.csr          ← 证书签名请求（运行时不使用）
   ```

---

## 二、上传证书到服务器

将 `backend/sangogame_ssl/` 目录整体上传到服务器：

```bash
# 本地执行，将整个证书目录上传到服务器
scp -r backend/sangogame_ssl root@43.139.137.75:/etc/ssl/sangogame_ssl
```

---

## 三、服务器上放置证书

SSH 登录服务器后执行：

```bash
# 设置安全权限（私钥只有 root 可读）
sudo chmod 600 /etc/ssl/sangogame_ssl/sangogame.com.key
sudo chmod 644 /etc/ssl/sangogame_ssl/sangogame.com_bundle.pem

# 验证文件已到位
ls -la /etc/ssl/sangogame_ssl/
# 应输出：
#   -rw-r--r-- sangogame.com_bundle.pem
#   -rw------- sangogame.com.key
#   -rw-r--r-- sangogame.com_bundle.crt
#   -rw-r--r-- sangogame.com.csr
```

---

## 四、重新构建并发布镜像

证书就绪后，需要重新构建镜像以包含 HTTPS 启动逻辑（本次已改动 `server.dart`）。

在**本地 Mac** 执行：

```bash
# 双击或终端执行
open backend/release.command
# 或
bash backend/release.command
```

`release.command` 会自动：
1. 构建新镜像
2. 推送到腾讯云镜像仓库 `ccr.ccs.tencentyun.com/ephnic/`
3. SSH 到服务器执行 `run_New.sh`

---

## 五、run_New.sh 自动处理逻辑

`run_New.sh` 启动容器时会自动检测证书目录：

```bash
SSL_CERT_HOST_DIR="/etc/ssl/sangogame_ssl"

# 证书存在 → 自动添加 443 端口映射和 volume 挂载
if [ -d "$SSL_CERT_HOST_DIR" ]; then
  HTTPS_OPTS="-p 443:443 -v $SSL_CERT_HOST_DIR:/app/certs:ro -e SSL_CERT_DIR=/app/certs"
fi
```

最终 `docker run` 命令相当于：
```bash
docker run \
  -p 80:8080 \
  -p 443:443 \
  -v /etc/ssl/sangogame_ssl:/app/certs:ro \
  -e SSL_CERT_DIR=/app/certs \
  ... 其他环境变量 ...
```

Dart 服务启动时读取容器内 `/app/certs/` 下的 `sangogame.com_bundle.pem` 和 `sangogame.com.key`。

---

## 六、验证部署

```bash
# 1. 确认容器 80 和 443 端口都在监听
docker ps
# 期望看到：0.0.0.0:80->8080/tcp, 0.0.0.0:443->443/tcp

# 2. 查看启动日志，确认 HTTPS 服务器已启动
docker logs <容器ID> | grep -E "HTTPS|SSL|listening"
# 期望看到：HTTPS server listening on 0.0.0.0:443

# 3. 测试 HTTP → HTTPS 跳转
curl -I http://sangogame.com
# 期望：HTTP/1.1 301 Moved Permanently
# Location: https://sangogame.com/

# 4. 测试 HTTPS 访问
curl -I https://sangogame.com
# 期望：HTTP/1.1 200 OK

# 5. 查看证书信息
curl -vI https://sangogame.com 2>&1 | grep -E "subject|issuer|expire"
```

---

## 七、证书续期（每年一次）

腾讯云免费证书有效期 **1 年**，到期前：

1. 腾讯云控制台重新申请/续期证书并下载
2. 替换服务器上的文件：
   ```bash
   sudo cp 新的sangogame.com_bundle.pem /etc/ssl/sangogame_ssl/sangogame.com_bundle.pem
   sudo cp 新的sangogame.com.key        /etc/ssl/sangogame_ssl/sangogame.com.key
   ```
3. 重启容器加载新证书：
   ```bash
   docker restart $(docker ps -q)
   ```
   **无需重新构建镜像。**

---

## 故障排查

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 443 端口无响应 | 证书路径不对或目录不存在 | `ls /etc/ssl/sangogame.com/` 确认两个文件存在 |
| `HTTPS server failed to start` | 证书文件格式错误 | 确认下载的是"其他"格式（PEM），不是 IIS/Tomcat |
| 浏览器报证书不受信任 | 只有叶证书，缺少中间证书 | 使用腾讯云下载的 `.pem`（已包含完整证书链） |
| HTTP 未跳转到 HTTPS | 访问的是 ycwithyou.com 而非 sangogame.com | 重定向只对 `sangogame.com` 生效，属正常 |
| 服务器防火墙拦截 443 | 安全组未放行 | 腾讯云控制台 → 安全组 → 放行 TCP 443 入站 |
