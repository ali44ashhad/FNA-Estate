import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { adminService, sellerLeadService } from '../../services/api';
import {
  UserPlus,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Store,
} from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100';

export const OnboardSellerPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('leadId');

  const [formData, setFormData] = useState({
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    password: '',
    companyName: searchParams.get('companyName') || '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: searchParams.get('name') || prev.name,
      email: searchParams.get('email') || prev.email,
      phone: searchParams.get('phone') || prev.phone,
      companyName: searchParams.get('companyName') || prev.companyName,
    }));
  }, [searchParams]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await adminService.onboardSeller(formData);

      if (leadId) {
        try {
          await sellerLeadService.update(leadId, { status: 'Onboarded' });
        } catch {
          // Seller was created; lead status update is secondary
        }
      }

      navigate(leadId ? '/admin/seller-leads' : '/admin/sellers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to onboard seller');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Onboard Seller | Admin | Udyam Mittar</title>
      </Helmet>

      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
         
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
            <ShieldCheck className="h-4 w-4" />
            Seller Onboarding
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Onboard <span className="text-brand-800">New Seller</span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            {leadId
              ? 'Details pre-filled from a Sell Business request. Set a temporary password and create the seller account.'
              : 'Add a verified seller to grow the Udyam Mittar network across Tricity.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError('')}
              className="text-red-500 hover:text-red-700"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-xl bg-brand-50 p-2.5 text-brand-700">
              <Store className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Seller Details</h2>
              <p className="text-sm text-slate-500">Fill in the account and business information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter seller's full name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Business Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Sharma Enterprises"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seller@udyammittar.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Temporary Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Set a strong temporary password"
                className={inputClass}
              />
              <p className="mt-2 text-sm text-slate-500">
                Seller will be prompted to change this on first login.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-brand-gradient disabled:opacity-60"
              >
                <UserPlus className="h-5 w-5" />
                {submitting ? 'Onboarding...' : 'Onboard Seller'}
              </button>
              <button
                type="button"
                onClick={() => navigate(leadId ? '/admin/seller-leads' : '/admin/sellers')}
                className="flex-1 rounded-xl border border-slate-300 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
