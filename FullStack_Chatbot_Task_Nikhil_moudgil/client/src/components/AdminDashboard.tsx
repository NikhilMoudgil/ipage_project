import React, { useState, useEffect } from 'react';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } from '../services/api';
import type { Enquiry } from '../types';

export const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userTypeFilter, setUserTypeFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiries(userTypeFilter, searchTerm);
      if (res.success) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [userTypeFilter, searchTerm]);

  const handleStatusChange = async (id: string, newStatus: Enquiry['status']) => {
    const res = await updateEnquiryStatus(id, newStatus);
    if (res.success) {
      setEnquiries(prev =>
        prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const res = await deleteEnquiry(id);
      if (res.success) {
        setEnquiries(prev => prev.filter(item => item._id !== id));
      }
    }
  };

  const getStatusBadgeColor = (status: Enquiry['status']) => {
    switch (status) {
      case 'New': return { bg: '#e0f2fe', text: '#0369a1' };
      case 'Contacted': return { bg: '#fef3c7', text: '#b45309' };
      case 'In Progress': return { bg: '#ffedd5', text: '#c2410c' };
      case 'Closed': return { bg: '#dcfce7', text: '#15803d' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '20px' }}>📊 Admin Enquiry Management</h2>

      {/* Filter and Search Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '14px'
          }}
        />

        <select
          value={userTypeFilter}
          onChange={e => setUserTypeFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
            background: '#ffffff'
          }}
        >
          <option value="All">All User Types</option>
          <option value="Customer">Customer</option>
          <option value="Student">Student</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table Container */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>No enquiries found.</p>
      ) : (
        <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '12px' }}>Name / Contact</th>
                <th style={{ padding: '12px' }}>Type</th>
                <th style={{ padding: '12px' }}>Interest</th>
                <th style={{ padding: '12px' }}>Message</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(item => {
                const badge = getStatusBadgeColor(item.status);
                return (
                  <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{item.email}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{item.phone}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: '#f1f5f9', color: '#334155' }}>
                        {item.userType}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{item.serviceOrCourse}</td>
                    <td style={{ padding: '12px', maxWidth: '200px', color: '#475569', fontSize: '13px' }}>{item.message}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={item.status}
                        onChange={e => handleStatusChange(item._id!, e.target.value as Enquiry['status'])}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          border: 'none',
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer',
                          background: badge.bg,
                          color: badge.text
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(item._id!)}
                        style={{
                          background: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};