import React from 'react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Why Join', href: '#why-join' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Alumni', href: '#alumni' },
  { label: 'Join Now', href: '#join' },
];

export default function Footer({ onAdminClick }) {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#020509', borderTop: '1px solid rgba(79,195,247,0.1)', padding: '60px 0 28px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 40 }} className="footer-grid">

          <div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>
              ⭐ NIST Astronomy Club
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 20, lineHeight: 1.7 }}>
              Exploring the cosmos from the heart of Odisha.<br />
              Part of <a href="https://www.nist.edu/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent2)' }}>NIST University, Berhampur</a>
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: 'fab fa-instagram', url: '#' },
                { icon: 'fab fa-facebook', url: '#' },
                { icon: 'fab fa-x-twitter', url: '#' },
                { icon: 'fab fa-youtube', url: '#' },
                { icon: 'fab fa-discord', url: '#' },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)', fontSize: '0.9rem', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {footerLinks.map(l => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.href)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--muted)', fontSize: '0.88rem', padding: 0,
                    transition: 'color 0.2s', fontFamily: 'Syne, sans-serif',
                  }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent2)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>NIST University</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Official Website', url: 'https://www.nist.edu/' },
                { label: 'Campus', url: 'https://www.nist.edu/campus/campus.html' },
                { label: 'NIST Facebook', url: 'https://www.facebook.com/NISTUniversity/' },
                { label: 'NIST Instagram', url: 'https://www.instagram.com/nistuniversity/' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--muted)', fontSize: '0.88rem', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent2)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Contact Club</h5>
            {[
              { icon: 'fa-map-marker-alt', text: 'Pallur Hills, Berhampur, Odisha 761008' },
              { icon: 'fa-envelope', text: 'astronomyclub@nist.edu' },
              { icon: 'fa-phone', text: '0680 3925403' },
            ].map(c => (
              <p key={c.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--muted)', fontSize: '0.87rem', marginBottom: 10 }}>
                <i className={`fas ${c.icon}`} style={{ color: 'var(--accent2)', minWidth: 16, marginTop: 3 }} />{c.text}
              </p>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>© 2025 NIST Astronomy Club · NIST University, Berhampur · All Rights Reserved</p>
          <button onClick={onAdminClick} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(122,147,176,0.35)', fontSize: '0.75rem',
            fontFamily: 'Syne, sans-serif', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--muted)'}
            onMouseLeave={e => e.target.style.color = 'rgba(122,147,176,0.35)'}>
            Admin Panel
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
