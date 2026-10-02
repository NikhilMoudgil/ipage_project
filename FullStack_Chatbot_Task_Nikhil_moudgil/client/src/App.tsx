import React, { useState } from 'react';
import { EnquiryForm } from './components/EnquiryForm';
import { Chatbot } from './components/Chatbot';
import { AdminDashboard } from './components/AdminDashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'admin'>('form');

  // Reusable card style for the grids
  const cardStyle = {
    background: '#fff', padding: '20px', borderRadius: '8px', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flex: '1', minWidth: '250px'
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      
      {/* Top Navigation */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '2.5rem', marginBottom: '10px' }}>DroneTV 🚁</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '20px' }}>
          Certified Drone Training & Professional Aerial Services
        </p>

        {/* View Switcher Tabs */}
        <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: '4px', borderRadius: '8px', gap: '4px' }}>
          <button onClick={() => setActiveTab('form')} style={{ padding: '8px 20px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', background: activeTab === 'form' ? '#ffffff' : 'transparent', color: activeTab === 'form' ? '#0f172a' : '#64748b' }}>
            🏠 Home & Enquiry
          </button>
          <button onClick={() => setActiveTab('admin')} style={{ padding: '8px 20px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', background: activeTab === 'admin' ? '#ffffff' : 'transparent', color: activeTab === 'admin' ? '#0f172a' : '#64748b' }}>
            📊 Admin Dashboard
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {activeTab === 'form' ? (
          <div>
            {/* --- NEW: Services Section --- */}
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Our Services</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={cardStyle}>
                  <h3 style={{ color: '#0284c7', marginBottom: '10px' }}>🎥 Aerial Cinematography</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>High-quality 4K/8K aerial filming for events, real estate, and commercial advertising.</p>
                </div>
                <div style={cardStyle}>
                  <h3 style={{ color: '#0284c7', marginBottom: '10px' }}>🏗️ Industrial Inspection</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>Safe, efficient drone inspections for infrastructure, towers, and hard-to-reach assets.</p>
                </div>
                <div style={cardStyle}>
                  <h3 style={{ color: '#0284c7', marginBottom: '10px' }}>🗺️ Mapping & Surveying</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>Precision topographical data and 3D modeling for construction and agriculture.</p>
                </div>
              </div>
            </section>

            {/* --- NEW: Courses Section --- */}
            <section style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Training Courses</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={cardStyle}>
                  <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>📜 DGCA Remote Pilot</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>Official certification course covering regulations, flight dynamics, and practical flying.</p>
                </div>
                <div style={cardStyle}>
                  <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>🎬 Cinematic Masterclass</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>Advanced techniques for camera settings, flight paths, and post-production editing.</p>
                </div>
              </div>
            </section>

            {/* Existing Form Section */}
            <section id="contact">
              <EnquiryForm />
            </section>
          </div>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Floating Chatbot Assistant */}
      <Chatbot />
      
    </div>
  );
};

export default App;