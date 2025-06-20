import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, UserPlus, RefreshCw, BookOpen, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import scenicVideo from '../assets/video.mp4';
import scenicFallback from '../assets/fallback.jpg';

const Auth: React.FC = () => {
  const { signIn, signUp, isDemoMode } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsSignUp(params.get('mode') === 'signup');
  }, []);

  const handleResendEmail = async () => {
    try {
      setResendingEmail(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      setError('Verification email has been resent. Please check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setResendingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setIsEmailNotConfirmed(false);

    if (isSignUp && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
        setError('Please check your email for verification instructions.');
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      if (errorMessage.includes('email_not_confirmed')) {
        setIsEmailNotConfirmed(true);
        setError('Please verify your email address before signing in.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 overflow-hidden">

      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster={scenicFallback}
      >
        <source src={scenicVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay for darkening the video slightly */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* 🔹 Foreground content */}
      <div className="relative z-20 flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-xl backdrop-blur-sm">
          <div className="text-center">
            <a href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </a>
            <div className="flex justify-center">
              <BookOpen className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
              PrepBuddy
            </h2>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">by Mani</p>
            <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Start your 100-day journey' : 'Continue your preparation'}
            </p>
          </div>

          {isDemoMode && (
            <div className="bg-amber-100 dark:bg-amber-900 border border-amber-400 text-amber-700 dark:text-amber-200 px-4 py-3 rounded-lg relative" role="alert">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="block sm:inline">
                  <strong>Demo Mode:</strong> Supabase is not configured. Authentication is disabled.
                </span>
              </div>
              <p className="mt-2 text-sm">
                To enable full functionality, please configure your Supabase environment variables.
              </p>
            </div>
          )}

          {error && (
            <div className={`${isEmailNotConfirmed ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-400 text-yellow-700 dark:text-yellow-200' : 'bg-red-100 dark:bg-red-900 border-red-400 text-red-700 dark:text-red-200'} border px-4 py-3 rounded-lg relative`} role="alert">
              <span className="block sm:inline">{error}</span>
              {isEmailNotConfirmed && !isDemoMode && (
                <button
                  onClick={handleResendEmail}
                  disabled={resendingEmail}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${resendingEmail ? 'animate-spin' : ''}`} />
                  {resendingEmail ? 'Sending...' : 'Resend verification email'}
                </button>
              )}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isDemoMode}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={isDemoMode ? "Authentication disabled in demo mode" : "Enter your email"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    disabled={isDemoMode}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={isDemoMode ? "Authentication disabled in demo mode" : (isSignUp ? "Create a password (min. 6 characters)" : "Enter your password")}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || isDemoMode}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                  (loading || isDemoMode) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isSignUp ? (
                    <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                  ) : (
                    <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                  )}
                </span>
                {isDemoMode 
                  ? 'Demo Mode - Authentication Disabled' 
                  : loading 
                    ? 'Processing...' 
                    : isSignUp 
                      ? 'Create Account' 
                      : 'Sign In'}
              </button>
            </div>

            {!isDemoMode && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setIsEmailNotConfirmed(false);
                  }}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
