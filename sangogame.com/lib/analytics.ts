const base   = process.env.NEXT_PUBLIC_STATS_API_URL ?? '';
const siteId = 'sangogame_web';

function send(endpoint: string, payload: Record<string, string>) {
  if (!base) return;
  fetch(`${base}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site_id: siteId, ...payload }),
    keepalive: true,
    mode: 'cors',
  }).catch(() => {});
}

export function trackPageView(pageUrl: string) {
  send('/api/stats/pageview', {
    page_url: pageUrl,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}

export function trackDownload(platform: string) {
  send('/api/stats/download', {
    platform,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}
