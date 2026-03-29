import DownloadButton from "@/components/ui/DownloadButton";
import { siteConfig } from "@/site.config";

export default function DownloadSection() {
  const dl = siteConfig.downloads;
  return (
    <section id="download" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">立即下载，免费使用</h2>
        <p className="text-gray-500 mb-10">支持 iOS、Android、macOS 和 Windows，随时随地保持联系</p>

        <div className="flex flex-wrap gap-4 justify-center">
          <DownloadButton {...dl.ios} primary />
          <DownloadButton {...dl.android} />
          <DownloadButton {...dl.mac} />
          <DownloadButton {...dl.windows} />
        </div>

        <p className="text-xs text-gray-400 mt-8">
          当前为内测版本，下载链接由蒲公英分发平台提供
        </p>
      </div>
    </section>
  );
}
