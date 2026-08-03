import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Store,
  ShieldCheck,
  CheckCircle,
  Phone,
  ArrowRight,
  MessageSquare,
  Users,
  FileText,
  TrendingUp,
  ClipboardList,
} from 'lucide-react';

const SERVICES = [
  {
    icon: ClipboardList,
    title: 'Listing Setup & Updates',
    description: 'Keep your business listing clear, complete and ready for serious buyers.',
    features: [
      'Profile and category setup',
      'Photo & description guidance',
      'Price and highlight updates',
      'Status tracking on the platform',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Enquiry Management',
    description: 'Stay organised when buyers reach out through Udyam Mittar.',
    features: [
      'Enquiry review tips',
      'Response best practices',
      'Serious-buyer screening pointers',
      'Follow-up reminders mindset',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Sale Readiness',
    description: 'Prepare your business so buyers can evaluate and close with confidence.',
    features: [
      'Documents buyers typically ask for',
      'Sales & profit presentation tips',
      'Lease and licence checklist',
      'Handover planning basics',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Verified Listing Support',
    description: 'Help meeting verification expectations before your business goes live.',
    features: [
      'Verification preparation',
      'Accurate claim guidelines',
      'Confidential deal practices',
      'Policy-compliant listing content',
    ],
  },
];

const WHO_FOR = [
  {
    icon: Store,
    title: 'Active sellers',
    text: 'Already listed or about to list — keep your opportunity competitive and clear.',
  },
  {
    icon: Users,
    title: 'Busy owners',
    text: 'Need a simple way to manage buyer interest without chaos across calls and chats.',
  },
  {
    icon: FileText,
    title: 'First-time sellers',
    text: 'Unsure what buyers expect? We help you structure the listing and deal conversation.',
  },
];

export const PropertyManagementPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Business Listing Management | Seller Support | Udyam Mittar</title>
        <meta
          name="description"
          content="Manage your business listing on Udyam Mittar — listing setup, enquiry handling, sale readiness and verification support for sellers in Chandigarh, Mohali and Panchkula."
        />
        <meta
          name="keywords"
          content="sell business Tricity, business listing management, seller support Chandigarh, manage business listing, Udyam Mittar seller help"
        />
        <link rel="canonical" href="https://udyammittar.com/services/management" />
        <meta property="og:title" content="Business Listing Management | Udyam Mittar" />
        <meta
          property="og:description"
          content="Seller support for listing setup, enquiries and sale readiness on Udyam Mittar."
        />
        <meta property="og:url" content="https://udyammittar.com/services/management" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Business Listing Management | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Keep your business listing organised and sale-ready."
        />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <Store className="h-4 w-4" />
            Seller support
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Business Listing Management
            <span className="mt-2 block text-brand-200">made simpler</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100">
            Selling a running business in Tricity takes more than posting a price. Udyam Mittar
            helps you keep your listing accurate, handle buyer interest better and prepare for a
            cleaner handover.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/sell-business"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              List Your Business
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">What we help manage</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Support for listing and selling a business — not residential rent or tenant management.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description, features }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:p-8"
            >
              <span className="inline-flex rounded-lg bg-brand-gradient p-3 text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
              <ul className="mt-5 space-y-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-900">Who it&apos;s for</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {WHO_FOR.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
              <span className="inline-flex rounded-lg bg-white p-2.5 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="rounded-2xl bg-brand-gradient px-6 py-10 text-center text-white lg:px-10">
          <h2 className="text-2xl font-extrabold lg:text-3xl">
            Ready to manage your sale better?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            Submit a sell request so our team can contact you and set up your seller account,
            or speak with us if you want help preparing your listing first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/sell-business"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Store className="h-4 w-4" />
              Start Listing
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
