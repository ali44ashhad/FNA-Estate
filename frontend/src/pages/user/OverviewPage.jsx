import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { authService, enquiryService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  MessageSquare,
  Calendar,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  XCircle,
  CheckCircle,
  ArrowRight,
  Building2,
  User,
  ChevronRight,
  Heart,
} from 'lucide-react';

const formatAccountAge = (createdAt) => {
  if (!createdAt) return '—';
  const start = new Date(createdAt);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (months < 1) {
    const days = Math.max(1, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
    return `${days} day${days === 1 ? '' : 's'}`;
  }
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} year${years === 1 ? '' : 's'}`;
  return `${years}y ${rem}m`;
};

export const UserOverviewPage = () => {
  const { setUser } = useAuth();
  const { savedCount } = useWishlist();
  const [profile, setProfile] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const [meRes, eqRes] = await Promise.all([
        authService.getCurrentUser(),
        enquiryService.getMyEnquiries().catch(() => ({ data: { enquiries: [] } })),
      ]);
      const me = meRes.data.user;
      setProfile(me);
      setUser(me);
      setEnquiries(eqRes.data.enquiries || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const openEnquiries = enquiries.filter((eq) => eq.status !== 'Closed').length;
  const recentEnquiries = enquiries.slice(0, 5);

  const primaryStats = [
    { icon: MessageSquare, value: enquiries.length, label: 'Enquiries Sent' },
    { icon: CheckCircle, value: openEnquiries, label: 'Open Enquiries' },
    { icon: Heart, value: savedCount, label: 'Saved Businesses' },
    { icon: Calendar, value: formatAccountAge(profile?.createdAt), label: 'Account Age' },
    {
      icon: ShieldCheck,
      value: profile?.isActive === false ? 'Inactive' : 'Active',
      label: 'Account Status',
    },
  ];

  const quickLinks = [
    {
      to: '/user/profile',
      icon: User,
      title: 'Edit Profile',
      text: 'Update name, phone or password',
    },
    {
      to: '/user/enquiries',
      icon: MessageSquare,
      title: 'My Enquiries',
      text: `${enquiries.length} total enquiries`,
    },
    {
      to: '/user/saved',
      icon: Heart,
      title: 'Saved Businesses',
      text: `${savedCount} listing${savedCount === 1 ? '' : 's'} shortlisted`,
    },
    {
      to: '/properties',
      icon: Building2,
      title: 'Browse Businesses',
      text: 'Find opportunities in Tricity',
    },
  ];

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Dashboard | Udyam Mittar</title>
      </Helmet>

      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
                <ShieldCheck className="h-4 w-4" />
                User Dashboard
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Welcome{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}{' '}
                <span className="text-brand-800">Overview</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Track your enquiries and manage your Udyam Mittar account.
              </p>
            </div>

            <button
              type="button"
              onClick={load}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-600 hover:text-brand-700"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-8 flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
            <button type="button" onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        <section className="mb-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-gradient text-white lg:grid-cols-5">
            {primaryStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 bg-brand-gradient px-5 py-6 sm:px-6">
                <span className="rounded-lg bg-white/10 p-2.5">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-2xl font-extrabold leading-none">{value}</div>
                  <div className="mt-1 text-sm font-medium text-brand-100">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Quick Actions</h2>
            <div className="space-y-3">
              {quickLinks.map(({ to, icon: Icon, title, text }) => (
                <Link
                  key={title}
                  to={to}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
                >
                  <span className="shrink-0 rounded-lg bg-brand-50 p-2 text-brand-700 transition-colors group-hover:bg-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{text}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-600" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Enquiries</h2>
              <Link
                to="/user/enquiries"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View All
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentEnquiries.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="rounded-xl bg-brand-50 p-3 text-brand-700">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-slate-600">No enquiries yet</p>
                  <Link
                    to="/properties"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white hover:bg-brand-gradient"
                  >
                    Explore Businesses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                recentEnquiries.map((eq) => (
                  <div
                    key={eq._id}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {eq.propertyId?.title || 'Listing'}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {eq.createdAt ? new Date(eq.createdAt).toLocaleDateString() : '—'}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        eq.status === 'New'
                          ? 'border-amber-200 bg-amber-50 text-amber-800'
                          : eq.status === 'In Progress'
                            ? 'border-blue-200 bg-blue-50 text-blue-800'
                            : 'border-brand-200 bg-brand-50 text-brand-800'
                      }`}
                    >
                      {eq.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
