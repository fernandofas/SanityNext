'use client';

import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { Value as PhoneValue } from 'react-phone-number-input';
import { useAuth } from '../../components/AuthContext';

type Profile = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  postcode: string;
  role: string;
};

export default function AccountPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/account/profile');
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setProfile(data.profile);
      } catch (e: any) {
        setMessage(e.message || 'Failed to load profile');
      }
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (password && password !== confirmPassword) throw new Error('Passwords do not match');
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile?.name,
          surname: profile?.surname,
          phone: profile?.phone,
          company: profile?.company,
          address: profile?.address,
          postcode: profile?.postcode,
          password: password || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      if (data.pendingConfirmation) setMessage('Check your email to confirm the change.');
      else setMessage('Profile saved.');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirm(false);
    } catch (e: any) {
      setMessage(e.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/account', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      window.location.href = '/';
    } catch (e: any) {
      setMessage(e.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="padcont padtop padbot">
        <p>Please sign in to view your account.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="padcont padtop padbot">
        {message ? <p className="text-sm" style={{ color: '#EB5951' }}>{message}</p> : <p>Loading…</p>}
      </div>
    );
  }

  const inputClass = 'w-full mb-3 forminputpad bradious border border-white/20 bg-white/5 focus:outline-none';

  return (
    <div className="padcont padtop padbot max-w-lg">
      <h1 className="mb-6">My Account</h1>
      <form onSubmit={handleSave} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs opacity-70">First name</label>
            <input className={inputClass} value={profile.name} onChange={(e) => setProfile((p) => p && { ...p, name: e.target.value })} required />
          </div>
          <div>
            <label className="text-xs opacity-70">Last name</label>
            <input className={inputClass} value={profile.surname} onChange={(e) => setProfile((p) => p && { ...p, surname: e.target.value })} required />
          </div>
        </div>

        <div>
          <label className="text-xs opacity-70">Email (read-only)</label>
          <input className={`${inputClass} opacity-50`} value={profile.email} disabled />
        </div>

        <div>
          <label className="text-xs opacity-70">Phone</label>
          <PhoneInput
            international
            defaultCountry="GB"
            value={profile.phone as PhoneValue}
            onChange={(v) => setProfile((p) => p && { ...p, phone: v || '' })}
            className="w-full forminputpad bradious border border-white/20 bg-white/5"
          />
        </div>

        <div>
          <label className="text-xs opacity-70">Company</label>
          <input className={inputClass} value={profile.company} onChange={(e) => setProfile((p) => p && { ...p, company: e.target.value })} />
        </div>

        <div>
          <label className="text-xs opacity-70">Address</label>
          <input className={inputClass} value={profile.address} onChange={(e) => setProfile((p) => p && { ...p, address: e.target.value })} />
        </div>

        <div>
          <label className="text-xs opacity-70">Postcode</label>
          <input className={inputClass} value={profile.postcode} onChange={(e) => setProfile((p) => p && { ...p, postcode: e.target.value })} />
        </div>

        <hr className="my-4 border-white/10" />
        <p className="text-sm opacity-70">Change password (leave blank to keep current)</p>

        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} className={inputClass} placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-2 text-xs opacity-60">{showPassword ? 'Hide' : 'Show'}</button>
        </div>

        <div className="relative">
          <input type={showConfirm ? 'text' : 'password'} className={inputClass} placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
          <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-2 top-2 text-xs opacity-60">{showConfirm ? 'Hide' : 'Show'}</button>
        </div>

        {message && <p className="text-sm mt-2" style={{ color: message.includes('saved') || message.includes('Check') ? '#00FFC2' : '#EB5951' }}>{message}</p>}

        <button type="submit" disabled={loading} className="sanity-btn w-full mt-2" style={{ backgroundColor: '#314D55', color: '#f1f1f1', padding: '0.6rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <hr className="my-8 border-white/10" />

      <button onClick={handleDelete} disabled={loading} className="text-sm opacity-60 hover:opacity-90" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EB5951' }}>
        Delete account
      </button>
    </div>
  );
}
