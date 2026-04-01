'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '/#screenshots', label: '游戏截图' },
  { href: '/#features', label: '核心玩法' },
  { href: '/#scenarios', label: '历史剧本' },
  { href: '/#officers', label: '名将风云' },
  { href: '/#platforms', label: '下载游戏' },
  { href: '/support/', label: '玩家支持' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeId,     setActiveId]     = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlight — observe both section AND header/div with id
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );
    const targets = document.querySelectorAll('[id]');
    targets.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const isActive = (href: string) => {
    const id = href.replace('/#', '').replace('/', '');
    return activeId === id;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-sango-bg/95 border-b border-sango-border backdrop-blur-md'
          : 'bg-sango-bg/70 border-b border-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/assets/logo.webp"
            alt="卧龙风云"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-heading font-bold text-lg text-sango-gold group-hover:text-sango-accent transition-colors">
            卧龙风云
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-sm font-medium transition-colors pb-1
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-sango-gold
                  after:transition-all after:duration-200
                  ${isActive(link.href)
                    ? 'text-sango-gold after:w-full'
                    : 'text-sango-text-dim hover:text-sango-gold after:w-0 hover:after:w-full'
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="菜单"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-sango-text transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-sango-text transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-sango-text transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-sango-surface border-t border-sango-border">
          <ul className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-6 py-3 text-sm text-sango-text-dim hover:text-sango-gold transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
