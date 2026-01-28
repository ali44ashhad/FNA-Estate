import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4">
      <Helmet>
        <title>Register | FNAEstate - Create Your Account</title>
        <meta name="description" content="Create your FNAEstate account to access premium property listings, save favorites, get personalized recommendations, and connect with property consultants. Free registration." />
        <meta name="keywords" content="register, sign up, create account, property account, real estate registration, user registration" />
        <link rel="canonical" href="https://fnaestate.com/register" />
        <meta property="og:title" content="Register | FNAEstate" />
        <meta property="og:description" content="Create your FNAEstate account to access premium property listings." />
        <meta property="og:url" content="https://fnaestate.com/register" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-amber-500 rounded-2xl">
              <span className="text-2xl text-white font-bold">🏠</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Create Account
            </h1>
            <p className="text-slate-600">
              Register to get started
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-bold text-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-amber-600 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

 
      </div>
    </div>
  );
};
