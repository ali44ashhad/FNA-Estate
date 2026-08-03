import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
  Heart,
  CheckCircle,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Handshake,
  Store,
  Lock,
  Headphones,
  Building2,
} from 'lucide-react';

const TRUST_POINTS = [
  {
    title: 'Verified Listings',
    description: 'Every business is manually reviewed before it goes live on the platform.',
    icon: ShieldCheck,
  },
  {
    title: 'Local Network',
    description: 'Deep roots in the Tricity business community across Chandigarh, Mohali & Panchkula.',
    icon: Users,
  },
  {
    title: 'Confidential Deals',
    description: 'Your privacy comes first — enquiries stay private until you choose to connect.',
    icon: Lock,
  },
  {
    title: 'Expert Guidance',
    description: 'Get help from people who understand local markets, valuations and deal flow.',
    icon: Headphones,
  },
];

const CORE_VALUES = [
  {
    title: 'Trust First',
    description: 'Transparent listings and honest conversations between buyers and sellers.',
    icon: ShieldCheck,
  },
  {
    title: 'Local Focus',
    description: 'Built for Tricity entrepreneurs — not a national property marketplace.',
    icon: MapPin,
  },
  {
    title: 'Fair Deals',
    description: 'We help both sides find the right match and close with confidence.',
    icon: Handshake,
  },
  {
    title: 'Growth Mindset',
    description: 'Whether you are buying or selling, the goal is lasting business growth.',
    icon: TrendingUp,
  },
];

const STATS = [
  { number: '450+', label: 'Active Listings', icon: Store },
  { number: '950+', label: 'Verified Sellers', icon: Users },
  { number: '3', label: 'Cities Covered', icon: MapPin },
  { number: '120+', label: 'Successful Deals', icon: Handshake },
];

const STEPS = [
  {
    step: '01',
    title: 'List Your Business',
    text: 'Share key details. We verify the listing before it reaches serious buyers.',
  },
  {
    step: '02',
    title: 'Find the Right Match',
    text: 'Buyers explore verified opportunities that fit their goals and budget.',
  },
  {
    step: '03',
    title: 'Connect & Close',
    text: 'Connect securely, negotiate, and complete the deal with confidence.',
  },
];

const PRESENCE = [
  {
    city: 'Chandigarh',
    focus: 'Retail, cafes, offices & hospitality',
    note: 'Sector markets & established business hubs',
  },
  {
    city: 'Mohali',
    focus: 'Manufacturing, warehouses & services',
    note: 'Industrial corridors and growing commercial belts',
  },
  {
    city: 'Panchkula',
    focus: 'Clinics, retail & running businesses',
    note: 'Local neighbourhood opportunities with strong demand',
  },
];

export const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>About Us | Udyam Mittar - Tricity Business Exchange</title>
        <meta
          name="description"
          content="Udyam Mittar is Tricity's trusted platform for buying and selling running businesses in Chandigarh, Mohali and Panchkula. Verified listings, confidential deals and local expertise."
        />
        <meta
          name="keywords"
          content="about Udyam Mittar, buy business Chandigarh, sell business Mohali, Tricity business exchange, running business for sale Panchkula"
        />
        <link rel="canonical" href="https://udyammittar.com/about-us" />
        <meta property="og:title" content="About Us | Udyam Mittar" />
        <meta
          property="og:description"
          content="Tricity's trusted business exchange for buying and selling running businesses."
        />
        <meta property="og:url" content="https://udyammittar.com/about-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us | Udyam Mittar" />
        <meta
          name="twitter:description"
          content="Tricity's trusted business exchange for buying and selling running businesses."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Tricity's Trusted Business Exchange
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
            Helping Local Businesses
            <span className="mt-2 block text-brand-200">Buy. Sell. Grow.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100 lg:text-lg">
            Udyam Mittar connects buyers and sellers of running businesses across Chandigarh,
            Mohali and Panchkula — with verified listings, confidential deal support and local
            market guidance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
            >
              Explore Businesses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/sell-business"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Store className="h-4 w-4" />
              List Your Business
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800">
              <Building2 className="h-3.5 w-3.5" />
              Our Story
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 lg:text-4xl">
              Built for Tricity
              <span className="block text-brand-700">entrepreneurs</span>
            </h2>
            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Buying or selling a running business should not feel like a gamble. Too often,
                local owners struggle to find serious buyers, and buyers struggle to find verified
                opportunities they can trust.
              </p>
              <p>
                Udyam Mittar was created to fix that — a focused exchange for cafes, retail shops,
                clinics, factories, warehouses, PGs and service businesses across Tricity.
              </p>
              <p>
                We keep the process simple: verify every listing, protect privacy, and help both
                sides connect with clarity.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-gradient p-8 text-white shadow-lg">
            <Award className="mb-4 h-10 w-10 text-brand-200" />
            <h3 className="text-2xl font-bold">What makes us different</h3>
            <ul className="mt-5 space-y-3">
              {[
                'Local-only focus on Chandigarh, Mohali & Panchkula',
                'Manually verified business listings',
                'Confidential enquiry flow for serious buyers',
                'Guidance for first-time business buyers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-50">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-gradient text-white lg:grid-cols-4">
          {STATS.map(({ number, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 bg-brand-gradient px-6 py-6">
              <span className="rounded-lg bg-white/10 p-2.5">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-2xl font-extrabold leading-none">{number}</div>
                <div className="mt-1 text-sm font-medium text-brand-100">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust + Values */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Why people trust us</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            The same pillars you see on our homepage — built into every listing and every deal.
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex rounded-lg bg-brand-50 p-2.5 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Our values</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex rounded-lg bg-brand-50 p-2.5 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-10">
          <div className="mb-8 max-w-xl">
            <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
            <p className="mt-2 text-slate-600">
              Simple steps to buy or sell a running business in Tricity.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map(({ step, title, text }) => (
              <div key={step} className="rounded-xl bg-slate-50 p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                  {step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 lg:p-10">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-800">
              <span className="rounded-lg bg-brand-gradient p-2 text-white">
                <Target className="h-4 w-4" />
              </span>
              Our Mission
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Make business transfer in Tricity simple, safe and local
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                'Give sellers a trusted place to list running businesses',
                'Help buyers discover verified opportunities',
                'Keep every enquiry confidential by default',
                'Support first-time buyers with practical guidance',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-800 p-8 text-white lg:p-10">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">
              <span className="rounded-lg bg-white/10 p-2">
                <Eye className="h-4 w-4" />
              </span>
              Our Vision
            </div>
            <h3 className="text-2xl font-extrabold">
              Become Tricity's default platform for business exchange
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-100">
              From restaurants and retail to manufacturing and service businesses — a place where
              local owners and buyers meet with clarity, trust and better outcomes.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="flex items-center gap-2 text-brand-200">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Focus</span>
                </div>
                <div className="mt-1 text-lg font-bold">Local first</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-brand-200">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Goal</span>
                </div>
                <div className="mt-1 text-lg font-bold">More closed deals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900">
          Where we operate
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {PRESENCE.map((office) => (
            <div
              key={office.city}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-700" />
                <h3 className="text-xl font-bold text-slate-900">{office.city}</h3>
              </div>
              <p className="text-sm font-semibold text-slate-800">{office.focus}</p>
              <p className="mt-2 text-sm text-slate-500">{office.note}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                Support: Mon–Sat, 10AM–7PM
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="rounded-2xl bg-brand-gradient px-6 py-10 text-white lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold lg:text-3xl">
                Ready to buy or sell a business?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-100">
                Browse verified listings or list your business and reach serious local buyers.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services/consultation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" />
                Get Guidance
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse Businesses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
