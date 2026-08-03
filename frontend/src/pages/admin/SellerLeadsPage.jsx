import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { sellerLeadService } from '../../services/api';
import { Loading } from '../../components/Loading';
import { getCategoryLabel } from '../../utils/business';
import {
  ShieldCheck,
  Search,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Eye,
  X,
  AlertCircle,
  XCircle,
  Store,
  UserPlus,
  Building2,
  CheckCircle,
} from 'lucide-react';

const statusStyle = (status) => {
  if (status === 'New') return 'whitespace-nowrap border-amber-200 bg-amber-50 text-amber-800';
  if (status === 'Contacted') return 'whitespace-nowrap border-blue-200 bg-blue-50 text-blue-800';
  if (status === 'Onboarded') return 'whitespace-nowrap border-brand-200 bg-brand-50 text-brand-800';
  if (status === 'Rejected') return 'whitespace-nowrap border-red-200 bg-red-50 text-red-700';
  return 'whitespace-nowrap border-slate-200 bg-slate-50 text-slate-700';
};

const STATUSES = ['New', 'Contacted', 'Onboarded', 'Rejected'];

// Clear pipeline: New → Contacted → Onboarded (success) OR Rejected (not moving ahead)
const nextAction = (status) => {
  if (status === 'New') return { label: 'Mark Contacted', next: 'Contacted' };
  if (status === 'Contacted') return { label: 'Mark Rejected', next: 'Rejected' };
  if (status === 'Rejected') return { label: 'Reopen', next: 'Contacted' };
  return null;
};

export const SellerLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await sellerLeadService.getAll();
      setLeads(res.data.leads || []);
    } catch {
      setError('Failed to load seller requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openLead = (lead) => {
    setSelected(lead);
    setNotes(lead.adminNotes || '');
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdating(true);
      const res = await sellerLeadService.update(id, { status });
      const updated = leads.map((l) => (l._id === id ? res.data.lead : l));
      setLeads(updated);
      if (selected?._id === id) setSelected(res.data.lead);
    } catch {
      setError('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    if (!selected) return;
    try {
      setUpdating(true);
      const res = await sellerLeadService.update(selected._id, { adminNotes: notes });
      const updated = leads.map((l) => (l._id === selected._id ? res.data.lead : l));
      setLeads(updated);
      setSelected(res.data.lead);
    } catch {
      setError('Failed to save notes');
    } finally {
      setUpdating(false);
    }
  };

  const filtered = leads.filter((lead) => {
    const haystack = [
      lead.name,
      lead.email,
      lead.phone,
      lead.businessName,
      lead.businessType,
      lead.city,
      lead.status,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: leads.length,
    New: leads.filter((l) => l.status === 'New').length,
    Contacted: leads.filter((l) => l.status === 'Contacted').length,
    Onboarded: leads.filter((l) => l.status === 'Onboarded').length,
    Rejected: leads.filter((l) => l.status === 'Rejected').length,
  };

  const onboardQuery = (lead) => {
    const params = new URLSearchParams();
    if (lead.name) params.set('name', lead.name);
    if (lead.email) params.set('email', lead.email);
    if (lead.phone) params.set('phone', lead.phone);
    if (lead.businessName) params.set('companyName', lead.businessName);
    if (lead._id) params.set('leadId', lead._id);
    return `/admin/sellers/onboard?${params.toString()}`;
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Seller Requests | Admin | Udyam Mittar</title>
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
                Sell Business Leads
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Seller Requests <span className="text-brand-800">({filtered.length})</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Pipeline: New → Contacted → Onboarded (seller account created) or Rejected (not proceeding).
              </p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search requests..."
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
            ...STATUSES.map((s) => ({ key: s, label: s, count: counts[s] })),
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
              <Store className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">No Seller Requests</h3>
            <p className="mt-2 text-sm text-slate-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'When someone submits the Sell Business form, they will appear here'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Contact', 'Business', 'City', 'Submitted', 'Status', 'Actions'].map((h) => (
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
                  {filtered.map((lead) => (
                    <tr key={lead._id} className="hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => openLead(lead)}
                          className="text-left"
                        >
                          <div className="font-bold text-brand-800 hover:underline">{lead.name}</div>
                          <div className="mt-0.5 text-xs text-slate-500">{lead.phone}</div>
                        </button>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-700">
                        <div className="font-medium">{lead.businessName || '—'}</div>
                        <div className="text-xs text-slate-500">
                          {lead.businessType ? getCategoryLabel(lead.businessType) : '—'}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-brand-600" />
                          {lead.city || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-brand-600" />
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openLead(lead)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {nextAction(lead.status) && (
                            <button
                              type="button"
                              disabled={updating}
                              onClick={() => updateStatus(lead._id, nextAction(lead.status).next)}
                              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
                                lead.status === 'Rejected'
                                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                  : lead.status === 'Contacted'
                                    ? 'bg-red-50 text-red-700 hover:bg-red-100'
                                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                              }`}
                            >
                              {nextAction(lead.status).label}
                            </button>
                          )}
                          {lead.status !== 'Onboarded' && lead.status !== 'Rejected' && (
                            <Link
                              to={onboardQuery(lead)}
                              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                            >
                              <UserPlus className="h-3.5 w-3.5" />
                              Onboard
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
                  <h2 className="mt-3 text-xl font-extrabold text-slate-900">{selected.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selected.businessName || 'Business name not shared'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {[
                { icon: Mail, label: 'Email', value: selected.email },
                { icon: Phone, label: 'Phone', value: selected.phone },
                { icon: Building2, label: 'Category', value: selected.businessType ? getCategoryLabel(selected.businessType) : '—' },
                { icon: MapPin, label: 'City', value: selected.city || '—' },
                { icon: Store, label: 'Asking Price', value: selected.askingPrice || '—' },
                {
                  icon: Calendar,
                  label: 'Submitted',
                  value: selected.createdAt ? new Date(selected.createdAt).toLocaleString() : '—',
                },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 border-b border-slate-100 pb-3">
                  <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{row.label}</p>
                    <p className="mt-0.5 break-words text-sm font-semibold text-slate-900">{row.value}</p>
                  </div>
                </div>
              ))}

              {selected.message && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Message</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{selected.message}</p>
                </div>
              )}

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Update Status
                </p>
                {nextAction(selected.status) && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => updateStatus(selected._id, nextAction(selected.status).next)}
                    className="mb-3 w-full rounded-xl bg-brand-gradient py-2.5 text-sm font-semibold text-white hover:bg-brand-gradient disabled:opacity-50"
                  >
                    {nextAction(selected.status).label}
                  </button>
                )}
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={updating || selected.status === status}
                      onClick={() => updateStatus(selected._id, status)}
                      className={`whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-default disabled:opacity-100 ${
                        selected.status === status
                          ? 'border-brand-600 bg-brand-gradient text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Admin Notes
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Call notes, follow-up date..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={updating}
                  className="mt-2 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Save Notes
                </button>
              </div>
            </div>

            <div className="flex shrink-0 gap-3 border-t border-slate-100 px-6 py-4">
              {selected.status === 'Onboarded' ? (
                <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 py-2.5 text-sm font-semibold text-brand-800">
                  <CheckCircle className="h-4 w-4" />
                  Seller Account Created
                </span>
              ) : selected.status === 'Rejected' ? (
                <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-700">
                  <XCircle className="h-4 w-4" />
                  Request Rejected
                </span>
              ) : (
                <Link
                  to={onboardQuery(selected)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient py-2.5 text-sm font-semibold text-white hover:bg-brand-gradient"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Seller Account
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
