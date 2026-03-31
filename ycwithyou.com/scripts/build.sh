#!/bin/bash
# Build the Next.js website and copy output to backend's public directory
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$(dirname "$SCRIPT_DIR")"
BACKEND_PUBLIC="$WEB_DIR/../backend/public"

echo "==> Installing dependencies..."
cd "$WEB_DIR"
npm install

echo "==> Building Next.js site..."
npm run build

echo "==> Copying output to backend/public/..."
rm -rf "$BACKEND_PUBLIC"
cp -r "$WEB_DIR/out" "$BACKEND_PUBLIC"

echo "==> Done! Static files at backend/public/"
