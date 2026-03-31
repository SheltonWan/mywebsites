#!/usr/bin/env bash
# 约享平台宣传网站 — 静态导出脚本
# 用法：bash export.sh [目标目录]
# 示例：bash export.sh ~/Desktop/yuexiang-website
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="${1:-$SCRIPT_DIR/dist}"

echo "==> 安装依赖..."
npm --prefix "$SCRIPT_DIR" ci --frozen-lockfile

echo "==> 构建静态网站..."
npm --prefix "$SCRIPT_DIR" run build
# 产物在 $SCRIPT_DIR/out/

echo "==> 打包到 $OUTPUT_DIR..."
rm -rf "$OUTPUT_DIR"
cp -r "$SCRIPT_DIR/out" "$OUTPUT_DIR"

echo ""
echo "✅ 导出完成！静态文件目录：$OUTPUT_DIR"
echo ""
echo "部署方式："
echo "  1. 将 $OUTPUT_DIR 目录内容上传到任意静态托管（Nginx / 对象存储 / Vercel / Cloudflare Pages）"
echo "  2. Nginx 示例配置："
echo "       root $(realpath "$OUTPUT_DIR" 2>/dev/null || echo "$OUTPUT_DIR");"
echo "       location / { try_files \$uri \$uri/ \$uri.html /index.html; }"
