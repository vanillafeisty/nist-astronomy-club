import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const departments = [
  'Computer Science & Engineering','Electronics & Communication Engineering',
  'Mechanical Engineering','Electrical & Electronics Engineering',
  'Information Technology','Physics','Mathematics','MBA / Management','MCA','Other',
];
const interests = [
  { val: 'Astrophotography', emoji: '📸' },
  { val: 'Telescope Observation', emoji: '🔭' },
  { val: 'Cosmology', emoji: '🌌' },
  { val: 'Solar Observation', emoji: '☀️' },
  { val: 'Radio Astronomy', emoji: '📡' },
  { val: 'Space Science', emoji: '🚀' },
  { val: 'Data Analysis', emoji: '💻' },
  { val: 'Outreach', emoji: '🌍' },
];

const initialForm = {
  fullName:'', email:'', phone:'', dob:'', gender:'', hometown:'',
  department:'', year:'', rollNo:'', cgpa:'',
  level:'', interests:[], techSkills:'', equipment:'', priorExp:'',
  motivation:'', contribution:'', nightAvail:'', source:'',
};

export default function JoinForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleInterest = (val) => setForm(f => ({
    ...f, interests: f.interests.includes(val)
      ? f.interests.filter(i => i !== val) : [...f.interests, val],
  }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = true;
    if (!form.email.trim()) e.email = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.department) e.department = true;
    if (!form.year) e.year = true;
    if (!form.level) e.level = true;
    if (!form.motivation.trim()) e.motivation = true;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setFirebaseError('');
    try {
      await addDoc(collection(db, 'applications'), {
        ...form, submittedAt: serverTimestamp(), type: 'join_application',
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setFirebaseError('Could not save your application. Please check Firebase config in src/firebase.js');
    } finally { setLoading(false); }
  };

  const inp = (err) => ({
    background:'var(--bg2)', border:`1.5px solid ${err?'#ff6b6b':'var(--border)'}`,
    borderRadius:8, padding:'12px 16px', color:'var(--text)',
    fontFamily:'Syne, sans-serif', fontSize:'0.95rem', width:'100%',
    outline:'none', transition:'border-color 0.2s', resize:'vertical',
  });
  const lbl = { fontSize:'0.83rem', color:'var(--muted)', marginBottom:6, display:'block' };
  const sec = (icon, text) => (
    <div style={{ fontFamily:'Orbitron, monospace', fontSize:'0.82rem', letterSpacing:2,
      textTransform:'uppercase', color:'var(--accent2)', margin:'32px 0 18px',
      paddingBottom:10, borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
      <i className={`fas ${icon}`}/>{text}
    </div>
  );

  if (submitted) return (
    <section id="join" className="section" style={{background:'var(--bg2)'}}>
      <div className="container" style={{maxWidth:700}}>
        <div style={{ background:'var(--card)', border:'1px solid rgba(129,199,132,0.3)',
          borderRadius:'var(--radius-lg)', padding:'60px 40px', textAlign:'center' }}>
          <div style={{fontSize:'4rem', marginBottom:16}}>🚀</div>
          <h3 style={{fontFamily:'Orbitron, monospace', fontSize:'1.5rem', color:'#81c784', marginBottom:12}}>Application Saved!</h3>
          <p style={{color:'var(--muted)', marginBottom:8}}>Your application has been stored in our database.</p>
          <p style={{color:'var(--muted)', marginBottom:28, fontSize:'0.9rem'}}>Our team will review it and contact you within 3–5 working days.</p>
          <button className="btn-primary" onClick={() => { setForm(initialForm); setSubmitted(false); }}>Submit Another</button>
        </div>
      </div>
    </section>
  );

  return (
    <section id="join" className="section" style={{background:'var(--bg2)'}}>
      <div className="container">
        <div className="section-label">Begin Your Journey</div>
        <h2 className="section-title">Join the <span className="highlight">Club</span></h2>
        <p className="section-sub">Fill out the form below — we welcome curious minds from all departments!</p>

        {firebaseError && (
          <div style={{ maxWidth:860, margin:'0 auto 20px', background:'rgba(255,100,100,0.1)',
            border:'1px solid rgba(255,100,100,0.3)', borderRadius:'var(--radius)',
            padding:'14px 20px', color:'#ff8080', fontSize:'0.88rem', display:'flex', alignItems:'center', gap:10 }}>
            <i className="fas fa-exclamation-triangle"/> {firebaseError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ maxWidth:860, margin:'0 auto',
          background:'var(--card)', border:'1px solid var(--border)',
          borderRadius:'var(--radius-lg)', padding:'48px' }} className="join-form">

          {sec('fa-user','Personal Information')}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20}} className="form-row">
            <div><label style={lbl}>Full Name *</label>
              <input value={form.fullName} onChange={e=>set('fullName',e.target.value)} placeholder="Your full name" style={inp(errors.fullName)}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
            <div><label style={lbl}>Email Address *</label>
              <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="your.email@nist.edu" style={inp(errors.email)}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20}} className="form-row">
            <div><label style={lbl}>Phone Number *</label>
              <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" style={inp(errors.phone)}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
            <div><label style={lbl}>Date of Birth</label>
              <input type="date" value={form.dob} onChange={e=>set('dob',e.target.value)} style={inp()}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20}} className="form-row">
            <div><label style={lbl}>Gender</label>
              <select value={form.gender} onChange={e=>set('gender',e.target.value)} style={{...inp(), cursor:'pointer', appearance:'none'}}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}>
                <option value="">Select</option>
                {['Male','Female','Non-binary','Prefer not to say'].map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Hometown / City</label>
              <input value={form.hometown} onChange={e=>set('hometown',e.target.value)} placeholder="City, State" style={inp()}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
          </div>

          {sec('fa-university','Academic Details')}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20}} className="form-row">
            <div><label style={lbl}>Department *</label>
              <select value={form.department} onChange={e=>set('department',e.target.value)} style={{...inp(errors.department), cursor:'pointer', appearance:'none'}}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}>
                <option value="">Select department</option>
                {departments.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Year of Study *</label>
              <select value={form.year} onChange={e=>set('year',e.target.value)} style={{...inp(errors.year), cursor:'pointer', appearance:'none'}}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}>
                <option value="">Select year</option>
                {['1st Year','2nd Year','3rd Year','4th Year','Postgraduate','PhD'].map(y=><option key={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20}} className="form-row">
            <div><label style={lbl}>Roll Number</label>
              <input value={form.rollNo} onChange={e=>set('rollNo',e.target.value)} placeholder="NIST Roll No." style={inp()}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
            <div><label style={lbl}>CGPA / Percentage</label>
              <input value={form.cgpa} onChange={e=>set('cgpa',e.target.value)} placeholder="e.g. 8.5 / 85%" style={inp()}
                onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
          </div>

          {sec('fa-star','Astronomy & Skills')}
          <div style={{marginBottom:20}}>
            <label style={{...lbl, marginBottom:12}}>Familiarity with Astronomy *</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
              {[['Beginner','🌱 Complete Beginner'],['Enthusiast','🌙 Casual Enthusiast'],['Intermediate','🔭 Intermediate'],['Advanced','🌌 Advanced']].map(([val,label])=>(
                <label key={val} style={{ display:'flex', alignItems:'center', gap:8,
                  background: form.level===val?'rgba(245,166,35,0.15)':'var(--bg2)',
                  border:`1.5px solid ${form.level===val?'var(--accent)':'var(--border)'}`,
                  padding:'10px 16px', borderRadius:8, cursor:'pointer', fontSize:'0.88rem', transition:'all 0.2s' }}>
                  <input type="radio" name="level" value={val} checked={form.level===val} onChange={()=>set('level',val)} style={{display:'none'}}/>
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{...lbl, marginBottom:12}}>Areas of Interest</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
              {interests.map(({val,emoji})=>(
                <label key={val} style={{ display:'flex', alignItems:'center', gap:8,
                  background: form.interests.includes(val)?'rgba(79,195,247,0.12)':'var(--bg2)',
                  border:`1.5px solid ${form.interests.includes(val)?'var(--accent2)':'var(--border)'}`,
                  padding:'9px 14px', borderRadius:8, cursor:'pointer', fontSize:'0.85rem', transition:'all 0.2s' }}>
                  <input type="checkbox" checked={form.interests.includes(val)} onChange={()=>toggleInterest(val)} style={{display:'none'}}/>
                  {emoji} {val}
                </label>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}><label style={lbl}>Technical Skills</label>
            <input value={form.techSkills} onChange={e=>set('techSkills',e.target.value)} placeholder="e.g. Python, MATLAB, Arduino…" style={inp()}
              onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
          <div style={{marginBottom:20}}><label style={lbl}>Equipment You Own</label>
            <input value={form.equipment} onChange={e=>set('equipment',e.target.value)} placeholder="Binoculars, DSLR, Telescope, or 'None'" style={inp()}
              onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
          <div style={{marginBottom:20}}><label style={lbl}>Prior Astronomy Experience</label>
            <textarea value={form.priorExp} onChange={e=>set('priorExp',e.target.value)} rows={2} placeholder="Workshops, courses, competitions…" style={inp()}
              onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>

          {sec('fa-rocket','Motivation & Commitment')}
          <div style={{marginBottom:20}}><label style={lbl}>Why do you want to join? *</label>
            <textarea value={form.motivation} onChange={e=>set('motivation',e.target.value)} rows={3} placeholder="Tell us what excites you and what you hope to contribute…" style={inp(errors.motivation)}
              onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
          <div style={{marginBottom:20}}><label style={lbl}>What can you contribute?</label>
            <textarea value={form.contribution} onChange={e=>set('contribution',e.target.value)} rows={2} placeholder="Photography, coding, event management, design…" style={inp()}
              onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{...lbl, marginBottom:12}}>Available for night observations? (9 PM – 1 AM)</label>
            <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
              {['Yes, regularly','Sometimes','Rarely'].map(val=>(
                <label key={val} style={{ display:'flex', alignItems:'center', gap:8,
                  background: form.nightAvail===val?'rgba(245,166,35,0.15)':'var(--bg2)',
                  border:`1.5px solid ${form.nightAvail===val?'var(--accent)':'var(--border)'}`,
                  padding:'9px 16px', borderRadius:8, cursor:'pointer', fontSize:'0.88rem', transition:'all 0.2s' }}>
                  <input type="radio" name="nightAvail" checked={form.nightAvail===val} onChange={()=>set('nightAvail',val)} style={{display:'none'}}/>
                  {val}
                </label>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}><label style={lbl}>How did you hear about us?</label>
            <select value={form.source} onChange={e=>set('source',e.target.value)} style={{...inp(), cursor:'pointer', appearance:'none'}}
              onFocus={e=>e.target.style.borderColor='var(--accent2)'} onBlur={e=>e.target.style.borderColor='var(--border)'}>
              <option value="">Select</option>
              {['Friend/Senior','Notice Board','Instagram/Social Media','NIST Website','Club Event','Faculty','Other'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>

          <div style={{marginTop:40, paddingTop:28, borderTop:'1px solid var(--border)', display:'flex', flexDirection:'column', alignItems:'center', gap:16}}>
            <p style={{fontSize:'0.82rem', color:'var(--muted)', display:'flex', alignItems:'center', gap:6}}>
              <i className="fas fa-database" style={{color:'var(--accent2)'}}/> Securely saved to Firebase database
            </p>
            <button type="submit" className="btn-primary" disabled={loading} style={{fontSize:13, padding:'16px 48px', opacity:loading?0.7:1}}>
              {loading ? <><i className="fas fa-spinner fa-spin"/> Saving...</> : <><i className="fas fa-paper-plane"/> Submit Application</>}
            </button>
          </div>
        </form>
      </div>
      <style>{`@media(max-width:640px){.join-form{padding:24px!important}.form-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
