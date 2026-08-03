import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login(formData.email, formData.password);
      const user = response.user;

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else if (returnTo) {
        navigate(returnTo, { replace: true });
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-800 px-4 py-12">
      <Helmet>
        <title>Login | Udyam Mittar</title>
        <meta
          name="description"
          content="Sign in to your Udyam Mittar account to browse verified businesses, manage listings, and connect with buyers or sellers in Tricity."
        />
        <meta
          name="keywords"
          content="login, sign in, Udyam Mittar account, buy business Chandigarh, sell business Mohali"
        />
        <link rel="canonical" href="https://udyammittar.com/login" />
        <meta property="og:title" content="Login | Udyam Mittar" />
        <meta
          property="og:description"
          content="Sign in to Udyam Mittar to manage your business deals in Tricity."
        />
        <meta property="og:url" content="https://udyammittar.com/login" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-8 text-center">
          <span className="mx-auto mb-4 inline-flex rounded-xl bg-brand-gradient p-3 text-white">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to your Udyam Mittar account
          </p>
        </div>

        <div className="px-6 py-8">
          {error && (
            <div className="mb-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand-700 focus:ring-brand-600"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-gradient disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              state={returnTo ? { from: returnTo } : undefined}
              className="font-bold text-brand-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
