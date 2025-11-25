'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');

        if (errorParam) {
            setStatus('error');
            setError('Authorization was denied');
            return;
        }

        if (!code) {
            setStatus('error');
            setError('No authorization code received');
            return;
        }

        // Exchange code for tokens
        fetch(`/api/callback?code=${code}&state=${state}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setStatus('error');
                    setError(data.error_description || data.error);
                    return;
                }

                // Store tokens (in production, use secure storage)
                if (typeof window !== 'undefined') {
                    localStorage.setItem('spotify_access_token', data.access_token);
                    localStorage.setItem('spotify_refresh_token', data.refresh_token);
                }

                // Redirect to dashboard
                router.push('/dashboard');
            })
            .catch(err => {
                setStatus('error');
                setError(err.message);
            });
    }, [searchParams]);

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-75 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Connecting to Spotify...</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-400 to-pink-500">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <a
                        href="/"
                        className="block text-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Try Again
                    </a>
                </div>
            </div>
        );
    }

    return null;
}

export default function CallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-75 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Connecting to Spotify...</p>
                </div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}
