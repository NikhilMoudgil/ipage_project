import React, { useState } from 'react';
import { submitEnquiry } from '../services/api';
import type { Enquiry } from '../types';

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Enquiry, '_id' | 'status'>>({
    name: '',
    email: '',
    phone: '',
    userType: 'Customer',
    serviceOrCourse: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }
    
    if (!formData.serviceOrCourse.trim()) newErrors.serviceOrCourse = "Please specify a service or course.";
    if (!formData.message.trim()) newErrors.message = "Please include a message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setServerError('');
    
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await submitEnquiry(formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', userType: 'Customer', serviceOrCourse: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
        setServerError(res.error || 'Failed to submit enquiry.');
      }
    } catch (error) {
      setStatus('error');
      setServerError('Server communication error.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px', borderRadius: '6px', 
    border: '1px solid #cbd5e1', marginBottom: '4px', fontSize: '14px', boxSizing: 'border-box'
  };

  const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: '12px', marginBottom: '12px', display: 'block' };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Get in Touch</h2>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px' }}>Fill out the form below to request a service or register for a course.</p>

      {status === 'success' && (
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '15px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center' }}>
          ✅ Your enquiry has been submitted successfully! We will contact you soon.
        </div>
      )}
      
      {status === 'error' && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center' }}>
          ❌ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Full Name</label>
        <input style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#cbd5e1' }} type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        {errors.name && <span style={errorStyle}>{errors.name}</span>}

        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Email Address</label>
        <input style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : '#cbd5e1' }} type="text" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        {errors.email && <span style={errorStyle}>{errors.email}</span>}

        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Phone Number</label>
        <input style={{ ...inputStyle, borderColor: errors.phone ? '#ef4444' : '#cbd5e1' }} type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        {errors.phone && <span style={errorStyle}>{errors.phone}</span>}

        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>I am a...</label>
        <select style={{ ...inputStyle, marginBottom: '12px' }} value={formData.userType} onChange={e => setFormData({ ...formData, userType: e.target.value as any })}>
          <option value="Customer">Customer (Looking for Services)</option>
          <option value="Student">Student (Looking for Training)</option>
          <option value="Other">Other</option>
        </select>

        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Service or Course of Interest</label>
        <input style={{ ...inputStyle, borderColor: errors.serviceOrCourse ? '#ef4444' : '#cbd5e1' }} type="text" value={formData.serviceOrCourse} onChange={e => setFormData({ ...formData, serviceOrCourse: e.target.value })} />
        {errors.serviceOrCourse && <span style={errorStyle}>{errors.serviceOrCourse}</span>}

        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Message</label>
        <textarea style={{ ...inputStyle, minHeight: '100px', borderColor: errors.message ? '#ef4444' : '#cbd5e1' }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
        {errors.message && <span style={errorStyle}>{errors.message}</span>}

        <button type="submit" disabled={status === 'loading'} style={{ background: '#0284c7', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  );
};