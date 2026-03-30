# 网站统计接口接入指南

本文档说明如何将第三方网站接入后端统计服务，实现页面访问（PV/UV）和下载点击的采集与查询。

---

## 概览

| 类型 | 说明 |
|------|------|
| 接口基础地址 | `https://<your-backend-host>` |
| 认证 | 无需认证，所有 `/api/stats/*` 接口均为公开 |
| 跨域 | 已配置 CORS，允许任意 Origin 访问 |
| 数据隔离 | 每个接入站点使用唯一的 `site_id` 区分数据 |

---

## 第一步：确定 site_id

`site_id` 由接入方自行决定，无需向后端注册或审批。后端会直接存储上报时携带的值，并按此字段隔离各站点数据。第一条数据上报后，该站点会自动出现在 `/api/stats/sites` 列表中。

建议命名规范：纯字母/数字/下划线，使用项目名，最长 100 字符，例如 `my_site`、`product_web`。

> **唯一性由接入方自行保证**。不同网站须使用不同的 `site_id`，否则数据会合并统计。

---

## 第二步：上报页面访问

### 接口

```
POST /api/stats/pageview
Content-Type: application/json
```

### 请求体

```json
{
  "site_id": "my_site",
  "page_url": "/about",
  "referrer": "https://google.com"
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `site_id` | ✅ | 站点标识 |
| `page_url` | ✅ | 当前页面路径，建议只传 pathname，不含域名 |
| `referrer` | 否 | 来源 URL，可从 `document.referrer` 读取，留空则传 `""` |

### 响应

成功返回 `{}` (HTTP 200)。

---

## 第三步：上报下载点击（可选）

如果站点有 App 下载功能，可在用户点击下载按钮时调用。

### 接口

```
POST /api/stats/download
Content-Type: application/json
```

### 请求体

```json
{
  "site_id": "my_site",
  "platform": "ios",
  "referrer": ""
}
```

| 字段 | 必填 | 可选值 |
|------|------|--------|
| `site_id` | ✅ | 站点标识 |
| `platform` | ✅ | `ios` / `android` / `mac` / `windows` |
| `referrer` | 否 | 同上 |

---

## 前端集成示例

### 原生 JavaScript（任意网站通用）

将以下代码复制至网站 HTML 的 `<head>` 或 `<body>` 末尾：

```html
<script>
(function() {
  var STATS_BASE = 'https://<your-backend-host>';
  var SITE_ID    = 'my_site';          // ← 替换为你的 site_id

  function sendStats(endpoint, payload) {
    var body = JSON.stringify(Object.assign({ site_id: SITE_ID }, payload));
    fetch(STATS_BASE + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      keepalive: true,
      mode: 'cors'
    }).catch(function() {});
  }

  // 上报当前页面访问
  sendStats('/api/stats/pageview', {
    page_url: location.pathname,
    referrer: document.referrer || ''
  });

  // 暴露下载点击上报函数，在下载按钮的 onclick 里调用
  // 例：<a href="..." onclick="trackDownload('ios')">下载 iOS</a>
  window.trackDownload = function(platform) {
    sendStats('/api/stats/download', {
      platform: platform,
      referrer: document.referrer || ''
    });
  };
})();
</script>
```

### Next.js（App Router）

**1. 创建 `lib/analytics.ts`**

```typescript
const BASE    = process.env.NEXT_PUBLIC_STATS_API_URL ?? '';
const SITE_ID = 'my_site'; // ← 替换

function send(endpoint: string, payload: Record<string, string>) {
  if (!BASE) return;
  fetch(`${BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site_id: SITE_ID, ...payload }),
    keepalive: true,
    mode: 'cors',
  }).catch(() => {});
}

export function trackPageView(path: string) {
  send('/api/stats/pageview', {
    page_url: path,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}

export function trackDownload(platform: string) {
  send('/api/stats/download', {
    platform,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}
```

**2. 创建 `components/AnalyticsProvider.tsx`**

```typescript
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();
  useEffect(() => {
    // 忽略管理后台页面
    if (pathname.startsWith('/admin')) return;
    trackPageView(pathname);
  }, [pathname]);
  return null;
}
```

**3. 挂载到根布局 `app/layout.tsx`**

```typescript
import { Suspense } from 'react';
import AnalyticsProvider from '@/components/AnalyticsProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
```

> `<Suspense>` 是必须的，`usePathname()` 在静态导出模式下需要 Suspense 边界。

**4. 配置环境变量 `.env.local`**

```
NEXT_PUBLIC_STATS_API_URL=https://<your-backend-host>
```

---

## 查询统计数据

所有查询接口均为 GET，支持 `site_id` 参数过滤。不传 `site_id` 则返回所有站点汇总数据。

### 汇总数据

```
GET /api/stats/summary?site_id=my_site
```

```json
{
  "pv": 1234,
  "uv": 567,
  "downloads": {
    "ios": 89,
    "android": 102,
    "mac": 34,
    "windows": 21
  }
}
```

### 每日趋势

```
GET /api/stats/daily?site_id=my_site&days=30
```

`days` 范围 1–365，默认 30。

```json
{
  "days": 30,
  "data": [
    { "date": "2026-03-01", "pv": 45, "uv": 23 },
    { "date": "2026-03-02", "pv": 60, "uv": 31 }
  ]
}
```

### 热门页面

```
GET /api/stats/pages?site_id=my_site&limit=20
```

`limit` 范围 1–100，默认 20。

```json
{
  "data": [
    { "url": "/", "pv": 500, "uv": 200 },
    { "url": "/download", "pv": 300, "uv": 150 }
  ]
}
```

### 下载统计

```
GET /api/stats/downloads?site_id=my_site&days=30
```

```json
{
  "totals": { "ios": 89, "android": 102, "mac": 34, "windows": 21 },
  "daily": [
    { "date": "2026-03-28", "platform": "ios", "count": 5 },
    { "date": "2026-03-28", "platform": "android", "count": 7 }
  ]
}
```

### 来源分析

```
GET /api/stats/referrers?site_id=my_site&limit=20
```

```json
{
  "data": [
    { "referrer": "https://google.com", "count": 120 },
    { "referrer": "https://twitter.com", "count": 45 }
  ]
}
```

### 所有接入站点列表

```
GET /api/stats/sites
```

```json
{
  "data": [
    { "site_id": "iwithyou_web", "total_pv": 3200 },
    { "site_id": "my_site", "total_pv": 1234 }
  ]
}
```

---

## 注意事项

- **隐私保护**：客户端 IP 在服务端使用 SHA-256 哈希后存储，不保存原始 IP。
- **管理页面**：建议在 AnalyticsProvider 中过滤 `/admin` 路径，避免内部访问污染数据。
- **page_url 只传路径**：建议只传 `location.pathname`（如 `/about`），不要带域名和 query string，便于聚合统计。
- **防重**：接口不做去重，短时间内重复刷新会产生多条 PV 记录，如有需要请在客户端自行节流。
