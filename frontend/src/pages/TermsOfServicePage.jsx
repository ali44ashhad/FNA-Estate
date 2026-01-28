import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileText,
  AlertCircle,
  Globe,
  Scale,
  Lock,
  UserCheck,
  RefreshCw,
  Mail,
  Phone,
  Home,
  ChevronRight,
  Award,
  CheckCircle
} from 'lucide-react';

export const TermsOfServicePage = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Agreement to Terms",
      content: "By accessing and using FNAEstate, you accept and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and FNAEstate Technologies Private Limited. If you do not agree with any part of these terms, you may not access our services.",
      highlight: true
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "2. Premium Services License",
      content: "FNAEstate grants you a limited, non-exclusive, non-transferable, revocable license to access and use our premium real estate services for personal, non-commercial purposes. This license specifically prohibits:",
      points: [
        "Commercial use or resale of our services",
        "Reverse engineering or decompiling our platform",
        "Data scraping, mining, or extraction",
        "Unauthorized access to our systems",
        "Violation of RERA or other real estate regulations"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "3. Account Registration & Verification",
      content: "To access premium features, you must create an account with accurate and complete information. We reserve the right to verify your identity through KYC procedures. Premium accounts require additional verification for property listing and investment features.",
      highlight: false
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "4. Premium Property Listings",
      content: "All property listings undergo our 25-point verification process. Sellers must provide accurate information and necessary documentation. FNAEstate acts as a technology platform and does not guarantee property conditions or ownership titles.",
      points: [
        "Listings must comply with RERA regulations",
        "Accurate pricing and property details required",
        "Professional photography standards apply",
        "Disclosure of any property disputes mandatory"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "5. Disclaimer & Limitations",
      content: "Our services are provided 'as is' without warranties of any kind. FNAEstate is not liable for property transactions between users. We recommend independent legal and property verification before any transaction.",
      highlight: true
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "6. Intellectual Property Rights",
      content: "All content, logos, trademarks, and proprietary technology on FNAEstate are owned by FNAEstate Technologies Private Limited. Unauthorized use of our intellectual property is strictly prohibited.",
      highlight: false
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "7. Data Privacy & Security",
      content: "We adhere to strict data protection standards in compliance with Indian data privacy laws. Your personal information is protected by enterprise-grade security measures. Refer to our Privacy Policy for detailed information.",
      highlight: true
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "8. Modifications & Updates",
      content: "We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms. Major changes will be notified via email or platform notifications.",
      highlight: false
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "9. Premium Subscription Terms",
      content: "Premium subscription services are billed according to selected plans. We offer a 7-day satisfaction guarantee for new subscriptions. Cancellations must be made at least 24 hours before renewal.",
      points: [
        "Auto-renewal for premium subscriptions",
        "No refunds for partial periods",
        "Subscription plans are non-transferable",
        "Enterprise plans require custom agreements"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "10. Governing Law & Dispute Resolution",
      content: "These terms are governed by Indian law. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra. We encourage dispute resolution through mediation before legal proceedings.",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Terms of Service | FNAEstate - Terms & Conditions</title>
        <meta name="description" content="Read FNAEstate's terms of service and conditions. Understand your rights and obligations when using our premium real estate platform. Legal terms and user agreement." />
        <meta name="keywords" content="terms of service, terms and conditions, user agreement, legal terms, platform terms, service agreement" />
        <link rel="canonical" href="https://fnaestate.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service | FNAEstate" />
        <meta property="og:description" content="Read FNAEstate's terms of service and user agreement." />
        <meta property="og:url" content="https://fnaestate.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">LEGAL DOCUMENTATION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              FNAEstate Technologies Private Limited - Governing the use of our premium real estate platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="w-4 h-4" />
                <span>Last updated: December 26, 2025</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4" />
                <span>RERA Compliant: A123456789</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>
          
          {/* Quick Nav */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/privacy-policy" className="flex border border-slate-700 items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Privacy Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
            </Link>
            <Link to="/cookie-policy" className="flex items-center border border-slate-700 justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Cookie Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
            </Link>
            <Link to="/disclaimer" className="flex items-center border border-slate-700 justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Disclaimer</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900">Important Notice</h2>
          </div>
          <p className="text-slate-700 mb-4">
            These Terms of Service govern your use of FNAEstate's premium real estate platform. 
            By accessing our services, you acknowledge that you have read, understood, and agree to 
            be bound by these terms. These terms constitute a legal agreement between you and 
            FNAEstate Technologies Private Limited.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <AlertCircle className="w-4 h-4" />
            <span>For investment properties exceeding ₹5 crore, additional due diligence is recommended.</span>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border ${section.highlight ? 'border-amber-200' : 'border-slate-200'} p-8 shadow-sm hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 `}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{section.title}</h3>
                  <p className="text-slate-700 mb-4">{section.content}</p>
                  
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
              
              {section.highlight && (
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <div className="flex items-center gap-2 text-sm text-amber-700 font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>Important: This section contains critical legal information.</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Legal Inquiries</h3>
              <p className="text-slate-300 mb-6">
                For legal questions or clarifications regarding our Terms of Service, 
                please contact our legal department. We respond to all legal inquiries 
                within 2-3 business days.
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Award className="w-4 h-4" />
                <span>All communications are confidential and protected by attorney-client privilege.</span>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                Contact Legal Department
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Email</div>
                  <a href="mailto:legal@FNAEstate.com" className="text-amber-400 hover:text-amber-300 font-medium">
                    legal@FNAEstate.com
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Phone</div>
                  <a href="tel:+919876543210" className="text-amber-400 hover:text-amber-300 font-medium">
                    +91 98765 43210 (Legal Dept.)
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Registered Address</div>
                  <div className="text-slate-300">
                    Level 42, One World Trade<br />
                    Mumbai, Maharashtra 400001<br />
                    CIN: U74999MH2025PTC123456
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-full px-8 py-4">
            <CheckCircle className="w-6 h-6 text-amber-600" />
            <div className="text-left">
              <p className="font-bold text-slate-900">By using FNAEstate, you acknowledge and accept these Terms of Service.</p>
              <p className="text-sm text-slate-600">Last updated: December 26, 2025 • Version 3.1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};