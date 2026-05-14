'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyRegistrationPage() {
  return (
    <Suspense fallback={<div className="padcont padtop padbot"><p>Verifying…</p></div>}>
      <VerifyInner />
    </Suspense>
  );
}

function VerifyInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('Verifying your account…');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    fetch(`/api/verify?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setStatus('success');
          setMessage('Your account has been verified! You can now sign in.');
          setTimeout(() => router.push('/'), 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed. The link may have expired.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. Please try again.');
      });
  }, [token, router]);

  return (
    <div className="padcont padtop padbot max-w-sm mx-auto text-center">
      <h1 className="mb-6">Verify Account</h1>
      <p
        style={{
          color:
            status === 'success'
              ? '#00FFC2'
              : status === 'error'
              ? '#EB5951'
              : 'inherit',
        }}
      >
        {message}
      </p>
      {status === 'success' && (
        <p className="text-sm opacity-70 mt-2">Redirecting to home…</p>
      )}
    </div>
  );
}
