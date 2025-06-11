import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, AlertCircle } from 'lucide-react';

const Auth: React.FC = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setSuccessMessage('Password reset instructions have been sent to your email');
        setIsForgotPassword(false);
      } else if (isSignUp) {
        await signUp(email, password);
        setSuccessMessage('Account created successfully! Please sign in.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error?.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setError(null);
    setSuccessMessage(null);
    setIsForgotPassword(false);
    setIsSignUp(!isSignUp);
  };

  const handleForgotPassword = () => {
    setError(null);
    setSuccessMessage(null);
    setIsForgotPassword(true);
    setIsSignUp(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-violet-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {isForgotPassword
            ? 'Reset your password'
            : isSignUp
            ? 'Create your account'
            : 'Sign in to your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900">
              <p className="text-sm text-green-700 dark:text-green-200">{successMessage}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : isForgotPassword ? (
                  'Send reset instructions'
                ) : isSignUp ? (
                  'Sign up'
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-col space-y-2">
            {!isForgotPassword && (
              <button
                onClick={handleModeSwitch}
                className="w-full text-center text-sm text-violet-600 hover:text-violet-500"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            )}
            
            {!isSignUp && !isForgotPassword && (
              <button
                onClick={handleForgotPassword}
                className="w-full text-center text-sm text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </button>
            )}

            {isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-center text-sm text-violet-600 hover:text-violet-500"
              >
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;