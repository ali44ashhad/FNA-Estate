import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  AlertCircle,
  FileText,
  Shield,
  CheckCircle,
  Info
} from 'lucide-react';

export const DisclaimerPage = () => {
  const sections = [
    {
      icon: <Info className="w-6 h-6" />,
      title: "1. General Information",
      content: "The information contained on PremiumEstate website and platform is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.",
      highlight: true
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "2. Property Information",
      content: "All property listings, descriptions, prices, and images are provided by sellers or third parties. PremiumEstate does not guarantee the accuracy, completeness, or timeliness of any property information. Property details, including but not limited to prices, availability, specifications, and images, are subject to change without notice.",
      highlight: true,
      points: [
        "Property prices are indicative and subject to negotiation",
        "Property availability may change without prior notice",
        "Images and descriptions are for reference only",
        "Physical inspection is recommended before purchase"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "3. No Warranty",
      content: "PremiumEstate makes no warranty, express or implied, regarding the properties listed on our platform, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, secure, or error-free.",
      highlight: false
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "4. Limitation of Liability",
      content: "In no event shall PremiumEstate, its directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the website or services, even if we have been advised of the possibility of such damages.",
      highlight: true
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "5. Third-Party Links",
      content: "Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Disclaimer | FNAEstate - Legal Disclaimer</title>
        <meta name="description" content="Read FNAEstate's legal disclaimer. Important information about property listings, pricing, availability, and platform usage. Understand limitations and responsibilities." />
        <meta name="keywords" content="disclaimer, legal disclaimer, property disclaimer, terms disclaimer, liability disclaimer" />
        <link rel="canonical" href="https://fnaestate.com/disclaimer" />
        <meta property="og:title" content="Disclaimer | FNAEstate" />
        <meta property="og:description" content="Read FNAEstate's legal disclaimer and important information." />
        <meta property="og:url" content="https://fnaestate.com/disclaimer" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">LEGAL DISCLAIMER</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                Disclaimer
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Important legal information regarding the use of PremiumEstate platform and services
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
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Important Notice</h3>
              <p className="text-slate-700">
                Please read this disclaimer carefully before using PremiumEstate services. By accessing and using our platform, you acknowledge that you have read, understood, and agree to be bound by the terms of this disclaimer.
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

        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Contact for Clarifications</h4>
              <p className="text-slate-700 mb-4">
                If you have any questions about this disclaimer, please contact us at legal@premiumestate.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
