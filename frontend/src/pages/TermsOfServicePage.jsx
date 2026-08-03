import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  AlertCircle,
  Scale,
  Lock,
  UserCheck,
  RefreshCw,
  Mail,
  Phone,
  Store,
  CheckCircle,
  ChevronRight,
  Handshake,
} from 'lucide-react';

const RELATED_LINKS = [
  { to: '/privacy-policy', label: 'Privacy Policy', icon: Lock },
  { to: '/cookie-policy', label: 'Cookie Policy', icon: ShieldCheck },
  { to: '/disclaimer', label: 'Disclaimer', icon: AlertCircle },
];

export const TermsOfServicePage = () => {
  const sections = [
    {
      icon: FileText,
      title: '1. Agreement to Terms',
      content:
        'By accessing and using Udyam Mittar, you accept and agree to be bound by these Terms of Service. These terms form a legally binding agreement between you and Udyam Mittar. If you do not agree with any part of these terms, you may not use our platform.',
    },
    {
      icon: Scale,
      title: '2. Platform Licence',
      content:
        'Udyam Mittar grants you a limited, non-exclusive, non-transferable, revocable licence to access and use our business exchange services for personal and legitimate commercial purposes. This licence specifically prohibits:',
      points: [
        'Misuse or resale of our platform services',
        'Reverse engineering or decompiling our platform',
        'Data scraping, mining, or unauthorised extraction',
        'Unauthorised access to our systems',
        'Posting false, misleading, or fraudulent business listings',
      ],
    },
    {
      icon: UserCheck,
      title: '3. Account Registration',
      content:
        'To access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
    },
    {
      icon: Store,
      title: '4. Business Listings',
      content:
        'All business listings are subject to verification before approval. Sellers must provide accurate details about their business. Udyam Mittar acts as a marketplace platform and does not guarantee business conditions, financial performance, or ownership titles.',
      points: [
        'Listings must be truthful and complete',
        'Accurate pricing and business details are required',
        'Disclosure of material issues is mandatory',
        'We may reject or remove non-compliant listings',
      ],
    },
    {
      icon: Handshake,
      title: '5. Enquiries & Transactions',
      content:
        'Enquiries submitted through the platform are shared with relevant sellers. Any sale, purchase, or transfer agreement is solely between the buyer and seller. Udyam Mittar is not a party to these transactions and recommends independent due diligence before closing any deal.',
    },
    {
      icon: AlertCircle,
      title: '6. Disclaimer & Limitations',
      content:
        'Our services are provided "as is" without warranties of any kind. Udyam Mittar is not liable for business transactions between users. Independent legal and financial verification is strongly recommended before any purchase or sale.',
    },
    {
      icon: Lock,
      title: '7. Intellectual Property',
      content:
        'All content, logos, trademarks, and proprietary technology on Udyam Mittar are owned by Udyam Mittar. Unauthorised use of our intellectual property is strictly prohibited.',
    },
    {
      icon: Lock,
      title: '8. Privacy & Data Security',
      content:
        'We protect your personal information in accordance with applicable data protection laws. For full details on how we collect, use, and safeguard your data, please refer to our Privacy Policy.',
    },
    {
      icon: RefreshCw,
      title: '9. Changes to Terms',
      content:
        'We reserve the right to modify these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms. Significant changes will be communicated via email or platform notifications where appropriate.',
    },
    {
      icon: Scale,
      title: '10. Governing Law',
      content:
        'These terms are governed by the laws of India. Disputes arising from these terms or your use of Udyam Mittar shall be subject to the exclusive jurisdiction of the courts in Chandigarh.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Terms of Service | Udyam Mittar</title>
        <meta
          name="description"
          content="Read Udyam Mittar's terms of service. Understand your rights and obligations when using our Tricity business exchange platform."
        />
        <meta
          name="keywords"
          content="terms of service, terms and conditions, user agreement, Udyam Mittar, business exchange"
        />
        <link rel="canonical" href="https://udyammittar.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service | Udyam Mittar" />
        <meta
          property="og:description"
          content="Read Udyam Mittar's terms of service and user agreement."
        />
        <meta property="og:url" content="https://udyammittar.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Legal Documentation
          </span>
          <h1 className="mt-5 text-4xl font-extrabold lg:text-5xl">Terms of Service</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
            These terms govern your use of Udyam Mittar, Tricity&apos;s trusted platform for buying
            and selling running businesses.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-100">
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Last updated: July 29, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Clear &amp; Transparent
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              User Protection First
            </span>
          </div>

          {/* Quick links */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {RELATED_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-white/15"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand-200" />
                  {label}
                </span>
                <ChevronRight className="h-4 w-4 text-brand-200 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-4 flex items-center gap-3">
            <Store className="h-6 w-6 text-brand-700" />
            <h2 className="text-2xl font-bold text-slate-900">Important Notice</h2>
          </div>
          <p className="text-slate-700">
            These Terms of Service govern your use of Udyam Mittar, Tricity&apos;s trusted business
            exchange platform. By accessing our services, you acknowledge that you have read,
            understood, and agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map(({ icon: Icon, title, content, points }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 rounded-lg bg-brand-gradient p-2.5 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{content}</p>

                  {points && (
                    <ul className="mt-4 space-y-2">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 rounded-2xl bg-brand-gradient p-8 text-white lg:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-extrabold">Legal Inquiries</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100">
                For questions or clarifications regarding these Terms of Service, please contact our
                legal team. We aim to respond within 2–3 business days.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Mail className="h-5 w-5 text-brand-200" />
                Contact
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="mb-1 text-brand-200">Email</div>
                  <a
                    href="mailto:legal@udyammittar.com"
                    className="font-semibold text-white hover:underline"
                  >
                    legal@udyammittar.com
                  </a>
                </div>
                <div>
                  <div className="mb-1 text-brand-200">Phone</div>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 font-semibold text-white hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <div className="mb-1 text-brand-200">Service Area</div>
                  <p className="text-brand-50">
                    Chandigarh, Mohali &amp; Panchkula
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-left sm:items-center">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700 sm:mt-0" />
            <div>
              <p className="text-sm font-bold text-slate-900">
                By using Udyam Mittar, you acknowledge and accept these Terms of Service.
              </p>
              <p className="mt-1 text-xs text-slate-600">Last updated: July 29, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
