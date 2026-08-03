import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { sellerLeadService } from '../services/api';
import {
  BUSINESS_CATEGORIES,
  TRICITY_LOCATIONS,
} from '../utils/business';
import {
  ShieldCheck,
  Store,
  Phone,
  FileCheck,
  UserPlus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lock,
  Handshake,
  BadgeCheck,
  ClipboardList,
} from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Share your business details',
    text: 'Tell us about your business — category, location and asking range. No account needed.',
  },
  {
    icon: Phone,
    title: 'Our team contacts you',
    text: 'An Udyam Mittar advisor calls you to understand the listing and answer your questions.',
  },
  {
    icon: UserPlus,
    title: 'We create your seller account',
    text: 'After verification, admin sets up your seller login and shares credentials securely.',
  },
  {
    icon: Store,
    title: 'List and get buyer interest',
    text: 'Add your listing from the seller dashboard. We review it before it goes live.',
  },
];

const BENEFITS = [
  { icon: BadgeCheck, label: 'Verified buyer network in Tricity' },
  { icon: Lock, label: 'Confidential handling of your deal' },
  { icon: Handshake, label: 'Guided listing and enquiry support' },
  { icon: FileCheck, label: 'Admin-reviewed listings only' },
];

export const SellBusinessPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    city: '',
    askingPrice: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Name, email and phone are required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await sellerLeadService.submit(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        city: '',
        askingPrice: '',
        message: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Sell Your Business | Udyam Mittar</title>
        <meta
          name="description"
          content="List your business for sale on Udyam Mittar. Submit your details — our team will contact you and create your verified seller account."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMAGE} alt="Tricity skyline" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
              <ShieldCheck className="h-4 w-4" />
              For Business Owners
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Sell Your Business{' '}
              <span className="text-brand-800">the right way</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Udyam Mittar does not open seller accounts through public signup.
              Share your details below — our team verifies you, then creates your
              seller account and helps you list confidentially across Tricity.
            </p>
            <a
              href="#sell-form"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-brand-gradient"
            >
              Request a Callback
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            How selling works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Four clear steps from interest to a live listing — no self-serve seller signup.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="relative">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white">
                  {index + 1}
                </span> 
              </div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits strip */}
      <section className="border-y border-slate-100 bg-brand-50/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="rounded-lg bg-white p-2.5 text-brand-700 shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-slate-800">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="sell-form" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Tell us about your business
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              This is not an account signup. Submitting this form only sends your
              interest to our team. We will call you, then create a seller account
              if everything checks out.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'No password or login created from this form',
                'Admin contacts you on the phone/email you share',
                'Seller credentials are shared only after verification',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500">
              Looking to buy instead?{' '}
              <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
                Create a buyer account
              </Link>
            </p>
          </div>

          <div className="lg:col-span-3">
            {success ? (
              <div className="rounded-2xl border border-brand-200 bg-brand-50 px-6 py-12 text-center shadow-sm">
                <span className="mx-auto inline-flex rounded-xl bg-white p-4 text-brand-700 shadow-sm">
                  <CheckCircle className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">Request received</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                  Thank you. Our team will review your details and contact you shortly
                  to discuss listing your business.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
              >
                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <span className="text-sm font-medium text-red-700">{error}</span>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Phone *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="10-digit mobile"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Business Name
                    </label>
                    <input
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Shop / brand name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Business Category
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select category</option>
                      {BUSINESS_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select city</option>
                      {TRICITY_LOCATIONS.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Asking Price (approx)
                    </label>
                    <input
                      name="askingPrice"
                      value={formData.askingPrice}
                      onChange={handleChange}
                      placeholder="e.g. ₹25 Lakhs"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Anything else we should know?
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Brief description, reason for sale, preferred timeline..."
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-gradient disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Sell Request'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};