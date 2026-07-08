'use client';

import 'react-phone-number-input/style.css';
import React, { useState } from 'react';
import PhoneInput, { Value as PhoneValue } from 'react-phone-number-input';
import { useAuth } from './AuthContext';

function rc(c: any, fallback = ''): string {
  if (!c) return fallback;
  if (typeof c === 'string') return c || fallback;
  if (c?.rgb) {
    const { r, g, b } = c.rgb;
    return `rgba(${r},${g},${b},${c.alpha ?? 1})`;
  }
  return fallback;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const e164PhoneRe = /^\+[1-9]\d{7,14}$/;

export default function AuthModal({ authStyle }: { authStyle?: any }) {
  const { authOpen, closeAuth, authMode, login, register, forgot } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    address: '',
    postcode: '',
    company: '',
  });
  const [registered, setRegistered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [linkHover, setLinkHover] = useState<string | null>(null);
  const [passwordToggleHover, setPasswordToggleHover] = useState<string | null>(null);

  React.useEffect(() => setMode(authMode), [authMode]);
  if (!authOpen) return null;

  const s = authStyle;

  const overlayBg = rc(s?.overlayColor, 'rgba(15,23,42,0.56)');
  const modalBg = rc(s?.modalBgColor, '#ffffff');
  const modalBorder = rc(s?.modalBorderColor, '#d1d5db');
  const modalBorderW = `${s?.modalBorderWidth ?? 1}px`;
  const modalBorderR = `${s?.modalBorderRadius ?? 18}px`;
  const modalPadX = `${s?.modalPaddingX ?? 24}px`;
  const modalPadY = `${s?.modalPaddingY ?? 24}px`;
  const modalMaxW = `${s?.modalMaxWidth ?? 400}px`;
  const modalShadow = s?.modalBoxShadow || '0 24px 80px rgba(15,23,42,0.28)';
  const formGap = `${s?.formGap ?? 16}px`;

  const textCol = rc(s?.textColor, '#111827');
  const fontFam = s?.fontFamily || undefined;
  const fontSz = `${s?.fontSize ?? 16}px`;
  const headingSz = `${s?.headingFontSize ?? 20}px`;
  const headingWt = s?.headingFontWeight || '700';
  const headingCol = rc(s?.headingColor, textCol);
  const errorCol = rc(s?.errorColor, '#dc2626');

  const inputBg = rc(s?.inputBgColor, '#ffffff');
  const inputText = rc(s?.inputTextColor, '#111827');
  const inputPlaceholder = rc(s?.inputPlaceholderColor, '#6b7280');
  const inputBorder = rc(s?.inputBorderColor, '#9ca3af');
  const inputFocusBorder = rc(s?.inputFocusBorderColor, '#0ea5e9');
  const inputFocusBg = rc(s?.inputFocusBgColor, inputBg);
  const inputBorderW = `${s?.inputBorderWidth ?? 1}px`;
  const inputBorderR = `${s?.inputBorderRadius ?? 8}px`;
  const inputPadX = `${s?.inputPaddingX ?? 12}px`;
  const inputPadY = `${s?.inputPaddingY ?? 10}px`;
  const inputFontSz = `${s?.inputFontSize ?? 16}px`;

  const btnBg = btnHover ? (rc(s?.btnHoverBg, '') || rc(s?.btnBg, '#0f766e')) : rc(s?.btnBg, '#0f766e');
  const btnText = btnHover ? (rc(s?.btnHoverTextColor, '') || rc(s?.btnTextColor, '#ffffff')) : rc(s?.btnTextColor, '#ffffff');
  const btnBord = btnHover ? (rc(s?.btnHoverBorderColor, '') || rc(s?.btnBorderColor, '')) : rc(s?.btnBorderColor, '');
  const btnBordW = s?.btnBorderWidth ?? 0;
  const btnBordR = `${s?.btnBorderRadius ?? 999}px`;
  const btnPadX = `${s?.btnPaddingX ?? 16}px`;
  const btnPadY = `${s?.btnPaddingY ?? 12}px`;
  const btnFontSz = `${s?.btnFontSize ?? 16}px`;
  const btnFontWeight = s?.btnFontWeight || '700';

  const linkCol = rc(s?.linkColor, '#2563eb');
  const linkHoverCol = rc(s?.linkHoverColor, linkCol);
  const linkFontSz = `${s?.linkFontSize ?? 14}px`;
  const linkFontWeight = s?.linkFontWeight || '500';
  const closeCol = closeHover
    ? (rc(s?.closeButtonHoverColor, '') || rc(s?.closeButtonColor, textCol))
    : rc(s?.closeButtonColor, textCol);
  const closeSize = `${s?.closeButtonSize ?? 22}px`;
  const passwordToggleCol = rc(s?.passwordToggleColor, '#4b5563');
  const passwordToggleHoverCol = rc(s?.passwordToggleHoverColor, passwordToggleCol);
  const passwordToggleFontSize = `${s?.passwordToggleFontSize ?? 12}px`;

  const labels = {
    signInTitle: s?.signInTitle || 'Sign In',
    registerTitle: s?.registerTitle || 'Register',
    signInBtn: s?.signInBtnLabel || 'Sign in',
    registerBtn: s?.registerBtnLabel || 'Register',
    registerLink: s?.registerLinkLabel || 'Register',
    forgotPw: s?.forgotPasswordLabel || 'Forgot password?',
    alreadyHave: s?.alreadyHaveAccountLabel || 'Already have an account? Sign in',
    regSuccess:
      s?.registrationSuccessMessage ||
      'Registration successful! Please check your email to verify your account.',
    backToSignIn: s?.backToSignInLabel || 'Back to sign in',
  };

  const inputStyle = (name?: string): React.CSSProperties => ({
    backgroundColor: focusedInput === name ? inputFocusBg : inputBg,
    color: inputText,
    borderColor: focusedInput === name ? inputFocusBorder : inputBorder,
    borderWidth: inputBorderW,
    borderStyle: 'solid',
    borderRadius: inputBorderR,
    padding: `${inputPadY} ${inputPadX}`,
    fontSize: inputFontSz,
    width: '100%',
    outline: 'none',
    display: 'block',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
  });

  const btnStyle: React.CSSProperties = {
    backgroundColor: btnBg,
    color: btnText,
    borderColor: btnBord || undefined,
    borderWidth: btnBordW ? `${btnBordW}px` : undefined,
    borderStyle: btnBordW ? 'solid' : 'none',
    borderRadius: btnBordR,
    padding: `${btnPadY} ${btnPadX}`,
    fontSize: btnFontSz,
    fontWeight: btnFontWeight,
    width: '100%',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
  };

  const linkStyle = (key: string): React.CSSProperties => ({
    color: linkHover === key ? linkHoverCol : linkCol,
    fontSize: linkFontSz,
    fontWeight: linkFontWeight,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'color 0.2s',
  });

  const passwordToggleStyle = (key: string): React.CSSProperties => ({
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: passwordToggleFontSize,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: passwordToggleHover === key ? passwordToggleHoverCol : passwordToggleCol,
    transition: 'color 0.2s',
  });

  const resetLoginForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
    setMessage(null);
    setLoading(false);
  };

  const resetRegisterForm = () => {
    setForm({ name: '', surname: '', phone: '', address: '', postcode: '', company: '' });
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
    setMessage(null);
    setLoading(false);
    setRegistered(false);
  };

  const switchToLogin = () => {
    resetLoginForm();
    setMode('login');
  };

  const switchToRegister = () => {
    resetRegisterForm();
    setMode('register');
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await login(email, password);
      resetLoginForm();
    } catch (e: any) {
      setMessage(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (
        !form.name.trim() ||
        !form.surname.trim() ||
        !email.trim() ||
        !password ||
        !confirmPassword ||
        !form.phone ||
        !form.address.trim() ||
        !form.postcode.trim() ||
        !form.company.trim()
      ) {
        throw new Error('All fields are required');
      }
      if (!emailRe.test(email.trim())) throw new Error('Enter a valid email');
      if (!strongPwRe.test(password)) {
        throw new Error('Password must be 8+ chars with uppercase/lowercase/numbers/symbols');
      }
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      if (!e164PhoneRe.test(form.phone)) {
        throw new Error('Enter phone in international format, e.g. +441234567890');
      }
      await register({ ...form, email, password });
      resetRegisterForm();
      setRegistered(true);
    } catch (e: any) {
      setMessage(e.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  const onForgot = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await forgot(email);
      setMessage('If an account exists, a reset email has been sent.');
    } catch (e: any) {
      setMessage(e.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const Inp = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const name = props.name || props.placeholder || undefined;
    return (
      <input
        {...props}
        className={`auth-modal-input ${props.className || ''}`}
        onFocus={(e) => {
          setFocusedInput(name || null);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocusedInput(null);
          props.onBlur?.(e);
        }}
        style={{ ...inputStyle(name), ...(props.style || {}) }}
      />
    );
  };

  const AuthLink = ({
    hoverKey,
    children,
    style,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { hoverKey: string }) => (
    <button
      {...props}
      onMouseEnter={(e) => {
        setLinkHover(hoverKey);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setLinkHover(null);
        props.onMouseLeave?.(e);
      }}
      style={{ ...linkStyle(hoverKey), ...style }}
    >
      {children}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: overlayBg }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuth();
      }}
    >
      <style>{`
        .auth-modal-input::placeholder,
        .auth-modal-phone input::placeholder {
          color: ${inputPlaceholder};
          opacity: 1;
        }
        .auth-modal-phone input {
          background: transparent;
          color: ${inputText};
          border: 0;
          outline: 0;
          width: 100%;
          font-size: ${inputFontSz};
        }
        .auth-modal-phone .PhoneInputCountry {
          margin-right: 8px;
        }
      `}</style>
      <div
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
          boxShadow: modalShadow,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 style={{ fontSize: headingSz, fontWeight: headingWt, color: headingCol, margin: 0 }}>
            {mode === 'login' ? labels.signInTitle : labels.registerTitle}
          </h2>
          <button
            type="button"
            aria-label="Close sign in popup"
            onClick={closeAuth}
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            style={{
              color: closeCol,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: closeSize,
              lineHeight: 1,
              opacity: 0.9,
            }}
          >
            x
          </button>
        </div>

        {registered ? (
          <div>
            <p className="mb-4">{labels.regSuccess}</p>
            <AuthLink hoverKey="back-to-sign-in" type="button" onClick={switchToLogin}>
              {labels.backToSignIn}
            </AuthLink>
          </div>
        ) : mode === 'login' ? (
          <form onSubmit={onLogin} style={{ display: 'grid', gap: formGap }}>
            <Inp
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <div style={{ position: 'relative' }}>
              <Inp
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingRight: '58px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                onMouseEnter={() => setPasswordToggleHover('login-password')}
                onMouseLeave={() => setPasswordToggleHover(null)}
                style={passwordToggleStyle('login-password')}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {message && <p style={{ color: errorCol, fontSize: '0.875rem', margin: 0 }}>{message}</p>}
            <button
              type="submit"
              disabled={loading}
              style={btnStyle}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              {loading ? 'Signing in...' : labels.signInBtn}
            </button>
            <div className="flex justify-between pt-2">
              <AuthLink type="button" hoverKey="register" onClick={switchToRegister}>
                {labels.registerLink}
              </AuthLink>
              <AuthLink
                type="button"
                hoverKey="forgot"
                onClick={onForgot}
                disabled={!email}
                style={{ opacity: email ? 1 : 0.45 }}
              >
                {labels.forgotPw}
              </AuthLink>
            </div>
          </form>
        ) : (
          <form onSubmit={onRegister} style={{ display: 'grid', gap: formGap }}>
            <Inp
              name="firstName"
              placeholder="First name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <Inp
              name="lastName"
              placeholder="Last name"
              value={form.surname}
              onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))}
              required
            />
            <Inp
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <PhoneInput
              international
              defaultCountry="GB"
              value={form.phone as PhoneValue}
              onChange={(v) => setForm((f) => ({ ...f, phone: v || '' }))}
              className="auth-modal-phone"
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('phone')}
            />
            <Inp
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              required
            />
            <Inp
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              required
            />
            <Inp
              name="postcode"
              placeholder="Postcode"
              value={form.postcode}
              onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value }))}
              required
            />
            <div style={{ position: 'relative' }}>
              <Inp
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (8+ chars, upper/lower/number/symbol)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{ paddingRight: '58px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                onMouseEnter={() => setPasswordToggleHover('register-password')}
                onMouseLeave={() => setPasswordToggleHover(null)}
                style={passwordToggleStyle('register-password')}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Inp
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{ paddingRight: '58px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                onMouseEnter={() => setPasswordToggleHover('confirm-password')}
                onMouseLeave={() => setPasswordToggleHover(null)}
                style={passwordToggleStyle('confirm-password')}
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
            {message && <p style={{ color: errorCol, fontSize: '0.875rem', margin: 0 }}>{message}</p>}
            <button
              type="submit"
              disabled={loading}
              style={btnStyle}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              {loading ? 'Registering...' : labels.registerBtn}
            </button>
            <AuthLink type="button" hoverKey="already-have" onClick={switchToLogin} style={{ justifySelf: 'start' }}>
              {labels.alreadyHave}
            </AuthLink>
          </form>
        )}
      </div>
    </div>
  );
}
