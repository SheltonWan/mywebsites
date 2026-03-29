import Link from "next/link";
import { siteConfig } from "@/site.config";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-white font-bold text-lg mb-2">{siteConfig.name}</p>
            <p className="text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white text-sm font-medium mb-3">快速导航</p>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-medium mb-3">联系我们</p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm hover:text-white transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            {siteConfig.footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={siteConfig.footer.icpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            {siteConfig.footer.icp}
          </a>
        </div>
      </div>
    </footer>
  );
}
