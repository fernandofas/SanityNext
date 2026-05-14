'use client';

import 'react-phone-number-input/style.css';
import React, { useRef, useState } from 'react';
import PhoneInput, { Value as PhoneValue } from 'react-phone-number-input';
import { useAuth } from './AuthContext';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`w-full mb-3 forminputpad bradious border border-white/20 bg-white/5 focus:outline-none ${props.className || ''}`} />
);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const e164PhoneRe = /^\+[1-9]\d{7,14}$/;

export default function AuthModal() {
  const { authOpen, closeAuth, authMode, login, register, forgot } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authMode);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', surname: '', phone: '', address: '', postcode: '', company: '' });
  const [registered, setRegistered] = useState(false);

  React.useEffect(() => setMode(authMode), [authMode]);

  if (!authOpen) return null;

  const resetLoginForm = () => { setEmail(''); setPassword(''); setConfirmPassword(''); setShowPassword(false); setShowConfirm(false); setMessage(null); setLoading(false); };
  const resetRegisterForm = () => { setForm({ name: '', surname: '', phone: '', address: '', postcode: '', company: '' }); setEmail(''); setPassword(''); setConfirmPassword(''); setShowPassword(false); setShowConfirm(false); setMessage(null); setLoading(false); setRegistered(false); };

  const switchToLogin = () => { resetLoginForm(); setMode('login'); };
  const switchToRegister = () => { resetRegisterForm(); setMode('register'); };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      await login(email, password);
      resetLoginForm();
    } catch (e: any) {
      setMessage(e.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      if (!form.name.trim() || !form.surname.trim() || !email.trim() || !password || !confirmPassword || !form.phone || !form.address.trim() || !form.postcode.trim() || !form.company.trim()) throw new Error('All fields are required');
      if (!emailRe.test(email.trim())) throw new Error('Enter a valid email');
      if (!strongPwRe.test(password)) throw new Error('Password must be 8+ chars with uppercase/lowercase/numbers/symbols');
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      if (!e164PhoneRe.test(form.phone)) throw new Error('Enter phone in international format, e.g. +44…');
      await register({ ...form, email, password });
      resetRegisterForm();
      setRegistered(true);
    } catch (e: any) {
      setMessage(e.message || 'Register failed');
    } finally { setLoading(false); }
  };

  const onForgot = async () => {
    setLoading(true); setMessage(null);
    try {
      await forgot(email);
      setMessage('If an account exists, a reset email has been sent.');
    } catch (e: any) {
      setMessage(e.message || 'Failed to send reset email');
    } finally { setLoading(false); }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) closeAuth(); }}
    >
      <div
        ref={containerRef}
        className="bradious p-6 w-full max-w-sm mx-4 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--dark-green)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{mode === 'login' ? 'Sign In' : 'Register'}</h2>
          <button onClick={closeAuth} className="opacity-60 hover:opacity-100 text-xl leading-none">&times;</button>
        </div>

        {registered ? (
          <div>
            <p className="mb-4">Registration successful! Please check your email to verify your account.</p>
            <button onClick={switchToLogin} className="text-sm underline opacity-70">Back to sign in</button>
          </div>
        ) : mode === 'login' ? (
          <form onSubmit={onLogin} className="space-y-3">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-2 text-xs opacity-60 hover:opacity-100">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            {message && <p className="text-sm" style={{ color: '#EB5951' }}>{message}</p>}
            <button type="submit" disabled={loading} className="sanity-btn w-full" style={{ backgroundColor: '#314D55', color: '#f1f1f1', padding: '0.6rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <div className="flex justify-between text-sm pt-1">
              <button type="button" onClick={switchToRegister} className="opacity-70 hover:opacity-100">Register</button>
              <button type="button" onClick={onForgot} disabled={!email} className="opacity-70 hover:opacity-100 disabled:opacity-30">Forgot password?</button>
            </div>
          </form>
        ) : (
          <form onSubmit={onRegister} className="space-y-2">
            <Input placeholder="First name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Last name" value={form.surname} onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))} required />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <div className="mb-3">
              <PhoneInput
                international
                defaultCountry="GB"
                value={form.phone as PhoneValue}
                onChange={(v) => setForm((f) => ({ ...f, phone: v || '' }))}
                className="w-full forminputpad bradious border border-white/20 bg-white/5"
              />
            </div>
            <Input placeholder="Company" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} required />
            <Input placeholder="Address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} required />
            <Input placeholder="Postcode" value={form.postcode} onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value }))} required />
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} placeholder="Password (8+ chars, upper/lower/number/symbol)" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-2 text-xs opacity-60 hover:opacity-100">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <div className="relative">
              <Input type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" />
              <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-2 top-2 text-xs opacity-60 hover:opacity-100">{showConfirm ? 'Hide' : 'Show'}</button>
            </div>
            {message && <p className="text-sm" style={{ color: '#EB5951' }}>{message}</p>}
            <button type="submit" disabled={loading} className="sanity-btn w-full" style={{ backgroundColor: '#314D55', color: '#f1f1f1', padding: '0.6rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
              {loading ? 'Registering…' : 'Register'}
            </button>
            <button type="button" onClick={switchToLogin} className="text-sm opacity-70 hover:opacity-100 pt-1">Already have an account? Sign in</button>
          </form>
        )}
      </div>
    </div>
  );
}
