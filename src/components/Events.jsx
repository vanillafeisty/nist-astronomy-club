import React from 'react';
import { events } from '../data/clubData';

export default function Events() {
  return (
    <section id="events" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label">Activities</div>
        <h2 className="section-title">Club <span className="highlight">Events</span></h2>
        <p className="section-sub">From rooftop observations to expert workshops — we keep the universe within reach all year round.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 26 }} className="events-grid">
          {events.map((ev, i) => (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ev.accent; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>

              {/* Banner */}
              <div style={{
                height: 160, background: ev.color,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                borderBottom: `1px solid ${ev.accent}30`,
              }}>
                <span style={{ fontSize: '3rem' }}>{ev.icon}</span>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, letterSpacing: 2, color: ev.accent, textTransform: 'uppercase' }}>{ev.tag}</span>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 28px' }}>
                <div style={{
                  display: 'inline-block',
                  background: `${ev.accent}20`, color: ev.accent,
                  fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: 50, marginBottom: 12,
                }}>{ev.tag}</div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', marginBottom: 12 }}>{ev.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginBottom: 18, lineHeight: 1.7 }}>{ev.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {ev.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--muted)' }}>
                      <i className="fas fa-check" style={{ color: ev.accent, fontSize: '0.7rem' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .events-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
