import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  FileText,
  Phone,
  ArrowRight,
  Store,
  Award,
  CreditCard,
  Handshake,
  Building2,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Store,
    title: 'Business Acquisition Finance',
    description: 'Guidance for funding the purchase of a running business in Tricity.',
    features: [
      'Business loan options overview',
      'Working capital after takeover',
      'Eligibility checklist',
      'Bank / NBFC introduction support',
    ],
  },
  {
    icon: Building2,
    title: 'Commercial & Asset Finance',
    description: 'Help when the deal includes shop space, equipment or fit-outs.',
    features: [
      'Shop / commercial unit financing pointers',
      'Machinery & fixture funding paths',
      'Lease vs ownership considerations',
      'Refinancing for expanding units',
    ],
  },
  {
    icon: CreditCard,
    title: 'Compare & Plan EMIs',
    description: 'Understand tenure, rates and monthly outflow before you bid.',
    features: [
      'Rough EMI planning',
      'Down-payment vs loan mix',
      'Document readiness list',
      'Questions to ask lenders',
    ],
  },
  {
    icon: FileText,
    title: 'Documentation Support',
    description: 'Stay organised when lenders ask for papers on the business and buyer.',
    features: [
      'KYC & income proof checklist',
      'Business financials to prepare',
      'Seller document coordination tips',
      'Follow-ups through closing',
    ],
  },
];

const BENEFITS = [
  'Guidance tailored to buying a running business — not a home loan pitch',
  'Help preparing what banks typically ask for',
  'Clarity on investment range vs borrowing capacity',
  'Support alongside verified Udyam Mittar listings',
  'Introductions to lending partners where available',
  'Dedicated follow-up while you evaluate deals',
];

const STEPS = [
  { step: '01', title: 'Share your budget', text: 'Tell us your investment range and preferred category.' },
  { step: '02', title: 'Shortlist listings', text: 'Browse verified businesses that fit your plan.' },
  { step: '03', title: 'Plan the finance', text: 'We help you map loan vs own funds and papers needed.' },
  { step: '04', title: 'Connect & close', text: 'Enquire with sellers while your funding path is clear.' },
];

export const LoanAssistancePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Loan Assistance for Buying a Business | Udyam Mittar</title>
        <meta
          name="description"
          content="Get loan and financing guidance for buying a running business in Chandigarh, Mohali and Panchkula. Business acquisition finance, EMI planning and documentation support from Udyam Mittar."
        />
        <meta
          name="keywords"
          content="business loan Tricity, buy business finance, business acquisition loan, commercial loan Chandigarh, Mohali business funding, Udyam Mittar loan assistance"
        />
        <link rel="canonical" href="https://udyammittar.com/services/loan-assistance" />
        <meta property="og:title" content="Loan Assistance for Buying a Business | Udyam Mittar" />
        <meta
          property="og:description"
          content="Financing guidance for buying running businesses in Tricity."
        />
        <meta property="og:url" content="https://udyammittar.com/services/loan-assistance" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Loan Assistance | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Business acquisition finance guidance for Tricity buyers."
        />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <IndianRupee className="h-4 w-4" />
            Financing guidance
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Loan Assistance
            <span className="mt-2 block text-brand-200">for business buyers</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100">
            Planning to buy a cafe, shop, clinic, factory or other running business in Tricity?
            We help you understand funding options, papers and EMI planning — alongside verified
            listings on Udyam Mittar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Get Loan Guidance
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse Businesses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">What we help with</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Support built for acquiring a running business — not a residential home loan product
            page.
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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <h2 className="text-2xl font-extrabold text-slate-900">A simple path</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ step, title, text }) => (
              <div key={step} className="rounded-xl bg-slate-50 p-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                  {step}
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-900">
          Why buyers use this support
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="shrink-0 rounded-lg bg-brand-50 p-2 text-brand-700">
                <Award className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium text-slate-700">{benefit}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-slate-500">
          Loan approval, interest rates and eligibility depend on the lender and your profile.
          Udyam Mittar provides guidance and introductions — we are not a bank.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="rounded-2xl bg-brand-gradient px-6 py-10 text-center text-white lg:px-10">
          <div className="mx-auto mb-4 flex justify-center">
            <span className="rounded-xl bg-white/10 p-3">
              <Handshake className="h-6 w-6" />
            </span>
          </div>
          <h2 className="text-2xl font-extrabold lg:text-3xl">Ready to plan your funding?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            Share your budget and the type of business you want. We&apos;ll help you plan next
            steps while you browse verified listings.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/services/consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Get Loan Assistance
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
