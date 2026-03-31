#!/bin/bash
set -e
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "==> Installing dependencies..."
  npm install --registry https://registry.npmmirror.com
fi

echo "==> Starting dev server at http://localhost:3000"
npm run dev
