import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  Store,
} from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      navigate(returnTo || '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-800 px-4 py-12">
      <Helmet>
        <title>Create Account | Udyam Mittar</title>
        <meta
          name="description"
          content="Create your Udyam Mittar buyer account to browse verified businesses, save opportunities, and send enquiries in Tricity."
        />
        <meta
          name="keywords"
          content="register, create account, Udyam Mittar signup, buy business Chandigarh, buy business Mohali"
        />
        <link rel="canonical" href="https://udyammittar.com/register" />
        <meta property="og:title" content="Create Account | Udyam Mittar" />
        <meta
          property="og:description"
          content="Join Udyam Mittar as a buyer to discover running businesses in Tricity."
        />
        <meta property="og:url" content="https://udyammittar.com/register" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-8 text-center sm:px-10">
          <span className="mx-auto mb-4 inline-flex rounded-xl bg-brand-gradient p-3 text-white">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Create Buyer Account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Browse listings, save businesses, and send enquiries across Tricity
          </p>
        </div>

        <div className="px-6 py-8 sm:px-10">
          {error && (
            <div className="mb-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
              </div>

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
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className={inputClass}
                    autoComplete="tel"
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
                    placeholder="Min. 6 characters"
                    className={`${inputClass} pr-11`}
                    autoComplete="new-password"
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

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Repeat password"
                    className={`${inputClass} pr-11`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-500">
              By creating an account, you agree to our{' '}
              <Link to="/terms-of-service" className="font-semibold text-brand-700 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="font-semibold text-brand-700 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-gradient disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Store className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              state={returnTo ? { from: returnTo } : undefined}
              className="font-bold text-brand-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-3 text-center text-sm text-slate-600">
            Want to sell your business?{' '}
            <Link to="/sell-business" className="font-bold text-brand-700 hover:underline">
              Request a seller callback
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
