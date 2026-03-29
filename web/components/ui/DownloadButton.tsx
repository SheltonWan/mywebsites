export function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  if (platform === "ios") {
    // Smartphone / iPhone icon
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17 2H7C5.346 2 4 3.346 4 5v14c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3zm-4 18H11v-1h2v1zm4-3H7V5h10v12z" />
      </svg>
    );
  }
  if (platform === "mac") {
    // Apple logo
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (platform === "android") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.523 15.341a.848.848 0 01-.848-.848.848.848 0 01.848-.848.848.848 0 01.848.848.848.848 0 01-.848.848m-11.046 0a.848.848 0 01-.848-.848.848.848 0 01.848-.848.848.848 0 01.848.848.848.848 0 01-.848.848m11.405-6.026l1.697-2.94a.353.353 0 00-.129-.482.353.353 0 00-.482.129l-1.72 2.978A10.539 10.539 0 0012 8.087c-1.721 0-3.34.433-4.748 1.193L5.532 6.302a.353.353 0 00-.482-.129.353.353 0 00-.129.482l1.697 2.94C3.85 10.988 2.076 13.52 2 16.5h20c-.076-2.98-1.85-5.512-4.118-7.185z" />
      </svg>
    );
  }
  if (platform === "windows") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 12V6.75l6-1.32v6.57H3zm17 0V3l-9 1.68V12h9zm-17 1h6v6.09l-6-1.32V13zm17 0h-9v7.32L20 22V13z" />
      </svg>
    );
  }
  // fallback: generic download
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 20h14v-2H5v2zm7-14l-5 5h3v4h4v-4h3l-5-5z" />
    </svg>
  );
}

interface DownloadButtonProps {
  platform: string;
  label: string;
  url: string;
  icon?: string;
  primary?: boolean;
}

export default function DownloadButton({ platform, label, url, primary }: DownloadButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        primary
          ? "bg-brand-500 border-brand-500 text-white hover:bg-brand-600"
          : "bg-white border-gray-200 text-gray-800 hover:border-brand-400"
      }`}
    >
      <PlatformIcon
        platform={platform}
        className={`w-7 h-7 shrink-0 ${primary ? "text-white" : "text-gray-700"}`}
      />
      <span>
        <span className="block text-xs opacity-70">下载</span>
        <span className="block text-sm font-semibold leading-tight">{label}</span>
      </span>
    </a>
  );
}
