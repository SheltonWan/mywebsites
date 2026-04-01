#!/bin/bash
# 将本地 backend/deploy/nginx 配置同步到远程服务器，并重启 nginx 容器
# 用法：bash backend/tool/deploy_nginx.sh
# 依赖：sshpass（brew install sshpass）
# 环境变量：SERVER_IP、SERVER_PASSWORD

set -e

cd "$(dirname "$0")/../backend"

# ── 检查依赖 ────────────────────────────────────────────────────────────────
if ! command -v sshpass &>/dev/null; then
    echo "❌ 未找到 sshpass，请先安装：brew install sshpass"
    exit 1
fi

# ── 读取连接参数 ─────────────────────────────────────────────────────────────
SERVER_IP="${SERVER_IP:?请设置环境变量 SERVER_IP}"
SERVER_PASSWORD="${SERVER_PASSWORD:?请设置环境变量 SERVER_PASSWORD}"
REMOTE_USER="root"
REMOTE_DIR="/opt/iwithyou"
COMPOSE_FILE="$REMOTE_DIR/docker-compose.yml"

LOCAL_NGINX_DIR="$(pwd)/deploy/nginx/conf.d"

echo "==> 同步 nginx 配置到 ${REMOTE_USER}@${SERVER_IP}:${REMOTE_DIR}/nginx/conf.d/ ..."
sshpass -p "$SERVER_PASSWORD" rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    "$LOCAL_NGINX_DIR/" \
    "${REMOTE_USER}@${SERVER_IP}:${REMOTE_DIR}/nginx/conf.d/"

echo ""
echo "==> 检验 nginx 配置语法 ..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no \
    "${REMOTE_USER}@${SERVER_IP}" \
    "docker compose -f $COMPOSE_FILE exec nginx nginx -t"

echo ""
echo "==> 重载 nginx（不中断连接）..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no \
    "${REMOTE_USER}@${SERVER_IP}" \
    "docker compose -f $COMPOSE_FILE exec nginx nginx -s reload"

echo ""
echo "✅ nginx 配置已更新并重载完成"
