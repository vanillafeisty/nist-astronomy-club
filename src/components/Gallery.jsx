import React, { useState, useRef } from 'react';

// ============================================================
// TO ADD MORE PHOTOS: Just drop images into src/images/gallery/
// They will appear on the website automatically.
// ============================================================

// Auto-loads ALL images from src/images/gallery/ folder
const importAll = (r) => r.keys().map((key) => ({
  src: r(key),
  caption: key
    .replace('./', '')
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' '),
}));

const galleryPhotos = importAll(
  require.context('../images/gallery', false, /\.(jpg|jpeg|png|webp)$/i)
);

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef();

  const prev = (e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + galleryPhotos.length) % galleryPhotos.length); };
  const next = (e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % galleryPhotos.length); };
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <section id="gallery" className="section" style={{ background: 'var(--bg2)', overflow: 'hidden' }}>
      <div className="container">
        <div className="section-label">Visual Journal</div>
        <h2 className="section-title">Photo <span className="highlight">Gallery</span></h2>
        <p className="section-sub">Memories from our events, observations, and moments of wonder.</p>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>

          {/* Left Arrow */}
          <button onClick={() => scroll(-1)} style={{
            position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(13,31,60,0.9)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: '1.4rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', backdropFilter: 'blur(8px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
            ‹
          </button>

          {/* Scrollable Row */}
          <div ref={scrollRef} style={{
            display: 'flex', gap: 16,
            overflowX: 'auto', overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            padding: '8px 4px 20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {galleryPhotos.map((photo, i) => (
              <div key={i} onClick={() => setLightboxIndex(i)} style={{
                flex: '0 0 300px', height: 220,
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                cursor: 'zoom-in', border: '1px solid var(--border)',
                scrollSnapAlign: 'start', position: 'relative',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.borderColor = 'var(--accent2)';
                  e.currentTarget.querySelector('.cap').style.opacity = '1';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.querySelector('.cap').style.opacity = '0';
                }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div className="cap" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(5,10,20,0.95), transparent)',
                  padding: '28px 14px 12px', opacity: 0, transition: 'opacity 0.3s',
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{photo.caption}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={() => scroll(1)} style={{
            position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(13,31,60,0.9)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: '1.4rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', backdropFilter: 'blur(8px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
            ›
          </button>
        </div>

        {/* Count */}
        <div style={{ textAlign: 'center', marginTop: 6, color: 'var(--muted)', fontSize: '0.8rem' }}>
          {galleryPhotos.length} photos · Scroll or use arrows · Click to enlarge
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div onClick={() => setLightboxIndex(null)} style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={() => setLightboxIndex(null)} style={{
            position: 'absolute', top: 20, right: 24,
            background: 'none', border: 'none', color: '#fff',
            fontSize: '2rem', cursor: 'pointer', opacity: 0.6,
          }}>✕</button>

          <button onClick={prev} style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', width: 52, height: 52, borderRadius: '50%',
            fontSize: '1.6rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>‹</button>

          <img
            src={galleryPhotos[lightboxIndex]?.src}
            alt={galleryPhotos[lightboxIndex]?.caption}
            style={{ maxWidth: '88vw', maxHeight: '80vh', borderRadius: 12, objectFit: 'contain' }}
            onClick={e => e.stopPropagation()}
          />

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
              {galleryPhotos[lightboxIndex]?.caption}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: 6 }}>
              {lightboxIndex + 1} / {galleryPhotos.length}
            </div>
          </div>

          <button onClick={next} style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', width: 52, height: 52, borderRadius: '50%',
            fontSize: '1.6rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>›</button>
        </div>
      )}

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}