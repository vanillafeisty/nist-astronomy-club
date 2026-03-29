import React from 'react';
import { whyJoin, learnings } from '../data/clubData';

export default function WhyJoin() {
  return (
    <section id="why-join" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label">Membership</div>
        <h2 className="section-title">Why Join Our <span className="highlight">Club?</span></h2>
        <p className="section-sub">Becoming a member is an invitation to look beyond textbooks, beyond classrooms — into the infinite.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginBottom: 80 }} className="why-grid">
          {whyJoin.map((item, i) => (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              padding: 30, borderRadius: 'var(--radius-lg)',
              transition: 'border-color 0.3s, transform 0.3s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '2.4rem', marginBottom: 14 }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* What will you learn */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 60 }}>
          <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700, marginBottom: 32 }}>
            What Will You <span className="highlight">Learn?</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="learn-grid">
            {learnings.map((l, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'var(--card)', border: '1px solid var(--border)',
                padding: '13px 15px', borderRadius: 'var(--radius)',
                fontSize: '0.85rem', color: 'var(--muted)',
                transition: 'border-color 0.3s, color 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}>
                <i className={`fas ${l.icon}`} style={{ color: 'var(--accent)', minWidth: 16 }} />
                {l.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2,1fr) !important; } .learn-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 520px) { .why-grid { grid-template-columns: 1fr !important; } .learn-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
