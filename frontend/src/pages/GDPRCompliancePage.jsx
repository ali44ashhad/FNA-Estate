import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Shield,
  CheckCircle,
  FileText,
  Globe,
  Lock,
  Users,
  AlertCircle
} from 'lucide-react';

export const GDPRCompliancePage = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "1. GDPR Compliance Overview",
      content: "PremiumEstate is committed to compliance with the General Data Protection Regulation (GDPR) for our NRI and international clients. We implement robust data protection measures to safeguard personal data of EU residents and ensure their rights are fully protected.",
      highlight: true,
      points: [
        "GDPR-compliant data processing for EU residents",
        "Data Protection Officer (DPO) appointed",
        "Regular compliance audits and assessments",
        "Transparent data processing practices"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "2. Your Rights Under GDPR",
      content: "As an EU resident using our services, you have the following rights:",
      points: [
        "Right to access your personal data",
        "Right to rectification of inaccurate data",
        "Right to erasure ('right to be forgotten')",
        "Right to restrict processing",
        "Right to data portability",
        "Right to object to processing",
        "Right to withdraw consent at any time"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "3. Data Processing Legal Basis",
      content: "We process your personal data based on the following legal grounds under GDPR:",
      points: [
        "Consent: When you explicitly consent to data processing",
        "Contract: To fulfill our contractual obligations",
        "Legal obligation: To comply with applicable laws",
        "Legitimate interests: For business operations and service improvement"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "4. International Data Transfers",
      content: "For our NRI and international clients, data may be transferred outside the EU. We ensure adequate safeguards are in place, including Standard Contractual Clauses (SCCs) and other approved mechanisms.",
      highlight: true
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "5. Data Breach Notification",
      content: "In the event of a data breach affecting EU residents, we will notify the relevant supervisory authority within 72 hours and affected individuals without undue delay, as required by GDPR.",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>GDPR Compliance | FNAEstate - Data Protection for EU Residents</title>
        <meta name="description" content="Learn about FNAEstate's GDPR compliance for EU residents. Understand your data protection rights, how we process your data, and our commitment to GDPR standards." />
        <meta name="keywords" content="GDPR compliance, data protection, EU data rights, GDPR rights, data privacy EU, GDPR policy" />
        <link rel="canonical" href="https://fnaestate.com/gdpr" />
        <meta property="og:title" content="GDPR Compliance | FNAEstate" />
        <meta property="og:description" content="Learn about FNAEstate's GDPR compliance and data protection for EU residents." />
        <meta property="og:url" content="https://fnaestate.com/gdpr" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">GDPR COMPLIANCE</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                GDPR Compliance
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Our commitment to protecting the data rights of EU residents and international clients
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
              <FileText className="w-4 h-4" />
              <span>Last updated: December 26, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-12 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">GDPR Compliant</h3>
              <p className="text-slate-700">
                PremiumEstate is fully committed to GDPR compliance for our NRI and international clients. We have implemented comprehensive data protection measures and appointed a Data Protection Officer to ensure your rights are protected.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border ${section.highlight ? 'border-amber-200' : 'border-slate-200'} p-8 shadow-sm hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{section.title}</h3>
                  <p className="text-slate-700 mb-6">{section.content}</p>
                  
                  {section.points && (
                    <ul className="space-y-3 mt-4">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
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

        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
          <h3 className="text-3xl font-bold mb-4">Data Protection Officer</h3>
          <p className="text-slate-300 mb-6">
            For GDPR-related inquiries or to exercise your rights, contact our Data Protection Officer:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>Email: dpo@premiumestate.com</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>Phone: +91 98765 43211</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
