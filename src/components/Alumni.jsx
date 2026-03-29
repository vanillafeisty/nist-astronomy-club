import React from 'react';
import { alumni } from '../data/clubData';

export default function Alumni() {
  return (
    <section id="alumni" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label">From the Stars They Reached</div>
        <h2 className="section-title">Messages from <span className="highlight">Alumni</span></h2>
        <p className="section-sub">Our alumni carry the spirit of the cosmos wherever they go. Here's what they say.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }} className="alumni-grid">
          {alumni.map((a, i) => (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 30, position: 'relative',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '5rem',
                lineHeight: 0.5, color: 'var(--accent)', opacity: 0.35,
                marginBottom: 14, userSelect: 'none',
              }}>"</div>
              <p style={{
                fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 22,
              }}>{a.message}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <i className="fas fa-user-circle" style={{ fontSize: '2.4rem', color: 'var(--accent2)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{a.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{a.batch}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{a.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .alumni-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .alumni-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
