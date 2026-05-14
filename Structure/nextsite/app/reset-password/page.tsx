'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '../../api/auth';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="padcont padtop padbot"><p>Loading…</p></div>}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (!strongPwRe.test(password)) throw new Error('Password must be 8+ chars with uppercase/lowercase/numbers/symbols');
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      if (!token) throw new Error('Invalid reset link');
      await resetPassword(token, password);
      setDone(true);
      setMessage('Password reset successfully. You can now sign in.');
    } catch (e: any) {
      setMessage(e.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full mb-3 forminputpad bradious border border-white/20 bg-white/5 focus:outline-none';

  return (
    <div className="padcont padtop padbot max-w-sm mx-auto">
      <h1 className="mb-6">Reset Password</h1>

      {done ? (
        <p style={{ color: '#00FFC2' }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={inputClass}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-2 text-xs opacity-60">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type="password"
            className={inputClass}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {message && <p className="text-sm" style={{ color: '#EB5951' }}>{message}</p>}
          <button
            type="submit"
            disabled={loading || !token}
            className="sanity-btn w-full"
            style={{ backgroundColor: '#314D55', color: '#f1f1f1', padding: '0.6rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Resetting…' : 'Reset password'}
          </button>
        </form>
      )}
    </div>
  );
}
