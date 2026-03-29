import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminPanel({ onClose }) {
  const [tab, setTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('');
      try {
        const appsSnap = await getDocs(query(collection(db, 'applications'), orderBy('submittedAt', 'desc')));
        setApplications(appsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const msgsSnap = await getDocs(query(collection(db, 'contact_messages'), orderBy('sentAt', 'desc')));
        setMessages(msgsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError('Cannot connect to Firebase. Make sure your config in src/firebase.js is correct and Firestore is enabled.');
        console.error(err);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const fmt = (ts) => {
    if (!ts) return '—';
    try { return ts.toDate().toLocaleString('en-IN'); } catch { return '—'; }
  };

  const exportCSV = (data, filename, keys, headers) => {
    if (!data.length) { alert('No data to export.'); return; }
    const rows = [headers.join(',')];
    data.forEach((row, i) => {
      rows.push(keys.map((k, ki) => {
        if (ki === 0) return i + 1;
        if (k === '_ts') return fmt(row.submittedAt || row.sentAt);
        const v = Array.isArray(row[k]) ? row[k].join('; ') : (row[k] || '');
        return `"${v.toString().replace(/"/g, '""')}"`;
      }).join(','));
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }));
    a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const tabStyle = (active) => ({
    fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', letterSpacing: 1,
    textTransform: 'uppercase', padding: '10px 24px', borderRadius: 8,
    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
    background: active ? 'var(--accent)' : 'var(--card)',
    color: active ? '#000' : 'var(--muted)',
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '32px 24px', overflowY: 'auto',
    }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-lg)', padding: '36px', width: '100%', maxWidth: 1100 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.2rem', color: 'var(--accent)' }}>
            🔐 Admin Dashboard
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Syne, sans-serif' }}>
            Close ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <button style={tabStyle(tab === 'applications')} onClick={() => setTab('applications')}>
            🚀 Applications ({applications.length})
          </button>
          <button style={tabStyle(tab === 'messages')} onClick={() => setTab('messages')}>
            ✉️ Contact Messages ({messages.length})
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.3)', borderRadius: 'var(--radius)', padding: '14px 20px', color: '#ff8080', fontSize: '0.88rem', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <i className="fas fa-exclamation-triangle" style={{ marginTop: 2 }} />
            <div><strong>Firebase Error:</strong><br />{error}</div>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--accent2)', marginBottom: 16, display: 'block' }} />
            Loading from Firebase...
          </div>
        ) : (
          <>
            {/* Applications Table */}
            {tab === 'applications' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <button className="btn-outline" style={{ fontSize: 11 }} onClick={() =>
                    exportCSV(applications, 'nist-applications',
                      ['', 'fullName', 'email', 'phone', 'department', 'year', 'level', 'interests', 'techSkills', 'motivation', '_ts'],
                      ['#', 'Name', 'Email', 'Phone', 'Dept', 'Year', 'Level', 'Interests', 'Skills', 'Motivation', 'Submitted']
                    )}>
                    <i className="fas fa-download" /> Export CSV
                  </button>
                </div>
                {!applications.length
                  ? <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>No applications yet.</p>
                  : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                        <thead>
                          <tr>
                            {['#', 'Name', 'Email', 'Phone', 'Department', 'Year', 'Level', 'Interests', 'Skills', 'Submitted'].map(h => (
                              <th key={h} style={{ background: 'var(--card)', padding: '12px 14px', textAlign: 'left', fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((a, i) => (
                            <tr key={a.id} onMouseEnter={e => e.currentTarget.style.background = 'var(--card)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{i + 1}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700, whiteSpace: 'nowrap', borderBottom: '1px solid var(--border)' }}>{a.fullName}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--accent2)', borderBottom: '1px solid var(--border)' }}>{a.email}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{a.phone}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.department}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{a.year}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--accent)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{a.level}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{Array.isArray(a.interests) ? a.interests.join(', ') : a.interests}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.techSkills}</td>
                              <td style={{ padding: '11px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmt(a.submittedAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </>
            )}

            {/* Messages Table */}
            {tab === 'messages' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <button className="btn-outline" style={{ fontSize: 11 }} onClick={() =>
                    exportCSV(messages, 'nist-messages',
                      ['', 'name', 'email', 'phone', 'subject', 'message', '_ts'],
                      ['#', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Received']
                    )}>
                    <i className="fas fa-download" /> Export CSV
                  </button>
                </div>
                {!messages.length
                  ? <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>No messages yet.</p>
                  : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {messages.map((m, i) => (
                        <div key={m.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                              <span style={{ fontWeight: 700 }}>{m.name}</span>
                              <span style={{ color: 'var(--accent2)', fontSize: '0.85rem' }}>{m.email}</span>
                              {m.phone && <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{m.phone}</span>}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{fmt(m.sentAt)}</span>
                          </div>
                          {m.subject && <div style={{ fontSize: '0.82rem', color: 'var(--accent)', marginBottom: 8 }}>Subject: {m.subject}</div>}
                          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
