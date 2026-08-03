import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  CheckCircle,
  XCircle,
  MapPin,
  Building2,
  Calendar,
  Eye,
  AlertCircle,
  ShieldCheck,
  Search,
  Clock,
  IndianRupee,
  X,
  User,
  Pencil,
} from 'lucide-react';

const formatPrice = (p) => {
  const amount = p.pricing?.basePrice || p.pricing?.finalPrice;
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const PendingApprovalsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getPendingProperties();
      setProperties(res.data.properties || []);
    } catch {
      setError('Failed to load pending listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      await adminService.approveProperty(id, { finalPrice: 0 });
      setSelected(null);
      await load();
    } catch {
      setError('Failed to approve listing');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(id);
      await adminService.rejectProperty(id, {
        rejectionReason: 'Does not meet our quality standards',
      });
      setSelected(null);
      await load();
    } catch {
      setError('Failed to reject listing');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = properties.filter((p) =>
    [p.title, p.location?.city, p.location?.locality, p.propertyType, p.createdBy?.name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Pending Approvals | Admin | Udyam Mittar</title>
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
                Listing Approvals
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Pending <span className="text-brand-800">({filtered.length})</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Review and approve business listings submitted by sellers.
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search pending listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
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

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <span className="mx-auto inline-flex rounded-xl bg-brand-50 p-4 text-brand-700">
              <CheckCircle className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {searchTerm ? 'No Matches Found' : 'All Caught Up!'}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No pending listings to review right now.'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Listing', 'Location', 'Type', 'Price', 'Listed', 'Actions'].map((h) => (
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
                  {filtered.map((prop) => (
                    <tr key={prop._id} className="transition-colors hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelected(prop)}
                          className="flex items-center gap-3 text-left"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                            <Building2 className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-bold text-brand-800 hover:underline">
                              {prop.title}
                            </p>
                            <p className="text-xs text-slate-400">ID: {prop._id?.slice(-6)}</p>
                          </div>
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                          <span className="truncate">
                            {[prop.location?.locality, prop.location?.city]
                              .filter(Boolean)
                              .join(', ') || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {prop.propertyType || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-brand-700">{formatPrice(prop)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                          {prop.createdAt
                            ? new Date(prop.createdAt).toLocaleDateString()
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(prop)}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <Link
                            to={`/admin/listings/${prop._id}/edit`}
                            state={{ from: '/admin/pending' }}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            title="Edit details"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            disabled={actionLoading === prop._id}
                            onClick={() => handleApprove(prop._id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-gradient disabled:opacity-60"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={actionLoading === prop._id}
                            onClick={() => handleReject(prop._id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </button>
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
            aria-labelledby="pending-detail-title"
          >
            <div className="shrink-0 border-b border-slate-100 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    <Clock className="h-3.5 w-3.5" />
                    Pending Approval
                  </span>
                  <h2
                    id="pending-detail-title"
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
                { label: 'Type', value: selected.propertyType || '—' },
                {
                  label: 'Price',
                  value: formatPrice(selected),
                  icon: <IndianRupee className="h-3.5 w-3.5 text-brand-600" />,
                },
                {
                  label: 'Built-up Area',
                  value: selected.propertyDetails?.builtUpArea
                    ? `${selected.propertyDetails.builtUpArea} sq ft`
                    : '—',
                },
                {
                  label: 'Bedrooms',
                  value: selected.propertyDetails?.bedrooms || '—',
                },
                {
                  label: 'Submitted By',
                  value: selected.createdBy?.name || selected.createdBy?.email || '—',
                  icon: <User className="h-3.5 w-3.5 text-brand-600" />,
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

            <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-white px-6 py-4 sm:flex-row sm:flex-wrap">
              <Link
                to={`/admin/listings/${selected._id}/edit`}
                state={{ from: '/admin/pending' }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-300 bg-brand-50 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-100"
              >
                <Pencil className="h-4 w-4" />
                Edit Details
              </Link>
              <button
                type="button"
                disabled={actionLoading === selected._id}
                onClick={() => handleApprove(selected._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient disabled:opacity-60"
              >
                <CheckCircle className="h-4 w-4" />
                Approve
              </button>
              <button
                type="button"
                disabled={actionLoading === selected._id}
                onClick={() => handleReject(selected._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>
              <Link
                to={`/property/${selected._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
