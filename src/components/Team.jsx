import React from 'react';
import { coreMembers } from '../data/clubData';
// Add these imports at the very top of Team.jsx
import sasankaPhoto from '../images/members/sasanka.jpeg';
import subhasisPhoto from '../images/members/subhasis.jpeg';

function LeaderCard({ name, role, badge, dept, bio, color }) {
  return (
    <div style={{
      background: 'var(--card)', border: `1px solid ${color}40`,
      borderRadius: 'var(--radius-lg)', padding: '40px 32px',
      textAlign: 'center', position: 'relative',
      transition: 'border-color 0.3s, transform 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.5rem' }}>{badge}</div>
      <div style={{
        width: 96, height: 96,
        background: `linear-gradient(135deg, var(--bg2), var(--card))`,
        border: `2px solid ${color}`, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2.4rem', margin: '0 auto 18px',
      }}>👨‍🚀</div>
      <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.05rem', marginBottom: 8 }}>{name}</h3>
      <div style={{
        display: 'inline-block',
        background: `${color}20`, color,
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        padding: '4px 14px', borderRadius: 50, marginBottom: 8,
      }}>{role}</div>
      <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: 12 }}>{dept}</p>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 20 }}>{bio}</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {['fa-linkedin', 'fa-instagram', 'fa-envelope'].map(ic => (
          <button key={ic} onClick={() => {}} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--bg2)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)', fontSize: '0.85rem', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.color = 'var(--accent2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}>
            <i className={`fab ${ic}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label">Leadership</div>
        <h2 className="section-title">Meet the <span className="highlight">Team</span></h2>

        {/* Leaders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 80 }} className="leaders-grid">
          <LeaderCard
            name="[ Sasanka Sekhar ]"
            role="Club President"
            photo={sasankaPhoto}
            dept="Department of Computer Science"
            bio="Leading the club with a vision to make astronomy accessible to every NISTian. Passionate about deep-sky observation and astrophotography."
            color="#f5a623"
          />
          <LeaderCard
            name="[ Subhasis Patro ]"
            role="Club Secretary"
            photo={subhasisPhoto}
            dept="Department of Computer Science"
            bio="Organizing events, workshops, and outreach with dedication. Enthusiastic about radio astronomy and Python-based sky analysis."
            color="#4fc3f7"
          />
        </div>

        {/* Core Members */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 700, marginBottom: 8 }}>
            Core <span className="highlight">Members</span>
          </h3>
          <p style={{ color: 'var(--muted)' }}>The backbone of every observation night, workshop, and launch event.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }} className="core-grid">
          {coreMembers.map((m, i) => (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '18px 10px',
              textAlign: 'center', transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{
  width: 60, height: 60, borderRadius: '50%',
  overflow: 'hidden', margin: '0 auto 10px',
  border: '2px solid rgba(79,195,247,0.3)',
}}>
  {m.photo
    ? <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    : <div style={{ width: '100%', height: '100%', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{m.icon || '👤'}</div>
  }
</div>
              <div style={{ fontWeight: 600, fontSize: '0.78rem', marginBottom: 3 }}>{m.name}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{m.role}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--accent2)', marginTop: 3 }}>{m.dept}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .leaders-grid { grid-template-columns: 1fr !important; } .core-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media (max-width: 600px) { .core-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 400px) { .core-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
