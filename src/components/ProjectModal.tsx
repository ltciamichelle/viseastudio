'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export interface BrandData {
  title: string;
  tag: string;
  client: string;
  year: string;
  logo?: string;
  image: string;
  overview: string;
  services: string[];
  gallery: string[];
}

export interface CategoryModalData {
  id: string;
  categoryTitle: string;
  categoryTag: string;
  brands: BrandData[];
}

interface ProjectModalProps {
  category: CategoryModalData | null;
  onClose: () => void;
}

// Helper to assign dynamic Bento Grid layout spans
function getBentoSpanClass(index: number, total: number): string {
  if (total === 1) return 'bento-span-12';
  if (total === 2) return 'bento-span-12';

  const pattern = [
    'bento-span-12', // 0: Large Panoramic Hero
    'bento-span-7',  // 1: Wide Medium
    'bento-span-5',  // 2: Narrow Medium
    'bento-span-6',  // 3: Half
    'bento-span-6',  // 4: Half
    'bento-span-8',  // 5: Wide
    'bento-span-4',  // 6: Square
  ];

  return pattern[index % pattern.length];
}

export default function ProjectModal({ category, onClose }: ProjectModalProps) {
  const [currentCategory, setCurrentCategory] = useState<CategoryModalData | null>(category);
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
      setSelectedBrandIndex(0);
      setSlideDirection('right');
      setIsClosing(false);
    }
  }, [category]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setCurrentCategory(null);
      onClose();
    }, 320);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentCategory) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCategory, handleClose]);

  const handleSelectBrand = (newIndex: number) => {
    if (newIndex === selectedBrandIndex) return;
    setSlideDirection(newIndex > selectedBrandIndex ? 'right' : 'left');
    setSelectedBrandIndex(newIndex);
  };

  const scrollTrack = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth / 2;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!mounted || !currentCategory) return null;

  const currentBrand =
    currentCategory.brands.length > 0
      ? currentCategory.brands[selectedBrandIndex] || currentCategory.brands[0]
      : null;

  // Combine hero image + gallery images uniquely
  const allPhotos = currentBrand
    ? [
        currentBrand.image,
        ...currentBrand.gallery.filter((img) => img !== currentBrand.image),
      ]
    : [];

  const modalContent = (
    <div data-lenis-prevent style={{ position: 'relative', zIndex: 9999 }}>
      {/* Backdrop */}
      <div
        className={`modal-backdrop ${isClosing ? 'closing' : 'open'}`}
        onClick={handleClose}
        aria-hidden="true"
        data-lenis-prevent
      />

      {/* Slide-Up Fullscreen Modal */}
      <div
        className={`slide-up-modal ${isClosing ? 'closing' : 'open'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        data-lenis-prevent
      >
        {/* Sticky Header Bar */}
        <div className="modal-header">
          <div className="container flex justify-between items-center">
            {/* Left: Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="text-eyebrow" style={{ opacity: 0.6 }}>
                Category
              </span>
              <span style={{ opacity: 0.3 }}>/</span>
              <span style={{ fontSize: '15px', fontWeight: 600 }}>
                {currentCategory.categoryTitle}
              </span>
            </div>

            {/* Right: Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleClose}
              aria-label="Close project modal"
            >
              <span>✕</span> Close
            </button>
          </div>
        </div>

        {/* Fullwidth Brand Switcher Section Bar (Width selebar screen, max 3) */}
        {currentCategory.brands.length > 1 && (
          <div className="modal-fullwidth-switcher" data-lenis-prevent>
            {/* PC Left Arrow when > 3 items */}
            {currentCategory.brands.length > 3 && (
              <button
                type="button"
                className="modal-switcher-arrow left"
                onClick={() => scrollTrack('left')}
                aria-label="Previous brands"
              >
                ←
              </button>
            )}

            {/* Fullwidth Track */}
            <div
              ref={trackRef}
              className="modal-fullwidth-track"
              data-lenis-prevent
              style={{
                gridTemplateColumns:
                  currentCategory.brands.length <= 3
                    ? `repeat(${currentCategory.brands.length}, 1fr)`
                    : `repeat(${currentCategory.brands.length}, minmax(280px, 1fr))`,
              }}
            >
              {currentCategory.brands.map((brand, idx) => {
                const isSelected = selectedBrandIndex === idx;
                return (
                  <button
                    key={brand.title}
                    type="button"
                    className={`modal-fullwidth-tab ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectBrand(idx)}
                    aria-label={`View ${brand.client} case study`}
                  >
                    <div className="modal-fullwidth-tab-content">
                      <span className="modal-fullwidth-tab-idx">0{idx + 1}</span>
                      <span className="modal-fullwidth-tab-name">{brand.client}</span>
                      <span className="modal-fullwidth-tab-year">{brand.year}</span>
                    </div>
                    {isSelected && <div className="modal-fullwidth-tab-line" />}
                  </button>
                );
              })}
            </div>

            {/* PC Right Arrow when > 3 items */}
            {currentCategory.brands.length > 3 && (
              <button
                type="button"
                className="modal-switcher-arrow right"
                onClick={() => scrollTrack('right')}
                aria-label="Next brands"
              >
                →
              </button>
            )}
          </div>
        )}

        {/* 2-Column Independent Scroll Shell */}
        <div className="modal-split-layout" data-lenis-prevent>
          {currentBrand ? (
            <>
              {/* ================= LEFT COLUMN (~1/3 Width) ================= */}
              <div className="modal-col-left" data-lenis-prevent>
                <div
                  key={`left-${currentBrand.client}`}
                  className={`brand-animated-content slide-from-${slideDirection}`}
                >
                  {/* Clean Standalone Client Logo */}
                  {currentBrand.logo && (
                    <div className="modal-brand-logo-wrapper">
                      <Image
                        src={currentBrand.logo}
                        alt={`${currentBrand.client} Logo`}
                        width={240}
                        height={80}
                        className="modal-brand-logo"
                      />
                    </div>
                  )}

                  <h1
                    id="modal-project-title"
                    style={{
                      fontSize: 'clamp(28px, 3vw, 42px)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      marginBottom: '16px',
                    }}
                  >
                    {currentBrand.title}
                  </h1>

                  {/* Meta Tags Row */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '36px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        backgroundColor: 'rgba(254, 254, 254, 0.08)',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        opacity: 0.9,
                      }}
                    >
                      {currentBrand.tag}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        backgroundColor: 'rgba(254, 254, 254, 0.04)',
                        border: '1px solid rgba(254, 254, 254, 0.08)',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        opacity: 0.7,
                      }}
                    >
                      {currentBrand.year}
                    </span>
                  </div>

                  {/* Narrative Description */}
                  <div style={{ marginBottom: '40px' }}>
                    <span className="text-eyebrow">About the Project</span>
                    <p
                      style={{
                        fontSize: '16px',
                        lineHeight: 1.8,
                        opacity: 0.85,
                        marginTop: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      {currentBrand.overview}
                    </p>
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.7,
                        opacity: 0.65,
                      }}
                    >
                      We collaborated closely with {currentBrand.client} to engineer a cohesive visual architecture that translates business value into an authentic, memorable brand experience.
                    </p>
                  </div>

                  {/* Scope & Deliverables */}
                  <div style={{ marginBottom: '48px' }}>
                    <span className="text-eyebrow">Scope & Deliverables</span>
                    <ul
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginTop: '16px',
                      }}
                    >
                      {currentBrand.services.map((service, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: '14px',
                            opacity: 0.85,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-paper)',
                              flexShrink: 0,
                            }}
                          />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Inquiry Action Card */}
                  <div
                    style={{
                      backgroundColor: 'rgba(254, 254, 254, 0.03)',
                      border: '1px solid rgba(254, 254, 254, 0.08)',
                      borderRadius: '16px',
                      padding: '28px',
                    }}
                  >
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>
                      Need similar outcomes?
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        opacity: 0.7,
                        lineHeight: 1.6,
                        marginBottom: '20px',
                      }}
                    >
                      Let&apos;s discuss how we can elevate your brand with strategic design and high-conversion assets.
                    </p>
                    <a
                      href="https://wa.me/message/SSOJGJVNCQ72H1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      Let&apos;s Talk on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT COLUMN (~2/3 Width) ================= */}
              <div className="modal-col-right" data-lenis-prevent>
                <div
                  key={`right-${currentBrand.client}`}
                  className={`brand-animated-content slide-from-${slideDirection}`}
                >
                  <div className="bento-grid">
                    {allPhotos.map((imgSrc, idx) => {
                      const spanClass = getBentoSpanClass(idx, allPhotos.length);
                      return (
                        <div key={idx} className={`bento-item ${spanClass}`}>
                          <Image
                            src={imgSrc}
                            alt={`${currentBrand.title} Visual Showcase ${idx + 1}`}
                            fill
                            sizes="(max-width: 960px) 100vw, 65vw"
                            quality={85}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State for Website Category */
            <div
              style={{
                gridColumn: '1 / -1',
                padding: 'clamp(64px, 12vw, 120px) 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(254, 254, 254, 0.05)',
                  border: '1px solid rgba(254, 254, 254, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}
              >
                🌐
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                Website & Digital Platforms
              </h2>
              <p
                style={{
                  opacity: 0.75,
                  maxWidth: '560px',
                  lineHeight: 1.7,
                  fontSize: '16px',
                }}
              >
                We build high-performance web applications, interactive landing pages, and responsive brand platforms. Our latest website case studies are currently in active client production.
              </p>
              <div style={{ marginTop: '12px' }}>
                <a
                  href="https://wa.me/message/SSOJGJVNCQ72H1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '16px 36px', fontSize: '16px' }}
                >
                  Request Live Demos on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
