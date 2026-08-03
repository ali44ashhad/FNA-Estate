import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  BarChart3,
  CheckCircle,
  Phone,
  ArrowRight,
  IndianRupee,
  MapPin,
  Store,
  ShieldCheck,
  Handshake,
  Search,
} from 'lucide-react';

const GUIDES = [
  {
    icon: Search,
    title: 'Evaluate the Business',
    description: 'Look beyond the asking price before you commit.',
    features: [
      'Verify monthly sales & profit claims',
      'Understand stock, staff and lease terms',
      'Check licences and pending liabilities',
      'Assess customer footfall and competition',
    ],
  },
  {
    icon: IndianRupee,
    title: 'Plan Your Investment',
    description: 'Decide what you can afford and how returns should look.',
    features: [
      'Set a realistic investment range',
      'Factor working capital after takeover',
      'Estimate payback period',
      'Compare similar Tricity listings',
    ],
  },
  {
    icon: MapPin,
    title: 'Choose the Right Location',
    description: 'In Tricity, location often drives business performance.',
    features: [
      'Chandigarh sector vs Mohali industrial belts',
      'Panchkula neighbourhood demand',
      'Parking, visibility and catchment area',
      'Rent escalations and lease security',
    ],
  },
  {
    icon: BarChart3,
    title: 'Close with Confidence',
    description: 'Move from interest to a safe handover.',
    features: [
      'Site visit and seller conversations',
      'Due diligence checklist',
      'Negotiate price and handover timeline',
      'Document transfer of assets & accounts',
    ],
  },
];

const TIPS = [
  {
    icon: ShieldCheck,
    title: 'Prefer verified listings',
    text: 'Start with businesses that have been reviewed on Udyam Mittar before you invest time.',
  },
  {
    icon: Store,
    title: 'Match category to your skills',
    text: 'A cafe, clinic, factory or PG each needs different day-to-day involvement.',
  },
  {
    icon: Handshake,
    title: 'Ask for guidance',
    text: 'First-time buyers can talk to our team before sending enquiries to sellers.',
  },
];

export const InvestmentGuidePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Business Investment Guide | Buy Running Businesses in Tricity | Udyam Mittar</title>
        <meta
          name="description"
          content="Practical guide to buying a running business in Chandigarh, Mohali and Panchkula — evaluation, investment planning, location tips and closing the deal with Udyam Mittar."
        />
        <meta
          name="keywords"
          content="buy business Tricity, business investment guide, running business for sale Chandigarh, Mohali business investment, Panchkula business buying tips"
        />
        <link rel="canonical" href="https://udyammittar.com/investment-guide" />
        <meta property="og:title" content="Business Investment Guide | Udyam Mittar" />
        <meta
          property="og:description"
          content="How to evaluate and buy a running business in Tricity with confidence."
        />
        <meta property="og:url" content="https://udyammittar.com/investment-guide" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Business Investment Guide | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Practical tips for buying a running business in Tricity."
        />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <TrendingUp className="h-4 w-4" />
            Buyer guidance
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Business Investment Guide
            <span className="mt-2 block text-brand-200">for Tricity buyers</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100">
            A practical checklist for evaluating running businesses in Chandigarh, Mohali and
            Panchkula — before you connect with a seller on Udyam Mittar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              Browse Businesses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get Guidance
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">What to focus on</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Four steps that help serious buyers avoid costly mistakes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {GUIDES.map(({ icon: Icon, title, description, features }) => (
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
        <div className="grid gap-4 md:grid-cols-3">
          {TIPS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-200 bg-brand-50 p-6"
            >
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
            Ready to explore verified businesses?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            Browse listings across Tricity or talk to our team if you are buying a business for the
            first time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Get Investment Guidance
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
