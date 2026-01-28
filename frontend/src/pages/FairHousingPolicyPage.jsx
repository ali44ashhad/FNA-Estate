import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  CheckCircle,
  FileText,
  Users,
  Shield,
  Heart,
  AlertCircle
} from 'lucide-react';

export const FairHousingPolicyPage = () => {
  const sections = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "1. Our Commitment to Fair Housing",
      content: "PremiumEstate is committed to providing equal housing opportunities to all individuals regardless of race, color, religion, sex, national origin, familial status, disability, or any other protected characteristic. We strictly adhere to fair housing laws and regulations.",
      highlight: true,
      points: [
        "Equal opportunity for all clients",
        "No discrimination in property listings",
        "Fair treatment in all transactions",
        "Compliance with fair housing laws"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "2. Protected Classes",
      content: "We do not discriminate based on the following protected characteristics:",
      points: [
        "Race or color",
        "Religion",
        "National origin",
        "Sex or gender",
        "Familial status (presence of children)",
        "Disability",
        "Age (where applicable)",
        "Marital status"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "3. Our Practices",
      content: "PremiumEstate ensures fair housing through:",
      points: [
        "Equal access to all property listings",
        "Non-discriminatory advertising practices",
        "Fair treatment in all interactions",
        "Reasonable accommodations for disabilities",
        "Training for all staff on fair housing laws"
      ]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "4. Reporting Discrimination",
      content: "If you believe you have been discriminated against, please contact us immediately. We take all complaints seriously and will investigate promptly.",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Fair Housing Policy | FNAEstate - Equal Housing Opportunity</title>
        <meta name="description" content="Read FNAEstate's fair housing policy. We are committed to equal housing opportunities for all, with no discrimination based on race, religion, gender, or any protected characteristic." />
        <meta name="keywords" content="fair housing policy, equal housing opportunity, housing discrimination, fair housing rights, housing equality" />
        <link rel="canonical" href="https://fnaestate.com/fair-housing" />
        <meta property="og:title" content="Fair Housing Policy | FNAEstate" />
        <meta property="og:description" content="Read FNAEstate's fair housing policy and commitment to equal opportunity." />
        <meta property="og:url" content="https://fnaestate.com/fair-housing" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <Scale className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">FAIR HOUSING POLICY</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                Fair Housing Policy
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Our commitment to equal housing opportunities for all
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
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Equal Opportunity</h3>
              <p className="text-slate-700">
                PremiumEstate is committed to fair housing and equal opportunity. We provide equal access to all property listings and services regardless of protected characteristics.
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
          <h3 className="text-3xl font-bold mb-4">Report Discrimination</h3>
          <p className="text-slate-300 mb-6">
            If you experience or witness discrimination, please contact us:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Email: fairhousing@premiumestate.com</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Phone: +91 98765 43211</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
