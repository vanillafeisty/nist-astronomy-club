import React, { useState, useRef, useCallback } from 'react';

const TOTAL_SLOTS = 50;

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const processFiles = useCallback((files) => {
    const remaining = TOTAL_SLOTS - photos.length;
    const toProcess = Array.from(files).slice(0, remaining);
    if (!toProcess.length) { alert('Gallery is full (50 photos max).'); return; }
    toProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotos(prev => prev.length < TOTAL_SLOTS ? [...prev, e.target.result] : prev);
      };
      reader.readAsDataURL(file);
    });
  }, [photos.length]);

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  return (
    <section id="gallery" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label">Visual Journal</div>
        <h2 className="section-title">Photo <span className="highlight">Gallery</span></h2>
        <p className="section-sub">Memories from our nights under the stars — observations, events, and moments of wonder.</p>

        {/* Upload Zone */}
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--accent2)'}`,
            borderRadius: 'var(--radius-lg)', padding: '50px 24px',
            textAlign: 'center', cursor: 'pointer',
            background: dragging ? 'rgba(79,195,247,0.08)' : 'rgba(79,195,247,0.03)',
            transition: 'all 0.3s', marginBottom: 36,
          }}>
          <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: 'var(--accent2)', display: 'block', marginBottom: 12 }} />
          <p style={{ fontSize: '1.05rem', marginBottom: 6 }}>Click or drag & drop to upload photos</p>
          <small style={{ color: 'var(--muted)' }}>Supports JPG, PNG, WEBP · Up to {TOTAL_SLOTS} photos · {photos.length}/{TOTAL_SLOTS} uploaded</small>
          <input ref={inputRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
            onChange={e => processFiles(e.target.files)} />
        </div>

        {photos.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => setPhotos([])} style={{
              background: 'none', border: '1px solid rgba(255,80,80,0.3)', color: 'rgba(255,100,100,0.7)',
              padding: '6px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem',
            }}>Clear All</button>
          </div>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }} className="gallery-grid">
          {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
            const src = photos[i];
            return (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 'var(--radius)',
                overflow: 'hidden', border: '1px solid var(--border)',
                cursor: src ? 'zoom-in' : 'default',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; if (src) e.currentTarget.style.borderColor = 'var(--accent2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                onClick={() => src && setLightbox(src)}>
                {src
                  ? <img src={src} alt={`NIST Astronomy Club — ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'var(--card)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}>
                      <i className="fas fa-image" style={{ fontSize: '1.6rem', opacity: 0.2, color: 'var(--muted)' }} />
                      <span style={{ fontSize: '0.65rem', opacity: 0.25, color: 'var(--muted)' }}>{i + 1}</span>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div onClick={() => setLightbox(null)} style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <button onClick={() => setLightbox(null)} style={{
              position: 'absolute', top: 20, right: 24,
              background: 'none', border: 'none', color: '#fff',
              fontSize: '1.8rem', cursor: 'pointer', opacity: 0.7,
            }}>✕</button>
            <img src={lightbox} alt="Full view" style={{ maxWidth: '90vw', maxHeight: '88vh', borderRadius: 'var(--radius)', objectFit: 'contain' }}
              onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media (max-width: 600px) { .gallery-grid { grid-template-columns: repeat(3,1fr) !important; } }
      `}</style>
    </section>
  );
}
