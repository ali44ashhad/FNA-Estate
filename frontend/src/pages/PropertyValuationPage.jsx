import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Calculator,
  FileText,
  CheckCircle,
  Phone,
  ArrowRight,
  TrendingUp,
  Store,
  Search,
  IndianRupee,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Calculator,
    title: 'Business Valuation Guidance',
    description: 'Help estimating a fair asking or offer range for a running business.',
    features: [
      'Sales & profit based thinking',
      'Location and category context',
      'Asset vs goodwill pointers',
      'Comparable listing checks',
    ],
  },
  {
    icon: Search,
    title: 'Pricing for Sale',
    description: 'Set a realistic asking price before you list on Udyam Mittar.',
    features: [
      'Seller expectation setting',
      'Buyer affordability lens',
      'Negotiation room planning',
      'Listing highlight tips',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Buyer Offer Support',
    description: 'Evaluate whether a listed price makes sense for your goals.',
    features: [
      'Payback period thinking',
      'Working capital after takeover',
      'Risk adjustments',
      'Questions to ask the seller',
    ],
  },
];

const INPUTS = [
  'Monthly sales and profit figures (where available)',
  'Lease rent, remaining tenure and deposit',
  'Stock, fixtures and transferable assets',
  'Licences, staff and customer concentration',
  'Location, competition and category demand in Tricity',
];

export const PropertyValuationPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Business Valuation Guidance | Price Your Running Business | Udyam Mittar</title>
        <meta
          name="description"
          content="Get business valuation guidance for buying or selling a running business in Chandigarh, Mohali and Panchkula. Pricing support based on sales, profit, lease and local market context."
        />
        <meta
          name="keywords"
          content="business valuation Tricity, price running business, sell business valuation Chandigarh, buy business price check Mohali, Udyam Mittar valuation"
        />
        <link rel="canonical" href="https://udyammittar.com/services/valuation" />
        <meta property="og:title" content="Business Valuation Guidance | Udyam Mittar" />
        <meta
          property="og:description"
          content="Practical pricing guidance for running businesses in Tricity."
        />
        <meta property="og:url" content="https://udyammittar.com/services/valuation" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Business Valuation | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Guidance to price or evaluate a running business before you deal."
        />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <IndianRupee className="h-4 w-4" />
            Pricing guidance
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Business Valuation
            <span className="mt-2 block text-brand-200">for Tricity deals</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100">
            Selling or buying a cafe, shop, clinic, factory or other running business? Get practical
            guidance on what drives price — so you list or offer with clearer expectations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Request Guidance
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse Listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">How we help</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Valuation support for running businesses — not residential property appraisal.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, features }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
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
            <FileText className="h-5 w-5 text-brand-700" />
            <h3 className="text-lg font-bold text-slate-900">What usually affects value</h3>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {INPUTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-slate-500">
            Guidance is indicative and based on information you share. Final price is always between
            buyer and seller after due diligence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="rounded-2xl bg-brand-gradient px-6 py-10 text-center text-white lg:px-10">
          <div className="mx-auto mb-4 flex justify-center">
            <span className="rounded-xl bg-white/10 p-3">
              <Store className="h-6 w-6" />
            </span>
          </div>
          <h2 className="text-2xl font-extrabold lg:text-3xl">
            Ready to price or evaluate a business?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            Tell us the category, location and key numbers you have — we&apos;ll help you plan a
            realistic range before you list or make an offer.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Request Valuation Guidance
            </Link>
            <Link
              to="/sell-business"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              List Your Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
