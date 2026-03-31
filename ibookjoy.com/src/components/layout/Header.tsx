"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { BRAND } from "@/lib/site.config";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/features", label: "功能" },
  { href: "/solutions", label: "行业方案" },
  { href: "/pricing", label: "定价" },
  { href: "/about", label: "关于" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {BRAND.logoImage ? (
              <Image
                src={BRAND.logoImage}
                alt={BRAND.name}
                width={36}
                height={36}
                className="rounded-xl"
              />
            ) : (
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-400/25">
                <span className="text-lg font-black text-white">{BRAND.logoChar}</span>
              </div>
            )}
            <span
              className={clsx(
                "text-xl font-bold tracking-tight transition-colors",
                scrolled ? "text-gray-900" : "text-white"
              )}
            >
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10",
                  scrolled
                    ? "text-gray-600 hover:text-brand-500 hover:bg-brand-50"
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={clsx(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                scrolled
                  ? "text-brand-500 hover:bg-brand-50"
                  : "text-white/90 hover:text-white"
              )}
            >
              联系我们
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 shadow-lg shadow-brand-400/25 hover:shadow-brand-400/40 hover:scale-105 transition-all"
            >
              免费体验
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={clsx(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-gray-700" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-brand-50 hover:text-brand-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-400 to-brand-500"
                >
                  免费体验
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
