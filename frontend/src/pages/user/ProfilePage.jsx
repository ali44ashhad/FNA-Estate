import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  XCircle,
  CheckCircle,
} from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100';

export const ProfilePage = () => {
  const { setUser, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPassword, setSavingPassword] = useState(false);

  const roleLabel =
    user?.role === 'admin' ? 'Admin' : user?.role === 'seller' ? 'Seller' : 'User';

  useEffect(() => {
    (async () => {
      try {
        const res = await authService.getCurrentUser();
        const me = res.data.user;
        setProfile(me);
        setProfileForm({ name: me.name || '', phone: me.phone || '' });
        setUser(me);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [setUser]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      setError('');
      setSuccess('');
      const res = await authService.updateProfile({
        name: profileForm.name,
        phone: profileForm.phone,
      });
      const updated = res.data.user;
      setProfile(updated);
      setUser(updated);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }
    try {
      setSavingPassword(true);
      setError('');
      setSuccess('');
      await authService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Password updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Profile | {roleLabel} | Udyam Mittar</title>
      </Helmet>

      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
            <ShieldCheck className="h-4 w-4" />
            {roleLabel} · Account Settings
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            My <span className="text-brand-800">Profile</span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            Update your personal details and password.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
            <button type="button" onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 shrink-0 text-brand-700" />
              <span className="text-sm font-medium text-brand-800">{success}</span>
            </div>
            <button type="button" onClick={() => setSuccess('')} className="text-brand-600 hover:text-brand-800">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Edit profile */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-xl bg-brand-50 p-2.5 text-brand-700">
              <User className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Personal Details</h2>
              <p className="text-sm text-slate-500">Name and phone number</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name *</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail className="h-4 w-4 text-brand-600" /> Email
              </label>
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
              />
              <p className="mt-1.5 text-xs text-slate-400">Email cannot be changed</p>
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone className="h-4 w-4 text-brand-600" /> Phone *
              </label>
              <input
                type="tel"
                required
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient disabled:opacity-60"
            >
              {savingProfile ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-xl bg-brand-50 p-2.5 text-brand-700">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Update Password</h2>
              <p className="text-sm text-slate-500">Use a strong password you don&apos;t reuse elsewhere</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Current Password *</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">New Password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm New Password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={savingPassword}
              className="rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient disabled:opacity-60"
            >
              {savingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
