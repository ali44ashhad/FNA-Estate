import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/api';
import { Loading } from '../../components/Loading';
import { getCategoryLabel } from '../../utils/business';
import {
  Store,
  MapPin,
  Building2,
  Eye,
  Edit,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  PlusCircle,
  ShieldCheck,
  Search,
  AlertCircle,
  X,
  Heart,
} from 'lucide-react';

const statusMap = {
  active: 'Approved',
  pending: 'Pending Approval',
  rejected: 'Rejected',
  sold: 'Sold',
};

const statusStyle = (status) => {
  if (status === 'Approved') return 'whitespace-nowrap border-brand-200 bg-brand-50 text-brand-800';
  if (status === 'Pending Approval') return 'whitespace-nowrap border-amber-200 bg-amber-50 text-amber-800';
  if (status === 'Rejected') return 'whitespace-nowrap border-red-200 bg-red-50 text-red-700';
  if (status === 'Sold') return 'whitespace-nowrap border-slate-700 bg-slate-800 text-white';
  return 'whitespace-nowrap border-slate-200 bg-slate-50 text-slate-700';
};

const statusIcon = (status) => {
  if (status === 'Approved') return <CheckCircle className="h-3.5 w-3.5" />;
  if (status === 'Pending Approval') return <Clock className="h-3.5 w-3.5" />;
  if (status === 'Rejected') return <XCircle className="h-3.5 w-3.5" />;
  return null;
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

const pageTitle = (filter) => {
  if (filter === 'active') return 'Active Listings';
  if (filter === 'pending') return 'Pending Approval';
  if (filter === 'rejected') return 'Rejected Listings';
  if (filter === 'sold') return 'Sold Listings';
  return 'All Listings';
};

export const SellerListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const statusFilter = searchParams.get('status') || 'all';
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await propertyService.getSellerProperties();
      setProperties(res.data.properties || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load listings');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (statusFilter === 'draft') setSearchParams({});
  }, [statusFilter, setSearchParams]);

  const filtered = properties.filter((p) => {
    const matchesStatus =
      statusFilter === 'all' || p.status === statusMap[statusFilter];
    const matchesSearch = [p.title, p.location?.city, p.location?.locality, p.propertyType]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const counts = {
    all: properties.length,
    active: properties.filter((p) => p.status === 'Approved').length,
    pending: properties.filter((p) => p.status === 'Pending Approval').length,
    sold: properties.filter((p) => p.status === 'Sold').length,
    rejected: properties.filter((p) => p.status === 'Rejected').length,
  };

  const setFilter = (key) => {
    if (key === 'all') setSearchParams({});
    else setSearchParams({ status: key });
  };

  const title = pageTitle(statusFilter);

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>{title} | Seller | Udyam Mittar</title>
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
                My Listings
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {title.split(' ')[0]}{' '}
                <span className="text-brand-800">
                  {title.includes(' ') ? title.split(' ').slice(1).join(' ') : ''} ({filtered.length})
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Manage your business listings on Udyam Mittar.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
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

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'active', label: 'Active', count: counts.active },
            { key: 'pending', label: 'Pending', count: counts.pending },
            { key: 'sold', label: 'Sold', count: counts.sold },
            { key: 'rejected', label: 'Rejected', count: counts.rejected },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
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
                : 'Start by adding your first business listing'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                type="button"
                onClick={() => navigate('/seller/listings/new')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient"
              >
                <PlusCircle className="h-4 w-4" />
                Create First Listing
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Listing', 'Location', 'Type', 'Price', 'Saved', 'Status', 'Listed', 'Actions'].map((h) => (
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
                        <button
                          type="button"
                          onClick={() => setSelected(p)}
                          className="flex items-center gap-3 text-left"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                            <Building2 className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-bold text-brand-800 hover:underline">{p.title}</p>
                            <p className="text-xs text-slate-400">ID: {p._id?.slice(-6)}</p>
                          </div>
                        </button>
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
                        <span className="inline-flex whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {getCategoryLabel(p.propertyType)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-brand-700">{formatPrice(p)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-slate-700"
                          title="Buyers who shortlisted this listing"
                        >
                          <Heart className="h-3.5 w-3.5 text-red-500" />
                          {p.savedCount || 0}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(p.status)}`}
                        >
                          {statusIcon(p.status)}
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                          {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelected(p)}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {p.status === 'Approved' && (
                            <Link
                              to={`/property/${p._id}`}
                              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                              title="Public page"
                            >
                              <Store className="h-4 w-4" />
                            </Link>
                          )}
                          {p.status === 'Rejected' && (
                            <button
                              type="button"
                              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
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

      {selected && (
        <div
          className="fixed inset-x-0 bottom-0 top-[76px] z-40 flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-900/50 px-4 py-6"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="relative my-auto flex max-h-[calc(100vh-124px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="listing-detail-title"
          >
            <div className="shrink-0 border-b border-slate-100 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(selected.status)}`}
                  >
                    {statusIcon(selected.status)}
                    {selected.status}
                  </span>
                  <h2
                    id="listing-detail-title"
                    className="mt-3 text-xl font-extrabold text-slate-900"
                  >
                    {selected.title}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                    {[selected.location?.locality, selected.location?.city]
                      .filter(Boolean)
                      .join(', ') || 'Tricity'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {[
                { label: 'Listing ID', value: selected._id },
                { label: 'Category', value: getCategoryLabel(selected.propertyType) },
                { label: 'Listing Type', value: selected.listingType || '—' },
                { label: 'Price', value: formatPrice(selected) },
                {
                  label: 'Built-up Area',
                  value: selected.propertyDetails?.builtUpArea
                    ? `${selected.propertyDetails.builtUpArea} sq ft`
                    : '—',
                },
                {
                  label: 'Furnishing',
                  value: selected.propertyDetails?.furnishingStatus || '—',
                },
                {
                  label: 'Full Address',
                  value: selected.location?.fullAddress || '—',
                },
                {
                  label: 'Listed On',
                  value: selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString()
                    : 'N/A',
                },
                {
                  label: 'Description',
                  value: selected.description || '—',
                },
                ...(selected.status === 'Rejected' && selected.rejectionReason
                  ? [{ label: 'Rejection Reason', value: selected.rejectionReason }]
                  : []),
              ].map((row) => (
                <div
                  key={row.label}
                  className="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {row.label}
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-white px-6 py-4 sm:flex-row">
              {selected.status === 'Approved' && (
                <Link
                  to={`/property/${selected._id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient"
                >
                  <Eye className="h-4 w-4" />
                  View Public Page
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
