import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #1a1145 25%, #302b63 50%, #24243e 75%, #0f0c29 100%)',
        }}
      />

      {/* Floating orbs for depth */}
      <div
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
      />
      <div
        className="absolute top-10 right-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }}
      />

      {/* Login card */}
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #818cf8 100%)',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
            }}
          >
            <CheckSquare className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            TaskFlow
          </h1>
          <p className="text-slate-400 text-base">
            Welcome back! Sign in to your account
          </p>
        </div>

        {/* Glassmorphism card */}
        <div
          className="rounded-2xl p-8 sm:p-10 border"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          <form onSubmit={handleSubmit} id="login-form" className="space-y-7">
            {/* Error message */}
            {error && (
              <div
                id="login-error"
                className="p-4 rounded-xl text-sm flex items-start gap-3"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#fca5a5',
                }}
              >
                <span className="shrink-0 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-2.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full h-[54px] pl-14 pr-4 rounded-xl text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(124, 58, 237, 0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-2.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full h-[54px] pl-14 pr-12 rounded-xl text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(124, 58, 237, 0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  id="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label htmlFor="login-remember" className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    id="login-remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div
                    className="w-5 h-5 rounded-md transition-all duration-200 flex items-center justify-center peer-checked:scale-95"
                    style={{
                      background: rememberMe
                        ? 'linear-gradient(135deg, #7c3aed, #6366f1)'
                        : 'rgba(255, 255, 255, 0.06)',
                      border: rememberMe
                        ? '1px solid rgba(124, 58, 237, 0.8)'
                        : '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                id="login-forgot-password"
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: '#a78bfa' }}
                onMouseEnter={(e) => (e.target.style.color = '#c4b5fd')}
                onMouseLeave={(e) => (e.target.style.color = '#a78bfa')}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In button */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{
                background: isLoading
                  ? 'rgba(124, 58, 237, 0.5)'
                  : 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #818cf8 100%)',
                boxShadow: isLoading
                  ? 'none'
                  : '0 4px 24px rgba(124, 58, 237, 0.35)',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.boxShadow = '0 6px 32px rgba(124, 58, 237, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(124, 58, 237, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
            <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
          </div>

          {/* Register link */}
          <p className="text-center text-slate-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              id="login-register-link"
              className="font-semibold transition-colors duration-200"
              style={{ color: '#a78bfa' }}
              onMouseEnter={(e) => (e.target.style.color = '#c4b5fd')}
              onMouseLeave={(e) => (e.target.style.color = '#a78bfa')}
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-8">
          © 2024 TaskFlow. Built for productivity.
        </p>
      </div>
    </div>
  );
}

export default Login;