import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  FileText,
  ShieldCheck,
  CheckCircle,
  Info,
  Store,
  Link2,
  Scale,
  Mail,
} from 'lucide-react';

const SECTIONS = [
  {
    icon: Info,
    title: '1. General Information',
    content:
      'The information on the Udyam Mittar website and platform is for general information only. While we work to keep content current and useful, we make no representations or warranties — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the website, listings, services, or related materials for any purpose.',
  },
  {
    icon: Store,
    title: '2. Business Listing Information',
    content:
      'All business listings, descriptions, prices, financial figures, and images are provided by sellers or third parties. Udyam Mittar does not guarantee the accuracy, completeness, or timeliness of any listing information. Details such as asking price, monthly sales/profit figures, availability, specifications, and images may change without notice.',
    points: [
      'Asking prices are indicative and subject to negotiation',
      'Business availability may change without prior notice',
      'Images and descriptions are for reference only',
      'Independent due diligence and site visits are strongly recommended before any deal',
    ],
  },
  {
    icon: AlertCircle,
    title: '3. No Warranty',
    content:
      'Udyam Mittar makes no warranty, express or implied, regarding the businesses listed on our platform, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, secure, or error-free.',
  },
  {
    icon: Scale,
    title: '4. Limitation of Liability',
    content:
      'To the fullest extent permitted by law, Udyam Mittar, its directors, employees, or agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — the website or services, even if we have been advised of the possibility of such damages. Buyers and sellers are responsible for their own commercial, legal, and financial decisions.',
  },
  {
    icon: Link2,
    title: '5. Third-Party Links',
    content:
      'Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over their content and accept no responsibility for them or for any loss or damage that may arise from your use of them.',
  },
  {
    icon: ShieldCheck,
    title: '6. Platform Role',
    content:
      'Udyam Mittar is a business exchange platform that helps connect local buyers and sellers in Tricity. We are not a party to any sale, lease, or transfer agreement unless expressly stated in writing. Verification of listings does not replace professional legal, financial, or technical advice.',
  },
];

export const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Disclaimer | Udyam Mittar</title>
        <meta
          name="description"
          content="Read Udyam Mittar's legal disclaimer. Important information about business listings, pricing, availability, and use of our Tricity business exchange platform."
        />
        <meta
          name="keywords"
          content="disclaimer, Udyam Mittar disclaimer, business listing disclaimer, liability, Tricity"
        />
        <link rel="canonical" href="https://udyammittar.com/disclaimer" />
        <meta property="og:title" content="Disclaimer | Udyam Mittar" />
        <meta
          property="og:description"
          content="Important legal information about using Udyam Mittar."
        />
        <meta property="og:url" content="https://udyammittar.com/disclaimer" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <AlertCircle className="h-4 w-4" />
            Legal disclaimer
          </span>
          <h1 className="mt-5 text-4xl font-extrabold lg:text-5xl">Disclaimer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
            Important legal information about using the Udyam Mittar platform and business listings
            in Chandigarh, Mohali and Panchkula.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-brand-100">
            <FileText className="h-4 w-4" />
            Last updated: July 29, 2026
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-14">
        <div className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <span className="shrink-0 rounded-lg bg-brand-gradient p-2.5 text-white">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Important notice</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Please read this disclaimer carefully before using Udyam Mittar. By accessing and
                using our platform, you acknowledge that you have read, understood, and agree to be
                bound by these terms. Also review our{' '}
                <Link to="/terms-of-service" className="font-semibold text-brand-800 underline-offset-2 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="font-semibold text-brand-800 underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {SECTIONS.map(({ icon: Icon, title, content, points }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
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

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex items-start gap-4">
            <span className="shrink-0 rounded-lg bg-brand-50 p-2.5 text-brand-700">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Questions about this disclaimer?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Contact us at{' '}
                <a
                  href="mailto:legal@udyammittar.com"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  legal@udyammittar.com
                </a>{' '}
                or call{' '}
                <a href="tel:+919876543210" className="font-semibold text-brand-700 hover:underline">
                  +91 98765 43210
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
