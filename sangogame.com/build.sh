#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
npm run build
echo ""
echo "✅ 静态文件已输出至: $(pwd)/out"
