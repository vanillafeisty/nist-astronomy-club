import React from 'react';

const facts = [
  { icon: 'fa-calendar-alt', label: 'Established', value: '1996' },
  { icon: 'fa-map-marker-alt', label: 'Location', value: 'Pallur Hills, Berhampur, Odisha — 761008' },
  { icon: 'fa-award', label: 'Accreditation', value: "NAAC 'A' Grade · UGC Recognized" },
  { icon: 'fa-leaf', label: 'Campus', value: '70-Acre Green Campus' },
  { icon: 'fa-phone', label: 'Contact NIST', value: '0680 3925403 · hello@nist.edu' },
  { icon: 'fa-trophy', label: 'Ranking', value: 'AIR 38 — Times Engineering Survey 2024' },
];

const links = [
  { icon: 'fa-globe', label: 'Official Website', sub: 'www.nist.edu', url: 'https://www.nist.edu/' },
  { icon: 'fa-university', label: 'Campus Life', sub: 'Explore the campus', url: 'https://www.nist.edu/campus/campus.html' },
  { icon: 'fab fa-facebook', label: 'NIST Facebook', sub: 'Stay updated', url: 'https://www.facebook.com/NISTUniversity/' },
  { icon: 'fab fa-instagram', label: 'NIST Instagram', sub: '@nistuniversity', url: 'https://www.instagram.com/nistuniversity/' },
];

export default function AboutNIST() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label">Our Home</div>
        <h2 className="section-title">Rooted at <span className="highlight">NIST University</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}
          className="about-grid">

          {/* Text */}
          <div>
            <p style={{ color: 'var(--muted)', marginBottom: 18, fontSize: '1.05rem' }}>
              The <strong style={{ color: 'var(--text)' }}>NIST Astronomy Club</strong> proudly calls{' '}
              <strong style={{ color: 'var(--text)' }}>NIST University, Berhampur</strong> its home — a premier
              research institution nestled in the scenic Pallur Hills of Odisha, India. Founded in 1996, NIST
              University has grown into one of the most respected technical universities in Eastern India.
            </p>
            <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: '1.05rem' }}>
              With UGC recognition, NAAC 'A' Grade accreditation, and a sprawling 70-acre green campus, NIST
              provides the perfect backdrop for scientific exploration. Our club leverages the university's
              world-class labs and research culture to bring the universe closer to every student.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {links.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  padding: '14px 16px', borderRadius: 'var(--radius)',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <i className={`fas ${l.icon}`} style={{ color: 'var(--accent2)', fontSize: '1.3rem', minWidth: 22 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{l.label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.73rem' }}>{l.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {facts.map(f => (
              <div key={f.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: 'var(--card)', border: '1px solid var(--border)',
                padding: '16px 20px', borderRadius: 'var(--radius)',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <i className={`fas ${f.icon}`} style={{ color: 'var(--accent)', fontSize: '1.1rem', minWidth: 20, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 3 }}>{f.label}</div>
                  <div style={{ fontSize: '0.95rem' }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}
