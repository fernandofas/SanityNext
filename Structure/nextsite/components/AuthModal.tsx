'use client';

import 'react-phone-number-input/style.css';
import React, { useRef, useState } from 'react';
import PhoneInput, { Value as PhoneValue } from 'react-phone-number-input';
import { useAuth } from './AuthContext';

function rc(c: any, fallback = ''): string {
  if (!c) return fallback;
  if (typeof c === 'string') return c || fallback;
  if (c?.rgb) { const { r, g, b } = c.rgb; return `rgba(${r},${g},${b},${c.alpha ?? 1})`; }
  return fallback;
}

const emailRe   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const e164PhoneRe = /^\+[1-9]\d{7,14}$/;

export default function AuthModal({ authStyle }: { authStyle?: any }) {
  const { authOpen, closeAuth, authMode, login, register, forgot } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authMode);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [message, setMessage]           = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', surname: '', phone: '', address: '', postcode: '', company: '' });
  const [registered, setRegistered]     = useState(false);
  const [btnHover, setBtnHover]         = useState(false);
  const [closeHover, setCloseHover]     = useState(false);

  React.useEffect(() => setMode(authMode), [authMode]);
  if (!authOpen) return null;

  const s = authStyle;

  // ── Resolved styles ────────────────────────────────────────────────────────
  const overlayBg    = rc(s?.overlayColor, 'rgba(0,0,0,0.6)');
  const modalBg      = rc(s?.modalBgColor, 'var(--dark-green)');
  const modalBorder  = rc(s?.modalBorderColor, 'rgba(255,255,255,0.15)');
  const modalBorderW = `${s?.modalBorderWidth ?? 1}px`;
  const modalBorderR = `${s?.modalBorderRadius ?? 8}px`;
  const modalPadX    = `${s?.modalPaddingX ?? 24}px`;
  const modalPadY    = `${s?.modalPaddingY ?? 24}px`;
  const modalMaxW    = `${s?.modalMaxWidth ?? 380}px`;

  const textCol   = rc(s?.textColor, '') || undefined;
  const fontFam   = s?.fontFamily || undefined;
  const fontSz    = s?.fontSize ? `${s.fontSize}px` : undefined;

  const headingSz = s?.headingFontSize ? `${s.headingFontSize}px` : undefined;
  const headingWt = s?.headingFontWeight || '700';
  const headingCol= rc(s?.headingColor, '') || undefined;

  const errorCol  = rc(s?.errorColor, '#EB5951');

  const inputBg      = rc(s?.inputBgColor,    'rgba(255,255,255,0.05)');
  const inputText    = rc(s?.inputTextColor,   '') || undefined;
  const inputBorder  = rc(s?.inputBorderColor, 'rgba(255,255,255,0.2)');
  const inputBorderW = `${s?.inputBorderWidth ?? 1}px`;
  const inputBorderR = `${s?.inputBorderRadius ?? 4}px`;
  const inputPadX    = `${s?.inputPaddingX ?? 12}px`;
  const inputPadY    = `${s?.inputPaddingY ?? 8}px`;
  const inputFontSz  = s?.inputFontSize ? `${s.inputFontSize}px` : undefined;

  const inputStyle: React.CSSProperties = {
    backgroundColor: inputBg,
    color: inputText,
    borderColor: inputBorder,
    borderWidth: inputBorderW,
    borderStyle: 'solid',
    borderRadius: inputBorderR,
    padding: `${inputPadY} ${inputPadX}`,
    fontSize: inputFontSz,
    width: '100%',
    marginBottom: '12px',
    outline: 'none',
    display: 'block',
  };

  const btnBg    = btnHover ? (rc(s?.btnHoverBg,'') || rc(s?.btnBg, '#314D55')) : rc(s?.btnBg, '#314D55');
  const btnText  = btnHover ? (rc(s?.btnHoverTextColor,'') || rc(s?.btnTextColor, '#f1f1f1')) : rc(s?.btnTextColor, '#f1f1f1');
  const btnBord  = btnHover ? (rc(s?.btnHoverBorderColor,'') || rc(s?.btnBorderColor,'')) : rc(s?.btnBorderColor,'');
  const btnBordW = s?.btnBorderWidth ?? 0;
  const btnBordR = `${s?.btnBorderRadius ?? 9999}px`;
  const btnPadX  = `${s?.btnPaddingX ?? 16}px`;
  const btnPadY  = `${s?.btnPaddingY ?? 10}px`;
  const btnFontSz= s?.btnFontSize ? `${s.btnFontSize}px` : undefined;

  const btnStyle: React.CSSProperties = {
    backgroundColor: btnBg,
    color: btnText,
    borderColor: btnBord || undefined,
    borderWidth: btnBordW ? `${btnBordW}px` : undefined,
    borderStyle: btnBordW ? 'solid' : 'none',
    borderRadius: btnBordR,
    padding: `${btnPadY} ${btnPadX}`,
    fontSize: btnFontSz,
    width: '100%',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
  };

  const linkCol      = rc(s?.linkColor, '') || undefined;
  const linkFontSz   = s?.linkFontSize ? `${s.linkFontSize}px` : undefined;
  const closeCol     = closeHover ? (rc(s?.closeButtonHoverColor,'') || rc(s?.closeButtonColor,'')) : rc(s?.closeButtonColor, '');

  const linkStyle: React.CSSProperties = { color: linkCol, fontSize: linkFontSz, background: 'none', border: 'none', cursor: 'pointer', padding: 0 };

  // ── Labels ─────────────────────────────────────────────────────────────────
  const L = {
    signInTitle:    s?.signInTitle    || 'Sign In',
    registerTitle:  s?.registerTitle  || 'Register',
    signInBtn:      s?.signInBtnLabel || 'Sign in',
    registerBtn:    s?.registerBtnLabel || 'Register',
    registerLink:   s?.registerLinkLabel || 'Register',
    forgotPw:       s?.forgotPasswordLabel || 'Forgot password?',
    alreadyHave:    s?.alreadyHaveAccountLabel || 'Already have an account? Sign in',
    regSuccess:     s?.registrationSuccessMessage || 'Registration successful! Please check your email to verify your account.',
    backToSignIn:   s?.backToSignInLabel || 'Back to sign in',
  };

  // ── Auth logic ─────────────────────────────────────────────────────────────
  const resetLoginForm    = () => { setEmail(''); setPassword(''); setConfirmPassword(''); setShowPassword(false); setShowConfirm(false); setMessage(null); setLoading(false); };
  const resetRegisterForm = () => { setForm({ name: '', surname: '', phone: '', address: '', postcode: '', company: '' }); setEmail(''); setPassword(''); setConfirmPassword(''); setShowPassword(false); setShowConfirm(false); setMessage(null); setLoading(false); setRegistered(false); };
  const switchToLogin     = () => { resetLoginForm();    setMode('login'); };
  const switchToRegister  = () => { resetRegisterForm(); setMode('register'); };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMessage(null);
    try { await login(email, password); resetLoginForm(); }
    catch (e: any) { setMessage(e.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMessage(null);
    try {
      if (!form.name.trim() || !form.surname.trim() || !email.trim() || !password || !confirmPassword || !form.phone || !form.address.trim() || !form.postcode.trim() || !form.company.trim()) throw new Error('All fields are required');
      if (!emailRe.test(email.trim())) throw new Error('Enter a valid email');
      if (!strongPwRe.test(password)) throw new Error('Password must be 8+ chars with uppercase/lowercase/numbers/symbols');
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      if (!e164PhoneRe.test(form.phone)) throw new Error('Enter phone in international format, e.g. +44…');
      await register({ ...form, email, password });
      resetRegisterForm(); setRegistered(true);
    } catch (e: any) { setMessage(e.message || 'Register failed'); }
    finally { setLoading(false); }
  };

  const onForgot = async () => {
    setLoading(true); setMessage(null);
    try { await forgot(email); setMessage('If an account exists, a reset email has been sent.'); }
    catch (e: any) { setMessage(e.message || 'Failed to send reset email'); }
    finally { setLoading(false); }
  };

  // ── Shared input renderer ──────────────────────────────────────────────────
  const Inp = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: overlayBg }}
      onClick={(e) => { if (e.target === e.currentTarget) closeAuth(); }}
    >
      <div
        ref={containerRef}
        className="w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: modalBg,
          color: textCol,
          fontFamily: fontFam,
          fontSize: fontSz,
          border: `${modalBorderW} solid ${modalBorder}`,
          borderRadius: modalBorderR,
          padding: `${modalPadY} ${modalPadX}`,
          maxWidth: modalMaxW,
        }}
      >
        {/* Header row */}
        <div className="flex justify-between items-center mb-4">
          <h2 style={{ fontSize: headingSz, fontWeight: headingWt, color: headingCol, margin: 0 }}>
            {mode === 'login' ? L.signInTitle : L.registerTitle}
          </h2>
          <button
            onClick={closeAuth}
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            style={{ color: closeCol || undefined, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1, opacity: closeCol ? 1 : 0.6 }}
          >
            &times;
          </button>
        </div>

        {registered ? (
          <div>
            <p className="mb-4">{L.regSuccess}</p>
            <button onClick={switchToLogin} style={linkStyle}>{L.backToSignIn}</button>
          </div>
        ) : mode === 'login' ? (
          <form onSubmit={onLogin}>
            <Inp type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <div style={{ position: 'relative' }}>
              <Inp type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '0.75rem', opacity: 0.6, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {message && <p style={{ color: errorCol, fontSize: '0.875rem', marginBottom: '8px' }}>{message}</p>}
            <button
              type="submit"
              disabled={loading}
              style={btnStyle}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              {loading ? 'Signing in…' : L.signInBtn}
            </button>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={switchToRegister} style={linkStyle}>{L.registerLink}</button>
              <button type="button" onClick={onForgot} disabled={!email} style={{ ...linkStyle, opacity: email ? 1 : 0.35 }}>{L.forgotPw}</button>
            </div>
          </form>
        ) : (
          <form onSubmit={onRegister}>
            <Inp placeholder="First name"  value={form.name}    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}    required />
            <Inp placeholder="Last name"   value={form.surname} onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))} required />
            <Inp type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <div style={{ marginBottom: '12px' }}>
              <PhoneInput
                international
                defaultCountry="GB"
                value={form.phone as PhoneValue}
                onChange={(v) => setForm((f) => ({ ...f, phone: v || '' }))}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
            </div>
            <Inp placeholder="Company"  value={form.company}  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}  required />
            <Inp placeholder="Address"  value={form.address}  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}  required />
            <Inp placeholder="Postcode" value={form.postcode} onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value }))} required />
            <div style={{ position: 'relative' }}>
              <Inp type={showPassword ? 'text' : 'password'} placeholder="Password (8+ chars, upper/lower/number/symbol)" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '0.75rem', opacity: 0.6, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Inp type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" />
              <button type="button" onClick={() => setShowConfirm((v) => !v)} style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '0.75rem', opacity: 0.6, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
            {message && <p style={{ color: errorCol, fontSize: '0.875rem', marginBottom: '8px' }}>{message}</p>}
            <button
              type="submit"
              disabled={loading}
              style={btnStyle}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              {loading ? 'Registering…' : L.registerBtn}
            </button>
            <button type="button" onClick={switchToLogin} style={{ ...linkStyle, marginTop: '8px', display: 'block' }}>
              {L.alreadyHave}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

