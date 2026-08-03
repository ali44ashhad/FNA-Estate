import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Scale,
  CheckCircle,
  FileText,
  Users,
  ShieldCheck,
  Heart,
  AlertCircle,
  Mail,
  Phone,
} from 'lucide-react';

const SECTIONS = [
  {
    icon: Scale,
    title: '1. Our Commitment to Equal Opportunity',
    content:
      'Udyam Mittar is committed to providing equal access to our business exchange platform for all buyers and sellers — regardless of race, colour, religion, sex, gender identity, national origin, caste, disability, age, marital status, or any other characteristic protected by applicable law. We do not tolerate discrimination in listings, enquiries, or support.',
    points: [
      'Equal opportunity for all buyers and sellers',
      'No discrimination in business listings or search results',
      'Fair treatment in enquiries and deal support',
      'Compliance with applicable anti-discrimination laws in India',
    ],
  },
  {
    icon: Users,
    title: '2. Protected Characteristics',
    content: 'We do not discriminate based on characteristics including, but not limited to:',
    points: [
      'Race, colour, or ethnicity',
      'Religion or belief',
      'Caste or community',
      'Sex, gender, or gender identity',
      'National origin or citizenship status (where legally permitted to transact)',
      'Disability',
      'Age (where applicable)',
      'Marital or family status',
    ],
  },
  {
    icon: ShieldCheck,
    title: '3. Our Practices',
    content: 'Udyam Mittar promotes fair access through:',
    points: [
      'Equal access to verified business listings across Tricity',
      'Non-discriminatory advertising and category filters',
      'Respectful treatment in all buyer–seller interactions we facilitate',
      'Reasonable accommodations where feasible for users with disabilities',
      'Clear reporting channels for discrimination concerns',
    ],
  },
  {
    icon: Heart,
    title: '4. Seller & Listing Expectations',
    content:
      'Sellers listing on Udyam Mittar must not include discriminatory language or conditions in titles, descriptions, or communications. Listings that unlawfully exclude buyers based on protected characteristics may be removed, and related accounts may be restricted.',
  },
  {
    icon: AlertCircle,
    title: '5. Reporting Discrimination',
    content:
      'If you believe you have been discriminated against on our platform — or you see discriminatory content in a listing — please contact us immediately. We take complaints seriously and will review them promptly.',
  },
];

export const FairHousingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Equal Opportunity Policy | Udyam Mittar</title>
        <meta
          name="description"
          content="Udyam Mittar's equal opportunity policy. We provide fair access to our Tricity business exchange for all buyers and sellers, with zero tolerance for discrimination."
        />
        <meta
          name="keywords"
          content="equal opportunity, non-discrimination, fair access, Udyam Mittar policy, business listing fairness"
        />
        <link rel="canonical" href="https://udyammittar.com/fair-housing" />
        <meta property="og:title" content="Equal Opportunity Policy | Udyam Mittar" />
        <meta
          property="og:description"
          content="Our commitment to equal opportunity for all buyers and sellers on Udyam Mittar."
        />
        <meta property="og:url" content="https://udyammittar.com/fair-housing" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <Scale className="h-4 w-4" />
            Equal opportunity
          </span>
          <h1 className="mt-5 text-4xl font-extrabold lg:text-5xl">
            Equal Opportunity Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
            Fair access for every buyer and seller on Udyam Mittar — Tricity&apos;s business exchange
            platform.
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
              <CheckCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Fair access for everyone</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Udyam Mittar is committed to equal opportunity. We provide fair access to business
                listings and platform services regardless of protected characteristics. This page
                replaces the older “fair housing” framing used when the product was property-focused
                — our rules now apply to business buyers and sellers across Chandigarh, Mohali and
                Panchkula.
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

        <div className="mt-8 rounded-2xl bg-brand-gradient p-8 text-white lg:p-10">
          <h3 className="text-2xl font-extrabold">Report discrimination</h3>
          <p className="mt-3 text-sm text-brand-100">
            If you experience or witness discrimination on Udyam Mittar, contact us:
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <a
              href="mailto:fairaccess@udyammittar.com"
              className="flex items-center gap-3 font-semibold hover:underline"
            >
              <Mail className="h-4 w-4 text-brand-200" />
              fairaccess@udyammittar.com
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 font-semibold hover:underline"
            >
              <Phone className="h-4 w-4 text-brand-200" />
              +91 98765 43210
            </a>
          </div>
          <p className="mt-6 text-sm text-brand-100">
            Also see our{' '}
            <Link to="/terms-of-service" className="font-semibold text-white underline-offset-2 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/disclaimer" className="font-semibold text-white underline-offset-2 hover:underline">
              Disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
