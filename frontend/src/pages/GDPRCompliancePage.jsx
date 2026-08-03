import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  FileText,
  Globe,
  Lock,
  Users,
  Mail,
  Phone,
} from 'lucide-react';

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: '1. GDPR Compliance Overview',
    content:
      'Udyam Mittar is committed to protecting personal data in line with the General Data Protection Regulation (GDPR) for users who are in the European Economic Area (EEA) or otherwise covered by GDPR. We apply careful handling to account data, enquiries, and listing-related information on our Tricity business exchange platform.',
    points: [
      'GDPR-aligned processing for covered individuals',
      'Clear purposes for collecting buyer and seller data',
      'Transparent practices described in our Privacy Policy',
      'Support channel for data-protection requests',
    ],
  },
  {
    icon: Users,
    title: '2. Your Rights Under GDPR',
    content: 'If GDPR applies to you, you may have rights including:',
    points: [
      'Right to access your personal data',
      'Right to rectification of inaccurate data',
      'Right to erasure (“right to be forgotten”), subject to legal limits',
      'Right to restrict processing',
      'Right to data portability',
      'Right to object to certain processing',
      'Right to withdraw consent where processing is consent-based',
    ],
  },
  {
    icon: Lock,
    title: '3. Legal Bases for Processing',
    content: 'Depending on the activity, we may process personal data on bases such as:',
    points: [
      'Consent — when you clearly agree to a specific use',
      'Contract — to provide accounts, listings, and enquiry services you request',
      'Legal obligation — where law requires us to retain or share information',
      'Legitimate interests — for security, fraud prevention, and improving the platform, balanced against your rights',
    ],
  },
  {
    icon: Globe,
    title: '4. International Data Transfers',
    content:
      'Udyam Mittar primarily operates for users in India (Chandigarh, Mohali, Panchkula and nearby areas). If personal data of GDPR-covered individuals is processed or stored outside the EEA, we take appropriate steps to protect it, which may include contractual safeguards where required.',
  },
  {
    icon: FileText,
    title: '5. Data Breach Notification',
    content:
      'If a personal data breach occurs that is likely to result in a risk to individuals’ rights and freedoms, we will assess the incident and, where GDPR requires, notify the relevant supervisory authority and affected individuals without undue delay.',
  },
];

export const GDPRCompliancePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>GDPR Compliance | Udyam Mittar</title>
        <meta
          name="description"
          content="Learn how Udyam Mittar approaches GDPR compliance for covered users — your rights, legal bases for processing, transfers, and how to contact us about data protection."
        />
        <meta
          name="keywords"
          content="GDPR, data protection, Udyam Mittar privacy, EU data rights, personal data"
        />
        <link rel="canonical" href="https://udyammittar.com/gdpr" />
        <meta property="og:title" content="GDPR Compliance | Udyam Mittar" />
        <meta
          property="og:description"
          content="Udyam Mittar's approach to GDPR and data protection rights."
        />
        <meta property="og:url" content="https://udyammittar.com/gdpr" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Data protection
          </span>
          <h1 className="mt-5 text-4xl font-extrabold lg:text-5xl">GDPR Compliance</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
            How Udyam Mittar approaches GDPR rights and personal data protection for covered users
            of our business exchange platform.
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
              <h2 className="text-xl font-bold text-slate-900">Our commitment</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Udyam Mittar takes privacy seriously for buyers and sellers using our platform. For
                full details on what we collect and why, please also read our{' '}
                <Link
                  to="/privacy-policy"
                  className="font-semibold text-brand-800 underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  to="/cookie-policy"
                  className="font-semibold text-brand-800 underline-offset-2 hover:underline"
                >
                  Cookie Policy
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

        <div className="mt-8 rounded-2xl bg-brand-gradient p-8 text-white lg:p-10">
          <h3 className="text-2xl font-extrabold">Privacy & data requests</h3>
          <p className="mt-3 text-sm text-brand-100">
            To exercise GDPR rights (where applicable) or ask about how we handle personal data,
            contact us:
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <a
              href="mailto:privacy@udyammittar.com"
              className="flex items-center gap-3 font-semibold hover:underline"
            >
              <Mail className="h-4 w-4 text-brand-200" />
              privacy@udyammittar.com
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 font-semibold hover:underline"
            >
              <Phone className="h-4 w-4 text-brand-200" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
