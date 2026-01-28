import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login(formData.email, formData.password);
      const user = response.user;
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else if (user.role === 'user') {
        navigate('/user/dashboard');
      } else {
        navigate('/user/dashboard'); // Default to user dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Helmet>
        <title>Login | FNAEstate - Sign In to Your Account</title>
        <meta name="description" content="Sign in to your FNAEstate account to access premium property listings, manage your profile, and connect with property consultants. Secure login with 2FA support." />
        <meta name="keywords" content="login, sign in, property account, real estate login, user login, property platform login" />
        <link rel="canonical" href="https://fnaestate.com/login" />
        <meta property="og:title" content="Login | FNAEstate" />
        <meta property="og:description" content="Sign in to your FNAEstate account to access premium property listings." />
        <meta property="og:url" content="https://fnaestate.com/login" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className=" p-6 text-center">
          <div className="mx-auto mb-3 w-14 h-14 flex items-center justify-center bg-amber-500 rounded-xl">
            <Shield className="text-white w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Login</h2>
          <p className="text-slate-600 text-sm">Access your account</p>
        </div>

        <div className="p-6">
          
          {/* Error */}
          {error && (
            <div className="mb-4 flex gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-slate-600 mt-6">
            Don’t have an account?{' '}
            <Link to="/register" className="text-amber-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <p className="text-center text-sm text-slate-600 my-6 px-6 space-y-1">
  <span className="block">
    <span className="font-bold">Admin:</span> admin@premiumestate.com / admin123
  </span>
  <span className="block">
    <span className="font-bold">Seller:</span> rajesh.seller@premiumestate.com / seller123
  </span>
  <span className="block">
    <span className="font-bold">Buyer:</span> rahul.buyer@premiumestate.com / buyer123
  </span>
</p>

      </div>
    </div>
  );
};
