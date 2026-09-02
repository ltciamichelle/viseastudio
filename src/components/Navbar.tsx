'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container flex justify-between items-center">
          <Link href="#" className="logo" onClick={closeMenu}>
            <Image
              src="/assets/logo/logo-wide.webp"
              alt="Visea Studio Logo"
              width={120}
              height={32}
              priority
              style={{ width: 'auto', height: '32px' }}
            />
          </Link>

          <div className="nav-links">
            <Link href="#services" className="link-underline">
              Services
            </Link>
            <Link href="#work" className="link-underline">
              Work
            </Link>
            <Link href="#process" className="link-underline">
              Process
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://wa.me/message/SSOJGJVNCQ72H1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary nav-cta-desktop"
            >
              Let&apos;s Talk
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-links">
          <Link href="#services" onClick={closeMenu}>
            Services
          </Link>
          <Link href="#work" onClick={closeMenu}>
            Work
          </Link>
          <Link href="#process" onClick={closeMenu}>
            Process
          </Link>
          <Link href="#about" onClick={closeMenu}>
            About
          </Link>
        </div>

        <a
          href="https://wa.me/message/SSOJGJVNCQ72H1"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          onClick={closeMenu}
          style={{ fontSize: '18px', padding: '16px 36px' }}
        >
          Let&apos;s Talk on WhatsApp
        </a>
      </div>
    </>
  );
}
