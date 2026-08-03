import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Cookie,
  ShieldCheck,
  BarChart3,
  Target,
  Settings,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

const COOKIE_CATEGORIES = [
  {
    icon: ShieldCheck,
    name: 'Essential Cookies',
    purpose: 'Required for login, security and basic platform functionality',
    duration: 'Session to 1 year',
    examples: [
      'Authentication and session management',
      'Fraud prevention and security',
      'Load balancing and system stability',
      'Enquiry form and secure submissions',
    ],
    essential: true,
  },
  {
    icon: BarChart3,
    name: 'Analytics & Performance',
    purpose: 'Help us understand how visitors use Udyam Mittar',
    duration: 'Up to 2 years',
    examples: [
      'Page views and navigation patterns',
      'Feature performance tracking',
      'Error monitoring and debugging',
      'Improving search and listing experience',
    ],
    essential: false,
  },
  {
    icon: Settings,
    name: 'Preference Cookies',
    purpose: 'Remember your settings and saved choices',
    duration: 'Up to 1 year',
    examples: [
      'Language and region preferences',
      'Business search filters',
      'Display and layout preferences',
      'Notification preferences',
    ],
    essential: false,
  },
  {
    icon: Target,
    name: 'Marketing Cookies',
    purpose: 'Show relevant business opportunities and measure campaigns',
    duration: 'Up to 90 days',
    examples: [
      'Relevant listing recommendations',
      'Campaign performance measurement',
      'Retargeting for interested buyers/sellers',
      'Cross-device experience continuity',
    ],
    essential: false,
  },
];

const MANAGE_OPTIONS = [
  {
    icon: Settings,
    title: 'Browser Settings',
    text: 'Most browsers let you block or delete cookies from their settings. Blocking essential cookies may affect login and enquiry features.',
  },
  {
    icon: Eye,
    title: 'Opt-Out Tools',
    text: 'You can use industry opt-out tools for advertising cookies. Analytics tools may still collect anonymised usage data where allowed.',
  },
  {
    icon: RefreshCw,
    title: 'Update Preferences',
    text: 'You can clear cookies from your browser anytime and revisit Udyam Mittar to set fresh preferences on your next visit.',
  },
];

export const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Cookie Policy | Udyam Mittar</title>
        <meta
          name="description"
          content="Learn how Udyam Mittar uses cookies to run our Tricity business exchange platform, improve performance, and remember your preferences."
        />
        <meta
          name="keywords"
          content="cookie policy, Udyam Mittar cookies, privacy, cookie preferences, Tricity business platform"
        />
        <link rel="canonical" href="https://udyammittar.com/cookie-policy" />
        <meta property="og:title" content="Cookie Policy | Udyam Mittar" />
        <meta
          property="og:description"
          content="How Udyam Mittar uses cookies and how you can manage your preferences."
        />
        <meta property="og:url" content="https://udyammittar.com/cookie-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <Cookie className="h-4 w-4" />
            Transparent data practices
          </span>
          <h1 className="mt-5 text-4xl font-extrabold lg:text-5xl">Cookie Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
            How Udyam Mittar uses cookies and similar technologies to keep the platform secure,
            useful and relevant for Tricity buyers and sellers.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-100">
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Last updated: July 29, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Privacy-minded by design
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Essential cookies only when required
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-14">
        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <span className="shrink-0 rounded-lg bg-brand-gradient p-2.5 text-white">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">About our cookie usage</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Cookies help Udyam Mittar stay signed-in for verified users, remember search
                filters, measure site performance, and improve how buyers discover running
                businesses in Chandigarh, Mohali and Panchkula. We aim to use only what we need and
                give you clear control where possible.
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                You can manage non-essential cookies through your browser settings at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900 lg:text-3xl">
            Cookie categories
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {COOKIE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className={`rounded-2xl border bg-white p-6 shadow-sm ${
                    category.essential ? 'border-brand-300' : 'border-slate-200'
                  }`}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <span
                      className={`rounded-lg p-2.5 text-white ${
                        category.essential ? 'bg-brand-gradient' : 'bg-amber-400'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
                        {category.essential && (
                          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800">
                            Essential
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{category.purpose}</p>
                      <p className="mt-1 text-xs text-slate-500">Duration: {category.duration}</p>
                    </div>
                  </div>

                  <h4 className="mb-2 text-sm font-bold text-slate-800">Examples</h4>
                  <ul className="space-y-2">
                    {category.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2 text-sm text-slate-600">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                        {example}
                      </li>
                    ))}
                  </ul>

                  {category.essential && (
                    <p className="mt-4 flex items-start gap-2 border-t border-brand-100 pt-4 text-xs text-brand-800">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      These cookies cannot be turned off because the platform needs them to work
                      securely.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Manage */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900 lg:text-3xl">
            Manage your preferences
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {MANAGE_OPTIONS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex rounded-lg bg-brand-50 p-2.5 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-2xl bg-brand-gradient p-8 text-white lg:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold">Questions about cookies?</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-100">
                If you have questions about this Cookie Policy or how we handle tracking on Udyam
                Mittar, contact our support team. We review this policy as our platform and
                regulations evolve.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-brand-50">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-200" />
                  Clear categories and purposes
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-200" />
                  Essential cookies kept to a minimum
                </li>
              </ul>
              <Link
                to="/privacy-policy"
                className="mt-6 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Also read our Privacy Policy
              </Link>
            </div>

            <div className="rounded-xl bg-white/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Mail className="h-5 w-5 text-brand-200" />
                Contact
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-brand-200">Privacy support</div>
                  <a
                    href="mailto:privacy@udyammittar.com"
                    className="font-semibold text-white hover:underline"
                  >
                    privacy@udyammittar.com
                  </a>
                </div>
                <div>
                  <div className="text-brand-200">Phone</div>
                  <a href="tel:+919876543210" className="font-semibold text-white hover:underline">
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <div className="text-brand-200">General support</div>
                  <a
                    href="mailto:support@udyammittar.com"
                    className="font-semibold text-white hover:underline"
                  >
                    support@udyammittar.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updates */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex items-start gap-4">
            <span className="shrink-0 rounded-lg bg-slate-100 p-2.5 text-slate-700">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Policy updates</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We may update this Cookie Policy when our tools, partners or legal requirements
                change. The “Last updated” date at the top will always reflect the latest version.
                Continued use of Udyam Mittar after updates means you accept the revised policy.
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-brand-700" />
                Prefer a call? Reach us on the support number above during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
