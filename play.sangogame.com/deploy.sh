#!/usr/bin/env bash
# sangoplay（Flutter Web）— 部署到服务器
# 说明：sangoplay/ 目录已是编译好的 Flutter web 产物
#       如需重新构建，请先在 frontend/ 执行 flutter build web --release
set -e
cd "$(dirname "$0")"

if [ -z "$SERVER_IP" ]; then
    echo "❌ 请先设置 SERVER_IP 环境变量"
    echo "   export SERVER_IP=你的服务器IP"
    exit 1
fi

echo "==> 同步 sangoplay/ 到服务器 /opt/iwithyou/static/sangoplay/ ..."
rsync -avz --delete sangoplay/ root@"$SERVER_IP":/opt/iwithyou/static/sangoplay/

echo "==> 重载 Nginx..."
ssh root@"$SERVER_IP" "docker compose -f /opt/iwithyou/docker-compose.yml exec nginx nginx -s reload"

echo ""
echo "✅ sangoplay 部署完成"
