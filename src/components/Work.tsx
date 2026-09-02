'use client';

import { useState } from 'react';
import ProjectModal, { CategoryModalData } from './ProjectModal';

interface CategoryCardItem extends CategoryModalData {
  num: string;
  delay: string;
  glowColor: string;
  summary: string;
}

const categoryCards: CategoryCardItem[] = [
  {
    id: 'social-media',
    num: '01',
    categoryTitle: 'Social Media',
    categoryTag: 'Visual Campaigns & Content',
    delay: 'delay-100',
    glowColor: 'rgba(217, 119, 6, 0.22)', // Warm Amber
    summary: 'Conversion ad visuals, digital carousels, and high-impact commercial campaigns.',
    brands: [
      {
        title: 'Bali Resort Tangerang',
        tag: 'Digital Campaign & Social Media',
        client: 'Bali Resort Development',
        year: '2024',
        logo: '/assets/clients/bali-resort.webp',
        image: '/assets/work/bali-resort-work.webp',
        overview:
          'A comprehensive digital campaign and visual assets suite created to drive property inquiries for a premier residential resort in Tangerang. We designed high-converting ad visuals, editorial landing materials, and branded collateral.',
        services: [
          'Social Media Campaign Strategy',
          'High-Conversion Ad Design',
          'Social & Marketing Visuals',
          'Storytelling Content Architecture',
          'Creative Direction',
        ],
        gallery: [
          '/assets/work/bali-resort-work.webp',
          '/assets/work/d-hub.webp',
          '/assets/work/protec-industri.webp',
        ],
      },
      {
        title: 'D-HUB Sinarmas Land',
        tag: 'Campaign Visuals & Social Media',
        client: 'Sinarmas Land Group',
        year: '2024',
        logo: '/assets/clients/abstract-logo.webp',
        image: '/assets/work/d-hub.webp',
        overview:
          'Digital campaign creative and visual architecture crafted for D-HUB by Sinarmas Land. The project delivered compelling digital billboards, social storytelling carousels, and high-impact commercial marketing collateral.',
        services: [
          'Social Media Key Visuals',
          'Digital Carousel Architecture',
          'Commercial Property Collateral',
          'Interactive Campaign Assets',
          'Content Production Guidelines',
        ],
        gallery: [
          '/assets/work/d-hub.webp',
          '/assets/work/protec-industri.webp',
          '/assets/work/bali-resort-work.webp',
        ],
      },
    ],
  },
  {
    id: 'branding',
    num: '02',
    categoryTitle: 'Branding',
    categoryTag: 'Corporate Identity & Systems',
    delay: 'delay-200',
    glowColor: 'rgba(6, 182, 212, 0.22)', // Cyan Steel
    summary: 'Full corporate brand identity, precision typography tokens, and authoritative guidelines.',
    brands: [
      {
        title: 'Protec Industri Indonesia',
        tag: 'Branding Identity System',
        client: 'PT Protec Industri Indonesia',
        year: '2023 - 2024',
        logo: '/assets/clients/gear-logo.webp',
        image: '/assets/work/protec-industri.webp',
        overview:
          'A complete corporate identity overhaul for an industrial manufacturing leader. The objective was to modernize the brand presence with precision typography, cohesive iconography, and authoritative corporate guidelines.',
        services: [
          'Brand Identity System',
          'Corporate Stationery & Guidelines',
          'Iconography & Design Tokens',
          'B2B Presentation Decks',
          'Digital Brand Standards',
        ],
        gallery: [
          '/assets/work/protec-industri.webp',
          '/assets/work/bali-resort-work.webp',
          '/assets/work/d-hub.webp',
        ],
      },
    ],
  },
  {
    id: 'website',
    num: '03',
    categoryTitle: 'Website',
    categoryTag: 'Web Experience & Platforms',
    delay: 'delay-300',
    glowColor: 'rgba(16, 185, 129, 0.22)', // Emerald Green
    summary: 'High-performance web apps, custom landing pages, and interactive digital experiences.',
    brands: [],
  },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<CategoryModalData | null>(null);

  return (
    <>
      <section className="section bg-charcoal" id="work">
        <div className="container">
          <div className="flex justify-between items-center fade-up">
            <div>
              <span className="text-eyebrow">Selected Work</span>
              <h2 className="text-h2" style={{ marginTop: '16px' }}>
                Featured projects
              </h2>
            </div>
          </div>

          {/* 3 In-a-Row Side-by-Side Category Cards Grid */}
          <div className="work-grid">
            {categoryCards.map((card) => (
              <div
                key={card.id}
                className={`category-work-card fade-up ${card.delay}`}
                onClick={() => setActiveCategory(card)}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${card.categoryTitle} case studies`}
                style={{ '--card-glow': card.glowColor } as React.CSSProperties}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(card);
                  }
                }}
              >
                <div className="cat-card-canvas">
                  {/* Perspective Wireframe Plane */}
                  <div className="cat-card-grid" />

                  {/* Numeral Watermark */}
                  <span className="cat-card-num">{card.num}</span>

                  {/* Center Title & Tag */}
                  <div className="cat-card-center">
                    <h3 className="cat-card-title">{card.categoryTitle}</h3>
                    <span className="cat-card-tag">{card.categoryTag}</span>
                  </div>

                  {/* Bottom Footer Action */}
                  <div className="cat-card-footer">
                    <p className="cat-card-summary">{card.summary}</p>
                    <div className="cat-card-btn">
                      <span>Explore {card.categoryTitle}</span>
                      <span className="cat-card-arrow">↗</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Case Study Fullscreen Modal */}
      <ProjectModal
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </>
  );
}
