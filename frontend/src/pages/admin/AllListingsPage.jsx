import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  Building2,
  MapPin,
  Eye,
  Edit,
  Search,
  ShieldCheck,
  Store,
  Plus,
  ShoppingBag,
} from 'lucide-react';

const STATUS_OPTIONS = [
  'Approved',
  'Pending Approval',
  'Sold',
  'Rejected',
];

const statusStyle = (status) => {
  if (status === 'Approved') return 'bg-brand-50 text-brand-800 border-brand-200';
  if (status === 'Pending Approval') return 'bg-amber-50 text-amber-800 border-amber-200';
  if (status === 'Rejected') return 'bg-red-50 text-red-700 border-red-200';
  if (status === 'Sold') return 'bg-slate-800 text-white border-slate-800';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

const formatPrice = (p) => {
  const amount = p.pricing?.finalPrice || p.pricing?.basePrice;
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const AllListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getAllProperties();
      setProperties(res.data.properties || []);
    } catch {
      setProperties([]);
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    const previous = properties.find((p) => p._id === id)?.status;
    if (previous === status) return;

    try {
      setUpdatingId(id);
      setError('');
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
      await adminService.updateProperty(id, { status });
    } catch (err) {
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: previous } : p))
      );
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = properties.filter((p) => {
    const matchesSearch = [p.title, p.location?.city, p.location?.locality, p.propertyType]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: properties.length,
    Approved: properties.filter((p) => p.status === 'Approved').length,
    'Pending Approval': properties.filter((p) => p.status === 'Pending Approval').length,
    Sold: properties.filter((p) => p.status === 'Sold').length,
    Rejected: properties.filter((p) => p.status === 'Rejected').length,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>All Listings | Admin | Udyam Mittar</title>
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
                Listing Management
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                All Listings <span className="text-brand-800">({filtered.length})</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Browse and manage every business listing. Change status (including Sold) from the
                Status column.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
              <Link
                to="/admin/listings/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-brand-gradient"
              >
                <Plus className="h-4 w-4" />
                Add Listing
              </Link>
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'Approved', label: 'Approved', count: counts.Approved },
            { key: 'Pending Approval', label: 'Pending', count: counts['Pending Approval'] },
            { key: 'Sold', label: 'Sold', count: counts.Sold },
            { key: 'Rejected', label: 'Rejected', count: counts.Rejected },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                statusFilter === f.key
                  ? 'border-brand-600 bg-brand-gradient text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50'
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  statusFilter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <span className="mx-auto inline-flex rounded-xl bg-brand-50 p-4 text-brand-700">
              <Store className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">No Listings Found</h3>
            <p className="mt-2 text-sm text-slate-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Listings will appear here once sellers submit them'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Listing', 'Location', 'Type', 'Price', 'Status', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((p) => (
                    <tr key={p._id} className="transition-colors hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                            <Building2 className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-bold text-slate-900">{p.title}</p>
                            <p className="text-xs text-slate-400">
                              ID: {p._id?.slice(-6)}
                              {(p.isHot || p.isPremium || p.isVerified !== false) && (
                                <span className="ml-2 text-brand-700">
                                  {[
                                    p.isHot && 'Hot',
                                    p.isPremium && 'Premium',
                                    p.isVerified !== false && 'Verified',
                                  ]
                                    .filter(Boolean)
                                    .join(' · ')}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                          <span className="truncate">
                            {[p.location?.locality, p.location?.city].filter(Boolean).join(', ') || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {p.propertyType || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-brand-700">{formatPrice(p)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-2">
                          <select
                            value={p.status || 'Pending Approval'}
                            disabled={updatingId === p._id}
                            onChange={(e) => handleStatusChange(p._id, e.target.value)}
                            className={`w-full min-w-[150px] cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-brand-100 disabled:opacity-60 ${statusStyle(p.status)}`}
                            title="Change listing status"
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {p.status !== 'Sold' && (
                            <button
                              type="button"
                              disabled={updatingId === p._id}
                              onClick={() => handleStatusChange(p._id, 'Sold')}
                              className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-800 hover:text-white disabled:opacity-60"
                            >
                              <ShoppingBag className="h-3 w-3" />
                              Mark Sold
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/property/${p._id}`}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/admin/listings/${p._id}/edit`}
                            state={{ from: '/admin/listings' }}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
