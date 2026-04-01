'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/site.config';

const base = siteConfig.statsApiBase;

type Summary = {
  pv: number;
  uv: number;
  downloads: Record<string, number>;
};

type DailyRow = { date: string; pv: number; uv: number };

type PageRow = { url: string; pv: number; uv: number };

type ReferrerRow = { referrer: string; count: number };

type SiteRow = { site_id: string; total_pv: number };

async function apiFetch<T>(path: string, siteId: string): Promise<T | null> {
  try {
    const qs = siteId ? `?site_id=${encodeURIComponent(siteId)}&days=30&limit=20` : '?days=30&limit=20';
    const res = await fetch(`${base}${path}${qs}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export default function StatsPage() {
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [daily, setDaily] = useState<DailyRow[]>([]);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [referrers, setReferrers] = useState<ReferrerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 加载站点列表
  useEffect(() => {
    if (!base) {
      setError('未配置 NEXT_PUBLIC_STATS_API_URL，无法加载统计数据。');
      setLoading(false);
      return;
    }
    fetch(`${base}/api/stats/sites`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        const list: SiteRow[] = d.data ?? [];
        setSites(list);
        if (list.length > 0) {
          setSelectedSite(list[0].site_id);
        } else {
          // 无站点数据时仍加载全局汇总（不传 site_id）
          setSelectedSite('__all__');
        }
      })
      .catch(() => {
        setError('无法连接到统计服务');
        setLoading(false);
      });
  }, []);

  // 加载当前站点统计数据
  useEffect(() => {
    if (!base || !selectedSite) return;
    setLoading(true);
    // '__all__' 表示不过滤站点
    const sid = selectedSite === '__all__' ? '' : selectedSite;
    Promise.all([
      apiFetch<Summary>('/api/stats/summary', sid),
      apiFetch<{ days: number; data: DailyRow[] }>('/api/stats/daily', sid),
      apiFetch<{ data: PageRow[] }>('/api/stats/pages', sid),
      apiFetch<{ data: ReferrerRow[] }>('/api/stats/referrers', sid),
    ]).then(([s, d, p, r]) => {
      setSummary(s);
      setDaily(d?.data ?? []);
      setPages(p?.data ?? []);
      setReferrers(r?.data ?? []);
      setLoading(false);
    });
  }, [selectedSite]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-sm">{error}</p>
      </main>
    );
  }

  const dl = summary?.downloads ?? {};
  const platforms = ['ios', 'android', 'mac', 'windows', 'web'];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 标题 & 站点切换 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">访问统计</h1>
          {sites.length > 1 && (
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm"
            >
              {sites.map((s) => (
                <option key={s.site_id} value={s.site_id}>
                  {s.site_id} ({s.total_pv.toLocaleString()} PV)
                </option>
              ))}
            </select>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">加载中…</p>
        ) : (
          <>
            {/* PV / UV 卡片 */}
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">总览</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card label="总 PV" value={(summary?.pv ?? 0).toLocaleString()} />
                <Card label="总 UV（独立访客）" value={(summary?.uv ?? 0).toLocaleString()} />
                {platforms.map((p) => (
                  <Card key={p} label={`${p.toUpperCase()} 下载`} value={(dl[p] ?? 0).toLocaleString()} />
                ))}
              </div>
            </section>

            {/* 每日趋势 */}
            {daily.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  每日趋势（近 30 天）
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-100">
                        <th className="px-4 py-3 font-medium">日期</th>
                        <th className="px-4 py-3 font-medium text-right">PV</th>
                        <th className="px-4 py-3 font-medium text-right">UV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...daily].reverse().map((row) => (
                        <tr key={row.date} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-700">{row.date}</td>
                          <td className="px-4 py-2 text-right text-gray-900">{row.pv.toLocaleString()}</td>
                          <td className="px-4 py-2 text-right text-gray-500">{row.uv.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Top 页面 & Top Referrers */}
            <div className="grid md:grid-cols-2 gap-6">
              {pages.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">热门页面</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-gray-100">
                          <th className="px-4 py-3 font-medium">页面</th>
                          <th className="px-4 py-3 font-medium text-right">PV</th>
                          <th className="px-4 py-3 font-medium text-right">UV</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages.map((row) => (
                          <tr key={row.url} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-4 py-2 text-gray-700 truncate max-w-[180px]" title={row.url}>
                              {row.url}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-900">{row.pv.toLocaleString()}</td>
                            <td className="px-4 py-2 text-right text-gray-500">{row.uv.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {referrers.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">来源统计</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-gray-100">
                          <th className="px-4 py-3 font-medium">来源</th>
                          <th className="px-4 py-3 font-medium text-right">次数</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referrers.map((row) => (
                          <tr key={row.referrer} className="border-b border-gray-50 hover:bg-gray-50">
                            <td
                              className="px-4 py-2 text-gray-700 truncate max-w-[200px]"
                              title={row.referrer}
                            >
                              {row.referrer}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-900">{row.count.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
