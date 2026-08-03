import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/api';
import { Loading } from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import {
  Store,
  CheckCircle,
  Clock,
  XCircle,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  MapPin,
  Building2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';

const formatPrice = (p) => {
  const amount = p.pricing?.finalPrice || p.pricing?.basePrice;
  if (!amount) return 'Price on request';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const statusStyle = (status) => {
  if (status === 'Approved') return 'border-brand-200 bg-brand-50 text-brand-800';
  if (status === 'Pending Approval') return 'border-amber-200 bg-amber-50 text-amber-800';
  if (status === 'Rejected') return 'border-red-200 bg-red-50 text-red-700';
  if (status === 'Sold') return 'border-slate-700 bg-slate-800 text-white';
  return 'border-slate-200 bg-slate-50 text-slate-700';
};

export const SellerOverviewPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await propertyService.getSellerProperties();
      setProperties(res.data.properties || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const stats = {
    total: properties.length,
    approved: properties.filter((p) => p.status === 'Approved').length,
    pending: properties.filter((p) => p.status === 'Pending Approval').length,
    sold: properties.filter((p) => p.status === 'Sold').length,
    rejected: properties.filter((p) => p.status === 'Rejected').length,
  };

  const primaryStats = [
    { icon: Store, value: stats.total, label: 'Total Listings' },
    { icon: CheckCircle, value: stats.approved, label: 'Active Listings' },
    { icon: Clock, value: stats.pending, label: 'Pending Approval' },
    { icon: ShoppingBag, value: stats.sold, label: 'Sold' },
  ];

  const quickLinks = [
    {
      to: '/seller/listings/new',
      icon: PlusCircle,
      title: 'Add Listing',
      text: 'Create a new business listing',
    },
    {
      to: '/seller/listings?status=active',
      icon: CheckCircle,
      title: 'Active Listings',
      text: `${stats.approved} live on the platform`,
    },
    {
      to: '/seller/listings?status=pending',
      icon: Clock,
      title: 'Pending Review',
      text: `${stats.pending} awaiting admin approval`,
    },
    {
      to: '/seller/listings?status=sold',
      icon: ShoppingBag,
      title: 'Sold Listings',
      text: `${stats.sold} marked as sold`,
    },
  ];

  const recent = [...properties]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Dashboard | Seller | Udyam Mittar</title>
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
                Seller Dashboard
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}{' '}
                <span className="text-brand-800">Overview</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Track your listings, approvals, and performance on Udyam Mittar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={load}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                type="button"
                onClick={() => navigate('/seller/listings/new')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-brand-gradient"
              >
                <PlusCircle className="h-4 w-4" />
                Add Listing
              </button>
            </div>
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
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-gradient text-white lg:grid-cols-4">
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

        {stats.rejected > 0 && (
          <section className="mb-8">
            <Link
              to="/seller/listings?status=all"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 transition-colors hover:bg-red-100"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-white p-2.5 text-red-600">
                  <XCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-red-800">{stats.rejected} Rejected Listing{stats.rejected > 1 ? 's' : ''}</p>
                  <p className="text-sm text-red-600">Review and update before resubmitting</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-red-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Quick Actions</h2>
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
              <h2 className="text-xl font-bold text-slate-900">Recent Listings</h2>
              <Link
                to="/seller/listings?status=all"
                className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View All
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recent.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="rounded-xl bg-brand-50 p-3 text-brand-700">
                    <Store className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-slate-600">No listings yet</p>
                  <p className="mt-1 text-xs text-slate-400">Add your first business listing to get started</p>
                  <button
                    type="button"
                    onClick={() => navigate('/seller/listings/new')}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white hover:bg-brand-gradient"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Listing
                  </button>
                </div>
              ) : (
                recent.map((p) => (
                  <div key={p._id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">{p.title}</p>
                        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                          <MapPin className="h-3 w-3 shrink-0 text-brand-600" />
                          {[p.location?.locality, p.location?.city].filter(Boolean).join(', ') || 'Tricity'}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusStyle(p.status)}`}
                      >
                        {p.status}
                      </span>
                      <p className="mt-1 text-xs font-bold text-brand-700">{formatPrice(p)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="relative overflow-hidden rounded-2xl bg-brand-gradient px-6 py-7 text-white lg:px-10">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-400/30 to-transparent" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold lg:text-2xl">Ready to list another business?</h2>
                <p className="mt-1 max-w-xl text-sm text-brand-100">
                  Reach serious buyers across Chandigarh, Mohali &amp; Panchkula.
                </p>
              </div>
              <Link
                to="/seller/listings/new"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 shadow-lg transition-transform hover:scale-[1.02]"
              >
                Add Listing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
