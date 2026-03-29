import React from 'react';

const stars = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.7 + 0.3,
  duration: 2 + Math.random() * 4,
  delay: Math.random() * 4,
}));

export default function Hero() {
  const handleJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 60% 40%, #0a1628 0%, #050a14 70%)',
    }}>
      {/* Stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <div key={s.id} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            borderRadius: '50%',
            background: `rgba(255,255,255,${s.opacity})`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }} />
        ))}
      </div>

      {/* Nebula glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(79,195,247,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 70%, rgba(167,139,250,0.05) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(245,166,35,0.04) 0%, transparent 40%)
        `,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', animation: 'fadeInUp 1s ease both' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
          color: '#f5a623', fontFamily: 'Orbitron, monospace',
          fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
          padding: '8px 22px', borderRadius: 50, marginBottom: 32,
        }}>Est. 2018 · NIST University, Berhampur</div>

        <h1 style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 900, lineHeight: 1, marginBottom: 20,
          background: 'linear-gradient(135deg, #fff 30%, #f5a623 70%, #4fc3f7 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          <span style={{
            display: 'block', fontSize: '0.34em', letterSpacing: 8,
            color: '#4fc3f7', WebkitTextFillColor: '#4fc3f7', marginBottom: 6,
          }}>NIST</span>
          Astronomy<br />Club
        </h1>

        <p style={{
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: '#7a93b0', marginBottom: 40,
        }}>
          Where Science Meets the Sky — Explore the Cosmos from Pallur Hills
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
          <button className="btn-primary" onClick={handleJoin}>
            Join the Club
          </button>
          <a href="https://www.nist.edu/" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Visit NIST University <i className="fas fa-external-link-alt" style={{ fontSize: 11 }} />
          </a>
        </div>

        <div style={{
          display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap',
          paddingTop: 40, borderTop: '1px solid rgba(79,195,247,0.12)',
        }}>
          {[
            { val: '120+', label: 'Active Members' },
            { val: '6+', label: 'Years Active' },
            { val: '40+', label: 'Events Hosted' },
            { val: '∞', label: 'Stars Observed' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 700, color: '#f5a623' }}>{s.val}</div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7a93b0', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#7a93b0', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
        <div>Scroll to explore</div>
        <div style={{ margin: '8px auto 0', width: 2, height: 40, background: 'linear-gradient(to bottom, #4fc3f7, transparent)', animation: 'scrollPulse 1.5s ease infinite' }} />
      </div>

      <style>{`
        @keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </section>
  );
}
