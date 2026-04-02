import React, { useState, useRef } from 'react';

// ============================================================
// HOW TO ADD MORE PHOTOS:
// 1. Drop the image file into src/images/gallery/
// 2. Add a new import line below
// 3. Add it to the `galleryPhotos` array with a caption
// ============================================================


import imgAstroFest2   from '../images/gallery/astro fest 2.jpg';
import imgAstroFest3   from '../images/gallery/astro fest 3.jpg';
import imgAstroFest4   from '../images/gallery/astro fest 4.jpg';
import imgAstroFest    from '../images/gallery/astro fest.jpg';
import imgExplaining   from '../images/gallery/explaining school children.jpg';
import imgFoundation1  from '../images/gallery/foundation day 1.jpg';
import imgFoundation2  from '../images/gallery/foundation day 2.jpg';
import imgFoundation3  from '../images/gallery/foundation day 3.jpg';
import imgFoundation4  from '../images/gallery/foundation day 4.jpg';
import imgFoundation5  from '../images/gallery/foundation day 5.jpg';
import imgOrientation1 from '../images/gallery/orientation 1.jpg';
import imgOrientation2 from '../images/gallery/orientation 2.jpg';
import imgOrientation4 from '../images/gallery/orientation 4.jpg';
import imgOrientation5 from '../images/gallery/orientation 5.jpg';
import imgOrientation6 from '../images/gallery/orientation 6.jpg';
import imgOrientation7 from '../images/gallery/orientation 7.jpg';
import imgSankalp1     from '../images/gallery/sankalp 1.jpg';
import imgSankalp2     from '../images/gallery/sankalp 2.jpg';
import imgSankalp3     from '../images/gallery/sankalp 3.jpg';
import imgSankalp4     from '../images/gallery/sankalp 4.jpg';
import imgSankalp5     from '../images/gallery/sankalp 5.jpg';
import imgSpaceDay1    from '../images/gallery/space day 1.jpg';
import imgSpaceDay2    from '../images/gallery/space day 2.jpg';
import imgSpaceDay3    from '../images/gallery/space day 3.jpg';
import imgSpaceDay4    from '../images/gallery/space day 4.jpg';
import imgSpaceDay5    from '../images/gallery/space day 5.jpg';

const galleryPhotos = [
  { src: imgAstroFest,    caption: 'Astro Fest',                   category: 'Astro Fest' },
  { src: imgAstroFest2,   caption: 'Astro Fest — Day 2',           category: 'Astro Fest' },
  { src: imgAstroFest3,   caption: 'Astro Fest — Day 3',           category: 'Astro Fest' },
  { src: imgAstroFest4,   caption: 'Astro Fest — Day 4',           category: 'Astro Fest' },
  { src: imgSpaceDay1,    caption: 'Space Day',                    category: 'Space Day' },
  { src: imgSpaceDay2,    caption: 'Space Day — 2',                category: 'Space Day' },
  { src: imgSpaceDay3,    caption: 'Space Day — 3',                category: 'Space Day' },
  { src: imgSpaceDay4,    caption: 'Space Day — 4',                category: 'Space Day' },
  { src: imgSpaceDay5,    caption: 'Space Day — 5',                category: 'Space Day' },
  { src: imgSankalp1,     caption: 'Sankalp',                      category: 'Sankalp' },
  { src: imgSankalp2,     caption: 'Sankalp — 2',                  category: 'Sankalp' },
  { src: imgSankalp3,     caption: 'Sankalp — 3',                  category: 'Sankalp' },
  { src: imgSankalp4,     caption: 'Sankalp — 4',                  category: 'Sankalp' },
  { src: imgSankalp5,     caption: 'Sankalp — 5',                  category: 'Sankalp' },
  { src: imgFoundation1,  caption: 'Foundation Day',               category: 'Foundation Day' },
  { src: imgFoundation2,  caption: 'Foundation Day — 2',           category: 'Foundation Day' },
  { src: imgFoundation3,  caption: 'Foundation Day — 3',           category: 'Foundation Day' },
  { src: imgFoundation4,  caption: 'Foundation Day — 4',           category: 'Foundation Day' },
  { src: imgFoundation5,  caption: 'Foundation Day — 5',           category: 'Foundation Day' },
  { src: imgOrientation1, caption: 'Orientation',                  category: 'Orientation' },
  { src: imgOrientation2, caption: 'Orientation — 2',              category: 'Orientation' },
  { src: imgOrientation4, caption: 'Orientation — 4',              category: 'Orientation' },
  { src: imgOrientation5, caption: 'Orientation — 5',              category: 'Orientation' },
  { src: imgOrientation6, caption: 'Orientation — 6',              category: 'Orientation' },
  { src: imgOrientation7, caption: 'Orientation — 7',              category: 'Orientation' },
  { src: imgExplaining,   caption: 'Explaining to School Children',category: 'Outreach' },

];

