import { useState } from 'react';
import { APP_CONFIG, SCREENING_CONSTANTS } from '@optiguide/shared';

export default function App() {
  const [healthStatus, setHealthStatus] = useState<string>('idle');

  const checkHealth = async () => {
    setHealthStatus('checking...');
    try {
      const res = await fetch('http://localhost:8000/api/v1/health');
      const data = await res.json();
      setHealthStatus(`Connected: ${data.status} (DB: ${data.database})`);
    } catch {
      setHealthStatus('Connection failed (Verify backend is running on :8000)');
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#1E40AF' }}>👁️ {APP_CONFIG.APP_NAME}</h1>
        <p style={{ color: '#475569' }}>Preliminary Vision Screening & Eyewear Guidance Platform</p>
      </header>

      <div style={{ background: '#FEF3C7', border: '1px solid #D97706', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <strong style={{ color: '#92400E' }}>Important Clinical Notice:</strong>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#78350F' }}>
          {SCREENING_CONSTANTS.CLINICAL_DISCLAIMER_TEXT}
        </p>
      </div>

      <div style={{ border: '1px solid #CBD5E1', padding: '1.5rem', borderRadius: '8px', background: '#F8FAFC' }}>
        <h2>System Architecture Diagnostic</h2>
        <p>Phase: {APP_CONFIG.PHASE}</p>
        <button
          onClick={checkHealth}
          style={{
            background: '#2563EB',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Check Backend Health
        </button>
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Status: {healthStatus}</p>
      </div>
    </div>
  );
}
