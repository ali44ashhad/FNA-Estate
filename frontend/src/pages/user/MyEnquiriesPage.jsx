import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { enquiryService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  ShieldCheck,
  MessageSquare,
  Building2,
  Calendar,
  MapPin,
  Eye,
  X,
  AlertCircle,
  XCircle,
  Search,
  ArrowRight,
} from 'lucide-react';

const statusStyle = (status) => {
  if (status === 'New') return 'whitespace-nowrap border-amber-200 bg-amber-50 text-amber-800';
  if (status === 'In Progress') return 'whitespace-nowrap border-blue-200 bg-blue-50 text-blue-800';
  if (status === 'Closed') return 'whitespace-nowrap border-brand-200 bg-brand-50 text-brand-800';
  return 'whitespace-nowrap border-slate-200 bg-slate-50 text-slate-700';
};

export const MyEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await enquiryService.getMyEnquiries();
        setEnquiries(res.data.enquiries || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = enquiries.filter((eq) => {
    const title = eq.propertyId?.title || '';
    const matchesSearch = [title, eq.contactInfo?.message, eq.status]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: enquiries.length,
    New: enquiries.filter((e) => e.status === 'New').length,
    'In Progress': enquiries.filter((e) => e.status === 'In Progress').length,
    Closed: enquiries.filter((e) => e.status === 'Closed').length,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>My Enquiries | Udyam Mittar</title>
      </Helmet>

      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
                <ShieldCheck className="h-4 w-4" />
                Your Activity
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                My Enquiries <span className="text-brand-800">({filtered.length})</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Track every business enquiry you have sent.
              </p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
            <button type="button" onClick={() => setError('')}>
              <XCircle className="h-5 w-5 text-red-500" />
            </button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'New', label: 'New', count: counts.New },
            { key: 'In Progress', label: 'In Progress', count: counts['In Progress'] },
            { key: 'Closed', label: 'Closed', count: counts.Closed },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                statusFilter === f.key
                  ? 'border-brand-600 bg-brand-gradient text-white'
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
              <MessageSquare className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">No Enquiries Found</h3>
            <p className="mt-2 text-sm text-slate-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Browse businesses and send an enquiry to get started'}
            </p>
            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white hover:bg-brand-gradient"
            >
              Browse Businesses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Listing', 'Location', 'Date', 'Status', 'Actions'].map((h) => (
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
                  {filtered.map((eq) => (
                    <tr key={eq._id} className="hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelected(eq)}
                          className="flex items-center gap-3 text-left"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                            <Building2 className="h-5 w-5" />
                          </span>
                          <span className="font-bold text-brand-800 hover:underline">
                            {eq.propertyId?.title || 'Listing'}
                          </span>
                        </button>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-brand-600" />
                          {[eq.propertyId?.location?.locality, eq.propertyId?.location?.city]
                            .filter(Boolean)
                            .join(', ') || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-brand-600" />
                          {eq.createdAt ? new Date(eq.createdAt).toLocaleDateString() : '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(eq.status)}`}>
                          {eq.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(eq)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-700"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {eq.propertyId?._id && (
                            <Link
                              to={`/property/${eq.propertyId._id}`}
                              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                            >
                              View Listing
                            </Link>
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
          >
            <div className="shrink-0 border-b border-slate-100 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(selected.status)}`}>
                    {selected.status}
                  </span>
                  <h2 className="mt-3 text-xl font-extrabold text-slate-900">
                    {selected.propertyId?.title || 'Listing'}
                  </h2>
                </div>
                <button type="button" onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {[
                { label: 'Enquiry ID', value: selected._id },
                {
                  label: 'Sent On',
                  value: selected.createdAt ? new Date(selected.createdAt).toLocaleString() : '—',
                },
                {
                  label: 'Your Message',
                  value: selected.contactInfo?.message || selected.message || 'No message',
                },
              ].map((row) => (
                <div key={row.label} className="border-b border-slate-100 pb-3 last:border-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{row.label}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-900">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 gap-3 border-t border-slate-100 px-6 py-4">
              {selected.propertyId?._id && (
                <Link
                  to={`/property/${selected.propertyId._id}`}
                  className="flex-1 rounded-xl bg-brand-gradient py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-gradient"
                >
                  View Listing
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
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
