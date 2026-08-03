import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  CheckCircle,
  Phone,
  ArrowRight,
  Store,
  TrendingUp,
  MapPin,
  Handshake,
  ShieldCheck,
  Search,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Search,
    title: 'Business Selection Guidance',
    description: 'Help choosing the right running business for your goals and budget.',
    features: [
      'Category & skill fit',
      'Budget and investment range',
      'Comparing shortlisted listings',
      'What to verify before you connect',
    ],
  },
  {
    icon: MapPin,
    title: 'Tricity Market Insights',
    description: 'Local context for Chandigarh, Mohali and Panchkula opportunities.',
    features: [
      'Area and catchment pointers',
      'Category demand patterns',
      'Lease vs ownership considerations',
      'Competition and footfall checks',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Buyer Investment Planning',
    description: 'Practical planning before you send enquiries or negotiate.',
    features: [
      'Payback and cash-flow thinking',
      'Working capital after takeover',
      'Risk flags to ask sellers',
      'Funding path overview',
    ],
  },
  {
    icon: Handshake,
    title: 'Buyer–Seller Guidance',
    description: 'Support for both sides through a clearer deal conversation.',
    features: [
      'Pricing and expectation setting',
      'Enquiry and negotiation tips',
      'Handover checklist basics',
      'When to bring in legal / loan help',
    ],
  },
];

const STATS = [
  { label: 'Active listings', value: '450+', icon: Store },
  { label: 'Verified sellers', value: '950+', icon: ShieldCheck },
  { label: 'Cities covered', value: '3', icon: MapPin },
  { label: 'Successful deals', value: '120+', icon: Handshake },
];

const WHO_FOR = [
  {
    title: 'First-time buyers',
    text: 'Not sure which category fits you? We help you narrow options before you enquire.',
  },
  {
    title: 'Serious investors',
    text: 'Compare similar businesses and plan budget, funding and due diligence steps.',
  },
  {
    title: 'Sellers',
    text: 'Position your listing clearly and prepare for serious buyer conversations.',
  },
];

export const PropertyConsultationPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Business Consultation | Expert Guidance for Buyers & Sellers | Udyam Mittar</title>
        <meta
          name="description"
          content="Get expert business consultation on Udyam Mittar — help choosing a running business, Tricity market insights, investment planning and buyer–seller guidance in Chandigarh, Mohali and Panchkula."
        />
        <meta
          name="keywords"
          content="business consultation Tricity, buy business guidance, sell business advice, Chandigarh business consultant, Mohali running business help, Udyam Mittar consultation"
        />
        <link rel="canonical" href="https://udyammittar.com/services/consultation" />
        <meta property="og:title" content="Business Consultation | Udyam Mittar" />
        <meta
          property="og:description"
          content="Expert guidance for buying or selling running businesses in Tricity."
        />
        <meta property="og:url" content="https://udyammittar.com/services/consultation" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Business Consultation | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Guidance for buyers and sellers of running businesses in Tricity."
        />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <MessageSquare className="h-4 w-4" />
            Expert guidance
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Business Consultation
            <span className="mt-2 block text-brand-200">for Tricity deals</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100">
            New to buying a running business — or preparing to sell one? Get practical guidance
            from Udyam Mittar so you shortlist better, ask the right questions and move toward a
            safer close.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Call for Guidance
            </a>
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
          <h2 className="text-3xl font-extrabold text-slate-900">How consultation helps</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Focused support for business buyers and sellers — not generic property advice.
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
        <div className="grid gap-px overflow-hidden rounded-2xl bg-brand-gradient text-white sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 bg-brand-gradient px-6 py-6">
              <span className="rounded-lg bg-white/10 p-2.5">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-2xl font-extrabold leading-none">{value}</div>
                <div className="mt-1 text-sm text-brand-100">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-900">Who it&apos;s for</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {WHO_FOR.map(({ title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-200 bg-brand-50 p-6"
            >
              <span className="inline-flex rounded-lg bg-white p-2.5 text-brand-700">
                <Users className="h-5 w-5" />
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
            Ready to talk through your options?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            Tell us whether you are buying or selling, your budget or asking price, and the
            category you care about. We&apos;ll help you plan the next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              Book a Call
            </a>
            <Link
              to="/investment-guide"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read Investment Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
