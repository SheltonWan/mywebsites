"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/site.config";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={siteConfig.images.logo}
            alt={siteConfig.name}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-lg text-gray-900">{siteConfig.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-brand-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/business"
            className="text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors"
          >
            商家接入
          </Link>
          <Link
            href="/download"
            className="px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-full hover:bg-brand-600 transition-colors shadow-sm"
          >
            免费下载
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen((v) => !v)}
          aria-label="菜单"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-brand-600 text-sm py-1"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <Link
              href="/business"
              className="flex-1 text-center py-2 border border-brand-500 text-brand-600 text-sm rounded-full"
              onClick={() => setOpen(false)}
            >
              商家接入
            </Link>
            <Link
              href="/download"
              className="flex-1 text-center py-2 bg-brand-500 text-white text-sm rounded-full"
              onClick={() => setOpen(false)}
            >
              免费下载
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
