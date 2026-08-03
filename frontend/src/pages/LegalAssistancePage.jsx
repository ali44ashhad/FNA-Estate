import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Scale,
  FileText,
  CheckCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Handshake,
  Search,
  Store,
} from 'lucide-react';

const SERVICES = [
  {
    icon: FileText,
    title: 'Deal Documentation',
    description: 'Paperwork support for buying or selling a running business.',
    features: [
      'Sale / takeover agreements',
      'Asset and stock handover notes',
      'Lease assignment guidance',
      'Basic checklist for closing documents',
    ],
  },
  {
    icon: Scale,
    title: 'Legal Consultation',
    description: 'Practical advice before you connect or commit to a deal.',
    features: [
      'Business transfer basics',
      'Contract review pointers',
      'Licence & compliance overview',
      'Risk flags to ask sellers about',
    ],
  },
  {
    icon: Search,
    title: 'Due Diligence Support',
    description: 'Help you verify what matters before you invest.',
    features: [
      'Listing claim verification guidance',
      'Encumbrance & liability checks (via partners)',
      'Lease and landlord consent review',
      'High-level risk assessment',
    ],
  },
  {
    icon: Handshake,
    title: 'Closing Support',
    description: 'Stay organised from enquiry to handover.',
    features: [
      'Negotiation talking points',
      'Handover timeline planning',
      'Introductions to trusted local advisors',
      'Post-deal follow-up checklist',
    ],
  },
];

const NOTES = [
  'Udyam Mittar connects buyers and sellers; formal legal representation is provided through qualified partners where needed.',
  'Always get independent legal advice for high-value or complex transfers.',
  'Verified listings reduce risk — they do not replace due diligence.',
];

export const LegalAssistancePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Legal Assistance for Business Transfers | Udyam Mittar</title>
        <meta
          name="description"
          content="Legal guidance for buying or selling running businesses in Tricity — documentation, due diligence support, consultation and closing help with Udyam Mittar."
        />
        <meta
          name="keywords"
          content="business transfer legal help, buy business documentation, sell business legal advice, Tricity business due diligence, Udyam Mittar legal assistance"
        />
        <link rel="canonical" href="https://udyammittar.com/services/legal" />
        <meta property="og:title" content="Legal Assistance for Business Transfers | Udyam Mittar" />
        <meta
          property="og:description"
          content="Documentation, consultation and due diligence support for Tricity business deals."
        />
        <meta property="og:url" content="https://udyammittar.com/services/legal" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Legal Assistance | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Legal support for buying and selling running businesses in Tricity."
        />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <Scale className="h-4 w-4" />
            Legal guidance
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Legal Assistance
            <span className="mt-2 block text-brand-200">for business transfers</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100">
            Clear support for buyers and sellers closing deals on running businesses across
            Chandigarh, Mohali and Panchkula — from paperwork basics to due diligence checkpoints.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Talk to Us
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Store className="h-4 w-4" />
              Browse Businesses
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">How we can help</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Practical legal support tailored to business buying and selling — not generic property
            conveyancing.
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
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 lg:p-8">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-700" />
            <h3 className="text-lg font-bold text-slate-900">Please note</h3>
          </div>
          <ul className="space-y-3">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="rounded-2xl bg-brand-gradient px-6 py-10 text-center text-white lg:px-10">
          <h2 className="text-2xl font-extrabold lg:text-3xl">Need legal help on a deal?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            Tell us where you are in the process — evaluating a listing, negotiating, or preparing
            to close — and we&apos;ll guide the next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Request Legal Guidance
            </Link>
            <Link
              to="/disclaimer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read Disclaimer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