const categories = ['All', ...Array.from(new Set(galleryPhotos.map(p => p.category)))];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef();

  const filtered = activeCategory === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = (e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length); };
  const next = (e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % filtered.length); };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="section" style={{ background: 'var(--bg2)', overflow: 'hidden' }}>
      <div className="container">
        <div className="section-label">Visual Journal</div>
        <h2 className="section-title">Photo <span className="highlight">Gallery</span></h2>
        <p className="section-sub">Memories from our events, observations, and moments of wonder.</p>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              fontFamily: 'Orbitron, monospace', fontSize: 10, letterSpacing: 1,
              textTransform: 'uppercase', padding: '8px 18px', borderRadius: 50,
              border: `1.5px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
              background: activeCategory === cat ? 'rgba(245,166,35,0.15)' : 'transparent',
              color: activeCategory === cat ? 'var(--accent)' : 'var(--muted)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {cat} {activeCategory === cat && `(${filtered.length})`}
            </button>
          ))}
        </div>

        {/* Carousel with arrows */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button onClick={() => scroll(-1)} style={{
            position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(13,31,60,0.9)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: '1.3rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', backdropFilter: 'blur(8px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
            ‹
          </button>

          {/* Scrollable row */}
          <div ref={scrollRef} style={{
            display: 'flex', gap: 16,
            overflowX: 'auto', overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            padding: '8px 4px 20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {filtered.map((photo, i) => (
              <div key={i} onClick={() => openLightbox(i)} style={{
                flex: '0 0 300px', height: 220,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden', cursor: 'zoom-in',
                border: '1px solid var(--border)',
                scrollSnapAlign: 'start',
                position: 'relative',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.querySelector('.caption').style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.querySelector('.caption').style.opacity = '0'; }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} loading="lazy" />
                {/* Caption overlay */}
                <div className="caption" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(5,10,20,0.95), transparent)',
                  padding: '28px 14px 12px',
                  opacity: 0, transition: 'opacity 0.3s',
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>{photo.caption}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--accent)', marginTop: 2 }}>{photo.category}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={() => scroll(1)} style={{
            position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(13,31,60,0.9)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: '1.3rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', backdropFilter: 'blur(8px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
            ›
          </button>
        </div>

        {/* Photo count */}
        <div style={{ textAlign: 'center', marginTop: 8, color: 'var(--muted)', fontSize: '0.8rem' }}>
          {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'} · Scroll or use arrows to browse
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div onClick={closeLightbox} style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Close */}
          <button onClick={closeLightbox} style={{
            position: 'absolute', top: 20, right: 24,
            background: 'none', border: 'none', color: '#fff',
            fontSize: '2rem', cursor: 'pointer', opacity: 0.6, zIndex: 10,
          }}>✕</button>

          {/* Prev */}
          <button onClick={prev} style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', width: 52, height: 52, borderRadius: '50%',
            fontSize: '1.5rem', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 10,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
            ‹
          </button>

          <img
            src={filtered[lightboxIndex]?.src}
            alt={filtered[lightboxIndex]?.caption}
            style={{ maxWidth: '88vw', maxHeight: '82vh', borderRadius: 12, objectFit: 'contain' }}
            onClick={e => e.stopPropagation()}
          />

          {/* Caption */}
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>{filtered[lightboxIndex]?.caption}</div>
            <div style={{ color: 'var(--accent)', fontSize: '0.78rem', marginTop: 4 }}>{filtered[lightboxIndex]?.category}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: 6 }}>
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </div>

          {/* Next */}
          <button onClick={next} style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', width: 52, height: 52, borderRadius: '50%',
            fontSize: '1.5rem', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 10,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
            ›
          </button>
        </div>
      )}

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}