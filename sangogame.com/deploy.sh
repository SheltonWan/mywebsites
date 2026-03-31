#!/usr/bin/env bash
# sangogame.com — 构建并部署到服务器
set -e
cd "$(dirname "$0")"

if [ -z "$SERVER_IP" ]; then
    echo "❌ 请先设置 SERVER_IP 环境变量"
    echo "   export SERVER_IP=你的服务器IP"
    exit 1
fi

echo "==> 构建 sangogame.com 静态文件..."
npm run build
# 产物在 out/

echo "==> 同步到服务器 /opt/iwithyou/static/sangogame/ ..."
rsync -avz --delete out/ root@"$SERVER_IP":/opt/iwithyou/static/sangogame/

echo "==> 重载 Nginx..."
ssh root@"$SERVER_IP" "docker compose -f /opt/iwithyou/docker-compose.yml exec nginx nginx -s reload"

echo ""
echo "✅ sangogame.com 部署完成"
