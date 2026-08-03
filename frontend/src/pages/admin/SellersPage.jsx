import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/api';
import { Loading } from '../../components/Loading';
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Search,
  ArrowRight,
  Store,
  Eye,
  X,
} from 'lucide-react';

export const SellersPage = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getSellers();
      setSellers(
        (res.data.sellers || []).map((s) => ({
          _id: s._id,
          name: s.name || 'N/A',
          email: s.email || 'N/A',
          phone: s.phone || 'N/A',
          companyName: s.companyName || '',
          companyDescription: s.companyDescription || '',
          businessType: s.businessType || '',
          officeAddress: s.officeAddress || '',
          isActive: s.isActive !== false,
          createdAt: s.createdAt,
        })),
      );
    } catch {
      setError('Failed to load sellers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (id) => {
    try {
      await adminService.toggleSellerStatus(id);
      const res = await adminService.getSellers();
      const updated = (res.data.sellers || []).map((s) => ({
        _id: s._id,
        name: s.name || 'N/A',
        email: s.email || 'N/A',
        phone: s.phone || 'N/A',
        companyName: s.companyName || '',
        companyDescription: s.companyDescription || '',
        businessType: s.businessType || '',
        officeAddress: s.officeAddress || '',
        isActive: s.isActive !== false,
        createdAt: s.createdAt,
      }));
      setSellers(updated);
      if (selected?._id === id) {
        setSelected(updated.find((s) => s._id === id) || null);
      }
    } catch {
      setError('Failed to update seller status');
    }
  };

  const filtered = sellers.filter((s) => {
    const matchesSearch = [s.name, s.email, s.phone, s.companyName]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && s.isActive) ||
      (statusFilter === 'inactive' && !s.isActive);
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: sellers.length,
    active: sellers.filter((s) => s.isActive).length,
    inactive: sellers.filter((s) => !s.isActive).length,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Sellers | Admin | Udyam Mittar</title>
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
                Seller Management
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Sellers <span className="text-brand-800">({filtered.length})</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Manage seller accounts, business profiles, and platform access.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/sellers/onboard')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-brand-gradient"
              >
                <UserPlus className="h-4 w-4" />
                Onboard Seller
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
            { key: 'inactive', label: 'Inactive', count: counts.inactive },
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
              <Users className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">No Sellers Found</h3>
            <p className="mt-2 text-sm text-slate-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Start by onboarding your first seller'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                type="button"
                onClick={() => navigate('/admin/sellers/onboard')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient"
              >
                <UserPlus className="h-4 w-4" />
                Onboard Seller
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Seller', 'Business', 'Contact', 'Joined', 'Status', 'Actions'].map((h) => (
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
                  {filtered.map((seller) => (
                    <tr key={seller._id} className="transition-colors hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelected(seller)}
                          className="flex items-center gap-3 text-left"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                            {seller.name?.charAt(0).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-bold text-brand-800 hover:underline">{seller.name}</p>
                            <p className="text-xs text-slate-400">ID: {seller._id?.slice(-6)}</p>
                          </div>
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Store className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                          <span className="truncate">{seller.companyName || '—'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="flex items-center gap-1.5 truncate text-sm text-slate-600">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                            {seller.email}
                          </p>
                          <p className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Phone className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                            {seller.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                          {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                            seller.isActive
                              ? 'border-brand-200 bg-brand-50 text-brand-800'
                              : 'border-red-200 bg-red-50 text-red-700'
                          }`}
                        >
                          {seller.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(seller)}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggle(seller._id)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                              seller.isActive
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                            }`}
                          >
                            {seller.isActive ? 'Deactivate' : 'Activate'}
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

        <section className="mt-8">
          <div className="relative overflow-hidden rounded-2xl bg-brand-gradient px-6 py-7 text-white lg:px-10">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-400/30 to-transparent" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold lg:text-2xl">Grow your seller network</h2>
                <p className="mt-1 max-w-xl text-sm text-brand-100">
                  Onboard verified sellers and expand Udyam Mittar across Tricity.
                </p>
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

      {/* Detail popup */}
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
            aria-labelledby="seller-detail-title"
          >
            <div className="shrink-0 border-b border-slate-100 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-xl font-bold text-white">
                    {selected.name?.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <h2 id="seller-detail-title" className="text-xl font-extrabold text-slate-900">
                      {selected.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {selected.companyName || 'No business name'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <span
                className={`mt-4 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                  selected.isActive
                    ? 'border-brand-200 bg-brand-50 text-brand-800'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {selected.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {[
                { label: 'Seller ID', value: selected._id },
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone },
                { label: 'Business Name', value: selected.companyName || '—' },
                { label: 'Business Type', value: selected.businessType || '—' },
                { label: 'Office Address', value: selected.officeAddress || '—' },
                {
                  label: 'Description',
                  value: selected.companyDescription || '—',
                },
                {
                  label: 'Joined',
                  value: selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString()
                    : 'N/A',
                },
              ].map((row) => (
                <div key={row.label} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{row.label}</p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-900">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 gap-3 border-t border-slate-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => handleToggle(selected._id)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                  selected.isActive
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-brand-gradient text-white hover:bg-brand-gradient'
                }`}
              >
                {selected.isActive ? 'Deactivate Account' : 'Activate Account'}
              </button>
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
