import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Why Join', href: '#why-join' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Alumni', href: '#alumni' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(5,10,20,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(79,195,247,0.12)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span style={{ fontSize: 26 }}>⭐</span>
            <div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700, color: '#f5a623', lineHeight: 1.2 }}>NIST Astronomy Club</div>
              <div style={{ fontSize: 10, color: '#7a93b0', letterSpacing: 2 }}>Pallur Hills · Berhampur</div>
            </div>
          </div>

          {/* Desktop Links */}
          <ul style={{ display: 'flex', listStyle: 'none', gap: 4, alignItems: 'center', margin: 0, padding: 0 }}
            className="desktop-nav">
            {navItems.map(item => (
              <li key={item.label}>
                <button onClick={() => handleNav(item.href)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Syne, sans-serif', fontSize: 12, letterSpacing: 1,
                  textTransform: 'uppercase', padding: '8px 12px', borderRadius: 6,
                  color: '#7a93b0', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#e8eef8'}
                  onMouseLeave={e => e.target.style.color = '#7a93b0'}>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => handleNav('#join')} style={{
                background: '#f5a623', color: '#000',
                fontFamily: 'Orbitron, monospace', fontWeight: 700,
                fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
                padding: '9px 20px', borderRadius: 50, border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = '#ffc04d'}
                onMouseLeave={e => e.target.style.background = '#f5a623'}>
                Join Us
              </button>
            </li>
          </ul>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 8,
          }} className="hamburger" aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: '#e8eef8', borderRadius: 2,
                transition: 'all 0.3s',
                transform: open
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'opacity 0'
                  : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(5,10,20,0.98)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 20,
        }}>
          {navItems.map(item => (
            <button key={item.label} onClick={() => handleNav(item.href)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Orbitron, monospace', fontSize: 18, color: '#e8eef8',
              letterSpacing: 2, textTransform: 'uppercase',
            }}>{item.label}</button>
          ))}
          <button onClick={() => handleNav('#join')} style={{
            background: '#f5a623', color: '#000',
            fontFamily: 'Orbitron, monospace', fontWeight: 700,
            fontSize: 14, padding: '14px 36px', borderRadius: 50,
            border: 'none', cursor: 'pointer', marginTop: 10,
          }}>Join Us</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
