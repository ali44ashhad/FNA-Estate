import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Users,
  Store,
  FileText,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Globe,
} from 'lucide-react';

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: '1. Our Commitment',
    content:
      'Udyam Mittar is committed to protecting the personal information of buyers and sellers who use our Tricity business exchange platform. We handle data carefully under applicable Indian laws, including the Information Technology Act, 2000 and related rules, and we aim to collect only what we need to run the service.',
    points: [
      'We do not sell your personal data',
      'Access to account and enquiry data is limited to authorised use',
      'You can contact us to ask about or update your information',
      'See also our Cookie Policy and GDPR page for related details',
    ],
  },
  {
    icon: Database,
    title: '2. Information We Collect',
    content:
      'Depending on how you use Udyam Mittar, we may collect:',
    categories: [
      {
        title: 'Account & contact',
        items: [
          'Name, email and phone number',
          'Role (user / seller / admin)',
          'Login and authentication details',
          'Messages and enquiry form submissions',
        ],
      },
      {
        title: 'Business listing data',
        items: [
          'Business title, category and location',
          'Asking price and listing description',
          'Images and other media you upload',
          'Optional business details provided by sellers',
        ],
      },
      {
        title: 'Technical & usage',
        items: [
          'IP address and device/browser type',
          'Pages visited and search filters used',
          'Cookies and similar technologies',
          'Basic logs for security and troubleshooting',
        ],
      },
    ],
  },
  {
    icon: Store,
    title: '3. How We Use Information',
    content: 'We use personal data to:',
    points: [
      'Create and manage user accounts',
      'Publish and manage business listings',
      'Connect buyers and sellers through enquiries',
      'Improve search, filters and platform performance',
      'Send service-related notices (and marketing only where allowed)',
      'Prevent fraud, abuse and security incidents',
      'Comply with legal obligations',
    ],
  },
  {
    icon: Users,
    title: '4. Sharing With Others',
    content:
      'We share data only when needed to operate the platform or when required by law. Typical cases include:',
    points: [
      'Sellers receiving buyer enquiry details you submit',
      'Service providers who host or help run the platform (under confidentiality)',
      'Lending or legal partners you ask us to introduce you to',
      'Authorities when disclosure is legally required',
    ],
  },
  {
    icon: Lock,
    title: '5. Security',
    content:
      'We use reasonable technical and organisational measures to protect personal data, such as HTTPS in transit, access controls for admin tools, and careful handling of credentials. No online service can guarantee absolute security; please keep your password private and tell us if you suspect unauthorised access.',
  },
  {
    icon: Eye,
    title: '6. Your Rights',
    content: 'Subject to applicable law, you may request to:',
    points: [
      'Access the personal data we hold about you',
      'Correct inaccurate information',
      'Delete your account or certain data (where we are not required to keep it)',
      'Withdraw consent for optional processing such as marketing',
      'Ask questions about how your data is used',
    ],
  },
  {
    icon: Globe,
    title: '7. Location of Processing',
    content:
      'Udyam Mittar primarily serves users in Chandigarh, Mohali, Panchkula and nearby areas. Data is typically processed in India. If tools or hosting providers process data in other regions, we expect appropriate safeguards consistent with our privacy commitments.',
  },
  {
    icon: FileText,
    title: '8. Data Retention',
    content:
      'We keep information only as long as needed for the purposes above, including account operation, dispute handling and legal retention needs. When data is no longer required, we delete or anonymise it where practical.',
    points: [
      'Active account data: while your account remains open',
      'Enquiry records: for a reasonable period to support deals and disputes',
      'Listing archives: as needed for platform integrity and legal compliance',
      'Marketing preferences: until you opt out or withdraw consent',
    ],
  },
  {
    icon: AlertCircle,
    title: '9. Breach Response',
    content:
      'If we become aware of a personal data incident that creates a significant risk to users, we will investigate promptly and notify affected users and authorities where required by law.',
  },
];

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Privacy Policy | Udyam Mittar</title>
        <meta
          name="description"
          content="Read how Udyam Mittar collects, uses and protects personal data for buyers and sellers on our Tricity business exchange platform."
        />
        <meta
          name="keywords"
          content="privacy policy, Udyam Mittar privacy, data protection, personal data, Tricity business platform"
        />
        <link rel="canonical" href="https://udyammittar.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Udyam Mittar" />
        <meta
          property="og:description"
          content="How Udyam Mittar protects buyer and seller personal data."
        />
        <meta property="og:url" content="https://udyammittar.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
            <Lock className="h-4 w-4" />
            Privacy & data protection
          </span>
          <h1 className="mt-5 text-4xl font-extrabold lg:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
            How Udyam Mittar collects, uses and protects information when you browse listings,
            create an account, list a business or send an enquiry.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-100">
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Last updated: July 29, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              We do not sell personal data
            </span>
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
                By using Udyam Mittar, you agree to this Privacy Policy. For cookies and tracking,
                also read our{' '}
                <Link
                  to="/cookie-policy"
                  className="font-semibold text-brand-800 underline-offset-2 hover:underline"
                >
                  Cookie Policy
                </Link>
                . GDPR-related rights for covered users are summarised on our{' '}
                <Link
                  to="/gdpr"
                  className="font-semibold text-brand-800 underline-offset-2 hover:underline"
                >
                  GDPR page
                </Link>
                .
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                We never sell your personal data to third parties for their marketing.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {SECTIONS.map(({ icon: Icon, title, content, points, categories }) => (
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

                  {categories && (
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      {categories.map((category) => (
                        <div key={category.title} className="rounded-xl bg-slate-50 p-4">
                          <h4 className="mb-3 text-sm font-bold text-slate-900">
                            {category.title}
                          </h4>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-xs text-slate-700"
                              >
                                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-brand-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-brand-gradient p-8 text-white lg:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold">Privacy requests</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100">
                To access, correct or delete your data — or ask a privacy question — contact us.
                We aim to respond within a reasonable time.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-brand-50">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-200" />
                  Account and enquiry support
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-200" />
                  Confidential handling of requests
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/10 p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Mail className="h-5 w-5 text-brand-200" />
                Contact
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-brand-200">Privacy email</div>
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
                  <div className="text-brand-200">Service area</div>
                  <div className="text-brand-50">
                    Chandigarh, Mohali, Panchkula & nearby Tricity markets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex items-start gap-4">
            <span className="shrink-0 rounded-lg bg-slate-100 p-2.5 text-slate-700">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Policy updates</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We may update this Privacy Policy when our practices or legal requirements change.
                The “Last updated” date above will always show the current version. Continued use of
                Udyam Mittar after an update means you accept the revised policy. You may withdraw
                optional consents (such as marketing) at any time by contacting us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
