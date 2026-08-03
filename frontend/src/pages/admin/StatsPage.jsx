import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  Building2,
  Users,
  CheckCircle,
  IndianRupee,
  AlertCircle,
  XCircle,
  RefreshCw,
  ShieldCheck,
  Clock,
  Mail,
  User,
  ArrowRight,
  ChevronRight,
  Store,
  BadgeCheck,
  Handshake,
} from 'lucide-react';

const formatCurrency = (amount) => {
  const n = Number(amount) || 0;
  if (n >= 10000000) {
    return `₹${(n / 10000000).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    })} Cr`;
  }
  if (n >= 100000) {
    return `₹${(n / 100000).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    })} L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
};

const isLongStatValue = (value) => String(value).length > 8;

export const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const [s, e] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentEnquiries(),
      ]);
      setStats(s.data.stats);
      setEnquiries(
        (e.data.enquiries || []).map((eq) => ({
          _id: eq._id,
          name: eq.contactInfo?.name || eq.userId?.name || 'N/A',
          propertyTitle: eq.propertyId?.title || 'N/A',
          createdAt: eq.createdAt,
        })),
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const primaryStats = stats
    ? [
        { icon: Store, value: stats.totalProperties, label: 'Total Listings' },
        { icon: BadgeCheck, value: stats.approvedProperties, label: 'Approved Listings' },
        { icon: Users, value: stats.totalSellers, label: 'Total Sellers' },
        { icon: IndianRupee, value: formatCurrency(stats.totalRevenue), label: 'Total Revenue' },
      ]
    : [];

  const secondaryStats = stats
    ? [
        {
          icon: Clock,
          value: stats.pendingProperties,
          label: 'Pending Approvals',
          to: '/admin/pending',
          hint: 'Review now',
        },
        {
          icon: User,
          value: stats.totalUsers,
          label: 'Registered Users',
          to: '/admin/users',
          hint: 'Manage users',
        },
        {
          icon: Mail,
          value: stats.totalEnquiries,
          label: 'Total Enquiries',
          to: '/admin/enquiries',
          hint: 'View enquiries',
        },
        {
          icon: Store,
          value: stats.newSellerLeads || 0,
          label: 'New Seller Requests',
          to: '/admin/seller-leads',
          hint: 'Review leads',
        },
      ]
    : [];

  const quickLinks = [
    { to: '/admin/pending', icon: CheckCircle, title: 'Approve Listings', text: 'Review pending business listings' },
    { to: '/admin/seller-leads', icon: Store, title: 'Seller Requests', text: 'Contact people who want to sell' },
    { to: '/admin/sellers', icon: Users, title: 'Manage Sellers', text: 'Onboard and control seller accounts' },
    { to: '/admin/listings', icon: Building2, title: 'All Listings', text: 'Browse every listing on the platform' },
  ];

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Dashboard | Admin | Udyam Mittar</title>
      </Helmet>

      {/* Header band — mirrors HomePage hero tone */}
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
                Admin Control Center
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Dashboard <span className="text-brand-800">Overview</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Monitor listings, sellers, users and enquiries across the Udyam Mittar platform.
              </p>
            </div>

            <button
              type="button"
              onClick={load}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-600 hover:text-brand-700"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
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

        {/* Primary stats strip — HomePage success-stories pattern */}
        {stats && (
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-gradient text-white lg:grid-cols-4">
              {primaryStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex min-w-0 items-center gap-3 bg-brand-gradient px-4 py-6 sm:px-6">
                  <span className="shrink-0 rounded-lg bg-white/10 p-2.5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-extrabold leading-tight tracking-tight ${
                        isLongStatValue(value)
                          ? 'text-base sm:text-lg lg:text-xl'
                          : 'text-2xl'
                      }`}
                      title={String(value)}
                    >
                      {value}
                    </div>
                    <div className="mt-1 text-sm font-medium text-brand-100">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Secondary stats */}
        {stats && (
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryStats.map(({ icon: Icon, value, label, to, hint }) => (
              <Link
                key={label}
                to={to}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-lg bg-brand-50 p-2.5 text-brand-700 transition-colors group-hover:bg-brand-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </div>
                <div className="mt-4 text-3xl font-extrabold text-slate-900">{value}</div>
                <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
                <p className="mt-3 text-xs font-semibold text-brand-700">{hint}</p>
              </Link>
            ))}
          </section>
        )}

        {/* Quick actions + recent activity */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickLinks.map(({ to, icon: Icon, title, text }) => (
                <Link
                  key={title}
                  to={to}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
                >
                  <span className="shrink-0 rounded-lg bg-brand-50 p-2 text-brand-700 transition-colors group-hover:bg-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
              <Link
                to="/admin/enquiries"
                className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View All
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="rounded-xl bg-brand-50 p-3 text-brand-700">
                    <Handshake className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-slate-600">No recent enquiries yet</p>
                  <p className="mt-1 text-xs text-slate-400">New buyer activity will show up here</p>
                </div>
              ) : (
                enquiries.slice(0, 5).map((eq) => (
                  <div key={eq._id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-800">
                        {eq.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">{eq.name}</p>
                        <p className="truncate text-xs text-slate-500">{eq.propertyTitle}</p>
                      </div>
                    </div>
                    <div className="shrink-0 text-xs font-medium text-slate-400">
                      {eq.createdAt ? new Date(eq.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA band — HomePage seller CTA pattern */}
        <section className="mt-8">
          <div className="relative overflow-hidden rounded-2xl bg-brand-gradient px-6 py-7 text-white lg:px-10">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-400/30 to-transparent" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="hidden shrink-0 rounded-xl bg-white/10 p-3 sm:block">
                  <Users className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold lg:text-2xl">Need more sellers on the platform?</h2>
                  <p className="mt-1 max-w-xl text-sm text-brand-100">
                    Onboard a verified seller and grow Udyam Mittar&apos;s Tricity network.
                  </p>
                </div>
              </div>
              <Link
                to="/admin/sellers/onboard"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 shadow-lg transition-transform hover:scale-[1.02]"
              >
                Onboard Seller
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
