import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Building2,
  FileText,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Award,
  Globe,
  Cpu
} from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "1. Data Protection Commitment",
      content: "FNAEstate Technologies Private Limited is committed to protecting your privacy and personal data in accordance with the Information Technology Act, 2000 and other applicable Indian data protection laws. We implement enterprise-grade security measures to safeguard your information.",
      highlight: true,
      points: [
        "ISO 27001:2013 certified security protocols",
        "Regular security audits and penetration testing",
        "GDPR-compliant data handling for international clients",
        "RERA-mandated data protection standards"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "2. Information We Collect",
      content: "We collect information necessary to provide premium real estate services while maintaining the highest privacy standards. Our data collection includes:",
      categories: [
        {
          title: "Personal Identification",
          items: ["Full Name", "PAN Card Number (for transactions)", "Aadhaar Number (KYC verification)", "Contact Details", "Professional Information"]
        },
        {
          title: "Property & Financial Data",
          items: ["Property Ownership Documents", "Financial Capability Proof", "Transaction History", "Investment Preferences", "Credit Score (with consent)"]
        },
        {
          title: "Technical & Usage Data",
          items: ["IP Address & Device Information", "Location Data (with consent)", "Platform Usage Patterns", "Communication Records", "Verification Documents"]
        }
      ]
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "3. AI & Data Processing",
      content: "We use artificial intelligence to enhance your real estate experience. Our AI systems process data to provide personalized property recommendations, market insights, and investment analytics while maintaining strict privacy controls.",
      highlight: false,
      points: [
        "AI-driven property matching algorithms",
        "Predictive market trend analysis",
        "Automated document verification",
        "Behavioral pattern analysis for service improvement"
      ]
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "4. Property Data Handling",
      content: "Property information undergoes our 25-point verification process. We collect and process property data with utmost confidentiality and in compliance with RERA regulations.",
      highlight: true,
      points: [
        "Property documents encrypted at rest and in transit",
        "Access limited to verified professionals",
        "Regular audit trails for document access",
        "Secure storage with 99.99% availability"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "5. Third-Party Sharing",
      content: "We share data only with verified partners under strict contractual obligations. Data sharing occurs in these specific scenarios:",
      points: [
        "Banks & Financial Institutions (for loan processing)",
        "Legal Authorities (as required by Indian law)",
        "Verification Agencies (KYC/AML compliance)",
        "Service Partners (with your explicit consent)",
        "Government Authorities (RERA, Income Tax)"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "6. Security Measures",
      content: "We employ military-grade security measures to protect your data throughout its lifecycle.",
      highlight: true,
      categories: [
        {
          title: "Technical Security",
          items: ["AES-256 Encryption", "SSL/TLS 1.3 Protocols", "Multi-factor Authentication", "Regular Security Audits", "DDoS Protection"]
        },
        {
          title: "Physical Security",
          items: ["Tier IV Data Centers", "Biometric Access Controls", "24/7 Surveillance", "Redundant Power Supply", "Fire Suppression Systems"]
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "7. Your Rights",
      content: "As a user, you have specific rights regarding your personal data under Indian law:",
      points: [
        "Right to access your personal information",
        "Right to rectification of inaccurate data",
        "Right to erasure ('right to be forgotten')",
        "Right to data portability",
        "Right to restrict processing",
        "Right to object to processing",
        "Right to withdraw consent"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "8. International Data Transfers",
      content: "For our NRI clients, data may be transferred internationally under strict safeguards. We ensure compliance with international data protection standards and maintain data localization for Indian residents.",
      highlight: true
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "9. Data Retention",
      content: "We retain data only as long as necessary for legal, operational, or business purposes. Standard retention periods:",
      points: [
        "Account Information: 7 years post-account closure",
        "Transaction Records: 10 years (as per Indian law)",
        "Property Documents: 10 years post-sale",
        "Communication Records: 3 years",
        "Marketing Data: Until consent withdrawal"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "10. Breach Notification",
      content: "In the unlikely event of a data breach, we will notify affected users and relevant authorities within 72 hours, in compliance with Indian data protection regulations.",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Privacy Policy | FNAEstate - Data Protection & Privacy</title>
        <meta name="description" content="Read FNAEstate's comprehensive privacy policy. Learn how we protect your personal data, comply with data protection laws, and ensure your privacy rights. ISO 27001 certified security." />
        <meta name="keywords" content="privacy policy, data protection, privacy rights, data security, personal information protection, GDPR compliance, data privacy" />
        <link rel="canonical" href="https://fnaestate.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | FNAEstate" />
        <meta property="og:description" content="Read FNAEstate's comprehensive privacy policy and data protection practices." />
        <meta property="og:url" content="https://fnaestate.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg  "></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">ENTERPRISE-GRADE DATA PROTECTION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Protecting your data with military-grade security and transparency in compliance with Indian data protection laws
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="w-4 h-4" />
                <span>Last updated: December 26, 2025</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4" />
                <span>ISO 27001:2013 Certified</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4" />
                <span>GDPR Compliant for NRI Clients</span>
              </div>
            </div>
          </div>
          
          {/* Security Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-amber-400">AES-256</div>
              <div className="text-xs text-slate-400">Encryption</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-amber-400">99.99%</div>
              <div className="text-xs text-slate-400">Uptime SLA</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-amber-400">Tier IV</div>
              <div className="text-xs text-slate-400">Data Centers</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-amber-400">24/7</div>
              <div className="text-xs text-slate-400">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Important Notice */}
        <div className="mb-12 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Important Privacy Notice</h3>
              <p className="text-slate-700 mb-4">
                This Privacy Policy explains how FNAEstate collects, uses, discloses, and protects your personal data in compliance with Indian laws. 
                By using our services, you consent to our data practices as described herein.
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4" />
                <span>We never sell your personal data to third parties</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border ${section.highlight ? 'border-amber-200' : 'border-slate-200'} p-8 shadow-sm hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl  bg-gradient-to-r from-amber-500 to-amber-600 text-white`}>
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
                  
                  {section.categories && (
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      {section.categories.map((category, catIdx) => (
                        <div key={catIdx} className="bg-slate-50 rounded-xl p-4">
                          <h4 className="font-bold text-slate-900 mb-3">{category.title}</h4>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-sm text-slate-700 flex items-center gap-2">
                                <ChevronRight className="w-3 h-3 text-amber-500" />
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
              
              {section.highlight && (
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <div className="flex items-center gap-2 text-sm text-amber-700 font-medium">
                    <Shield className="w-4 h-4" />
                    <span>Enhanced security protocols applied to this section</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact & DPO Information */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Data Protection Office</h3>
              <p className="text-slate-300 mb-6">
                For privacy-related inquiries, data access requests, or to exercise your rights, 
                please contact our dedicated Data Protection Officer. All requests are processed within 30 days.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-slate-300">Certified Data Protection Officer</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-slate-300">24/7 Security Operations Center</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                Contact Information
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Data Protection Officer</div>
                  <a href="mailto:dpo@FNAEstate.com" className="text-amber-400 hover:text-amber-300 font-medium">
                    dpo@FNAEstate.com
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Privacy Helpline</div>
                  <a href="tel:+919876543211" className="text-amber-400 hover:text-amber-300 font-medium">
                    +91 98765 43211
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Registered Office</div>
                  <div className="text-slate-300">
                    FNAEstate Technologies Private Limited<br />
                    Level 42, One World Trade<br />
                    Mumbai, Maharashtra 400001<br />
                    CIN: U74999MH2025PTC123456
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Updates & Consent */}
        <div className="mt-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-slate-700 flex-shrink-0" />
              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Policy Updates & Your Consent</h4>
                <p className="text-slate-700 mb-4">
                  We may update this Privacy Policy periodically to reflect changes in our practices, 
                  services, or legal requirements. Significant changes will be communicated via email 
                  and platform notifications. Continued use of our services constitutes acceptance of 
                  updated policies.
                </p>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>You have the right to withdraw consent at any time by contacting our DPO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Version Information */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-6 py-3">
            <FileText className="w-5 h-5 text-slate-600" />
            <div className="text-sm text-slate-600">
              <span className="font-semibold">Document Version:</span> 4.2 • <span className="font-semibold">Last Updated:</span> December 26, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};