import Link from "next/link";
import Image from "next/image";
import { BRAND, FOOTER } from "@/lib/site.config";

const footerLinks = {
  产品: [
    { label: "功能介绍", href: "/features" },
    { label: "行业方案", href: "/solutions" },
    { label: "定价方案", href: "/pricing" },
  ],
  行业: [
    { label: "健身私教", href: "/solutions/fitness" },
    { label: "美容美发", href: "/solutions/beauty" },
    { label: "教育培训", href: "/solutions/education" },
    { label: "医疗健康", href: "/solutions/healthcare" },
    { label: "家政服务", href: "/solutions/housekeeping" },
    { label: "青少年体能", href: "/solutions/youth" },
  ],
  公司: [
    { label: "关于我们", href: "/about" },
    { label: "联系我们", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              {BRAND.logoImage ? (
                <Image
                  src={BRAND.logoImage}
                  alt={BRAND.name}
                  width={36}
                  height={36}
                  className="rounded-xl"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
                  <span className="text-lg font-black text-white">{BRAND.logoChar}</span>
                </div>
              )}
              <span className="text-xl font-bold text-white">{BRAND.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              {FOOTER.tagline}
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {BRAND.name} All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            {FOOTER.tosUrl ? <a href={FOOTER.tosUrl} className="hover:text-gray-400 transition-colors">服务协议</a> : <span>服务协议</span>}
            {FOOTER.privacyUrl ? <a href={FOOTER.privacyUrl} className="hover:text-gray-400 transition-colors">隐私政策</a> : <span>隐私政策</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
