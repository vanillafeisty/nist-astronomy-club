import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const socials = [
  { icon: 'fab fa-instagram', label: 'Instagram', color: '#e1306c', url: 'https://www.instagram.com/nistastronomyclub/' },
  { icon: 'fab fa-facebook', label: 'Facebook', color: '#1877f2', url: 'https://www.facebook.com/astronomyclub/' },
  { icon: 'fab fa-x-twitter', label: 'X / Twitter', color: '#1da1f2', url: 'https://twitter.com/' },
  { icon: 'fab fa-youtube', label: 'YouTube', color: '#ff0000', url: 'https://www.youtube.com/' },
  { icon: 'fab fa-linkedin', label: 'LinkedIn', color: '#0a66c2', url: 'https://www.linkedin.com/' },
  { icon: 'fab fa-discord', label: 'Discord', color: '#7289da', url: 'https://discord.gg/' },
];

const initMsg = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initMsg);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in Name, Email and Message.'); return;
    }
    setLoading(true); setError('');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...form, sentAt: serverTimestamp(), type: 'contact_message',
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError('Could not send message. Please check Firebase config in src/firebase.js');
    } finally { setLoading(false); }
  };

  const inp = {
    background: 'var(--bg)', border: '1.5px solid var(--border)',
    borderRadius: 8, padding: '12px 16px', color: 'var(--text)',
    fontFamily: 'Syne, sans-serif', fontSize: '0.93rem',
    width: '100%', outline: 'none', transition: 'border-color 0.2s', resize: 'vertical',
  };
  const lbl = { fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 6, display: 'block' };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-label">Reach Out</div>
        <h2 className="section-title">Contact <span className="highlight">Us</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 50, alignItems: 'start' }} className="contact-grid">

          {/* Left — Info + Socials */}
          <div>
            {[
              { icon: 'fa-map-marker-alt', label: 'Find Us', value: 'NIST University, Institute Park\nPallur Hills, Berhampur, Odisha — 761008' },
              { icon: 'fa-envelope', label: 'Email', value: 'astronomyclub@nist.edu\nhello@nist.edu (University)' },
              { icon: 'fa-phone', label: 'Phone', value: '6371087577\n+91 8249255700' },
            ].map(c => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: 'var(--card)', border: '1px solid var(--border)',
                padding: '18px 20px', borderRadius: 'var(--radius)', marginBottom: 14,
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <i className={`fas ${c.icon}`} style={{ color: 'var(--accent2)', fontSize: '1.2rem', minWidth: 22, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: '0.93rem', whiteSpace: 'pre-line' }}>{c.value}</div>
                </div>
              </div>
            ))}

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '18px 20px', borderRadius: 'var(--radius)', marginBottom: 24 }}>
              <i className="fas fa-globe" style={{ color: 'var(--accent2)', marginRight: 10 }} />
              <span style={{ fontSize: '0.72rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)' }}>University Website</span>
              <div style={{ marginTop: 4 }}>
                <a href="https://www.nist.edu/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent2)' }}>www.nist.edu</a>
              </div>
            </div>

            {/* Social Media */}
            <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.88rem', marginBottom: 8 }}>Follow Us</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {socials.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  padding: '11px 12px', borderRadius: 'var(--radius)',
                  color: 'var(--text)', fontWeight: 600, fontSize: '0.82rem',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
                  <i className={s.icon} style={{ fontSize: '1.15rem' }} />{s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Contact Form + Map */}
          <div>
            {/* Contact Form */}
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '32px', marginBottom: 24,
            }}>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', marginBottom: 6, color: 'var(--accent)' }}>
                Send Us a Message
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>
                Your message will be saved to our database and we'll get back to you.
              </p>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
                  <h4 style={{ fontFamily: 'Orbitron, monospace', color: '#81c784', marginBottom: 8 }}>Message Received!</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 20 }}>We'll get back to you at {form.email}</p>
                  <button className="btn-outline" style={{ fontSize: 11 }} onClick={() => { setForm(initMsg); setSent(false); }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {error && (
                    <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.3)', borderRadius: 8, padding: '10px 14px', color: '#ff8080', fontSize: '0.85rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fas fa-exclamation-triangle" /> {error}
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={lbl}>Your Name *</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" style={inp}
                        onFocus={e => e.target.style.borderColor = 'var(--accent2)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={lbl}>Email *</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" style={inp}
                        onFocus={e => e.target.style.borderColor = 'var(--accent2)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={lbl}>Phone</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" style={inp}
                        onFocus={e => e.target.style.borderColor = 'var(--accent2)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={lbl}>Subject</label>
                      <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="What's this about?" style={inp}
                        onFocus={e => e.target.style.borderColor = 'var(--accent2)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={lbl}>Message *</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={4} placeholder="Write your message here…" style={inp}
                      onFocus={e => e.target.style.borderColor = 'var(--accent2)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                    {loading ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : <><i className="fas fa-paper-plane" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <iframe
              title="NIST University"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.23!2d84.7941!3d19.3149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d4b7c5f1a1a1a%3A0x1a1a1a1a1a1a1a1a!2sNIST+University!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="260"
              style={{ border: 0, borderRadius: 'var(--radius-lg)', display: 'block' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <a href="https://www.nist.edu/" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: 'var(--accent)', color: '#000',
              fontFamily: 'Orbitron, monospace', fontWeight: 700,
              fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
              padding: 13, borderRadius: 'var(--radius)', marginTop: 10,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#ffc04d'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}>
              <i className="fas fa-external-link-alt" /> Visit NIST University Official Website
            </a>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
