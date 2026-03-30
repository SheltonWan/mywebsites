import { siteConfig } from '@/site.config';

const base = siteConfig.statsApiBase;
const siteId = siteConfig.statsSiteId;

function send(endpoint: string, payload: Record<string, string>) {
  if (!base) return; // 未配置时静默跳过
  const url = `${base}${endpoint}`;
  const body = JSON.stringify({ site_id: siteId, ...payload });
  // keepalive:true 保证页面卸载时也能完成发送，行为与 sendBeacon 一致
  fetch(url, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    mode: 'cors',
  }).catch(() => {});
}

/** 上报页面访问。在客户端调用，自动读取 referrer。 */
export function trackPageView(pageUrl: string) {
  send('/api/stats/pageview', {
    page_url: pageUrl,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}

/** 上报下载点击。platform 为 ios/android/mac/windows。 */
export function trackDownload(platform: string) {
  send('/api/stats/download', {
    platform,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}
