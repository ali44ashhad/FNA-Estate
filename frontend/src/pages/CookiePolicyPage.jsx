import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Cookie,
  Shield,
  BarChart3,
  Target,
  Settings,
  Eye,
  RefreshCw,
  Lock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Mail,
  Phone,
  Globe,
  Cpu,
  Database
} from 'lucide-react';

export const CookiePolicyPage = () => {
  const cookieCategories = [
    {
      icon: <Shield className="w-6 h-6" />,
      name: "Essential Cookies",
      purpose: "Required for platform functionality and security",
      duration: "Session to 1 year",
      examples: [
        "Authentication and session management",
        "Fraud prevention and security",
        "Load balancing and system stability",
        "Payment processing and transactions"
      ],
      essential: true
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      name: "Analytics & Performance",
      purpose: "Improve platform performance and user experience",
      duration: "2 years",
      examples: [
        "User behavior analysis",
        "Feature performance tracking",
        "Error monitoring and debugging",
        "Platform optimization data"
      ],
      essential: false
    },
    {
      icon: <Settings className="w-6 h-6" />,
      name: "Preference Cookies",
      purpose: "Remember your settings and preferences",
      duration: "1 year",
      examples: [
        "Language and region settings",
        "Property search preferences",
        "Display settings and themes",
        "Notification preferences"
      ],
      essential: false
    },
    {
      icon: <Target className="w-6 h-6" />,
      name: "Marketing & Personalization",
      purpose: "Deliver relevant property recommendations",
      duration: "90 days",
      examples: [
        "Property recommendation algorithms",
        "Market insight personalization",
        "Campaign effectiveness measurement",
        "Cross-device tracking"
      ],
      essential: false
    }
  ];

  const thirdPartyCookies = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and user behavior tracking",
      privacy: "https://policies.google.com/privacy"
    },
    {
      name: "Hotjar",
      purpose: "User experience research and feedback",
      privacy: "https://www.hotjar.com/legal/policies/privacy"
    },
    {
      name: "Facebook Pixel",
      purpose: "Advertising and conversion tracking",
      privacy: "https://www.facebook.com/policies/cookies"
    },
    {
      name: "Google Ads",
      purpose: "Advertising campaign optimization",
      privacy: "https://policies.google.com/technologies/ads"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Cookie Policy | FNAEstate - Cookie Usage & Preferences</title>
        <meta name="description" content="Learn about FNAEstate's cookie policy. Understand how we use cookies, what types of cookies we use, and how to manage your cookie preferences for better browsing experience." />
        <meta name="keywords" content="cookie policy, cookies, cookie preferences, web cookies, tracking cookies, cookie settings" />
        <link rel="canonical" href="https://fnaestate.com/cookie-policy" />
        <meta property="og:title" content="Cookie Policy | FNAEstate" />
        <meta property="og:description" content="Learn about FNAEstate's cookie policy and cookie usage." />
        <meta property="og:url" content="https://fnaestate.com/cookie-policy" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <Cookie className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">TRANSPARENT DATA PRACTICES</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                Cookie Policy
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Understanding how we use cookies and similar technologies to enhance your premium real estate experience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4" />
                <span>Last updated: December 26, 2025</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4" />
                <span>GDPR & CCPA Compliant</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4" />
                <span>Consent Management Platform</span>
              </div>
            </div>
          </div>
          
      
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="mb-12 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">About Our Cookie Usage</h3>
              <p className="text-slate-700 mb-4">
                Cookies and similar tracking technologies help us provide a premium real estate experience by remembering your preferences, 
                optimizing platform performance, and delivering personalized property recommendations. We are transparent about our cookie usage 
                and provide you with control over your privacy settings.
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4" />
                <span>You can customize your cookie preferences at any time using our consent management tool</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Cookie Categories & Purposes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cookieCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border ${category.essential ? 'border-red-200' : 'border-slate-200'} p-6 shadow-sm hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${category.essential ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-amber-500 to-amber-600'} text-white`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
                      {category.essential && (
                        <div className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                          Essential
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{category.purpose}</p>
                    <div className="text-xs text-slate-500 mt-2">Duration: {category.duration}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Examples:</h4>
                  <ul className="space-y-2">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {category.essential && (
                  <div className="mt-4 pt-4 border-t border-red-100">
                    <div className="flex items-center gap-2 text-xs text-red-700">
                      <AlertCircle className="w-3 h-3" />
                      <span>These cookies cannot be disabled as they are essential for platform functionality</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
 

        {/* Management & Control */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Manage Your Cookie Preferences</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600 w-fit mb-4">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Browser Settings</h3>
              <p className="text-slate-600 mb-4">
                Most web browsers allow you to control cookies through their settings. You can choose to accept or reject cookies.
              </p> 
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 w-fit mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Opt-Out Tools</h3>
              <p className="text-slate-600 mb-4">
                Use these industry-standard tools to opt out of specific tracking technologies:
              </p>
              
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-600 w-fit mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Consent Management</h3>
              <p className="text-slate-600 mb-4">
                You can update your cookie preferences at any time using our consent management platform.
              </p>
               
            </div>
          </div>
        </div>

        {/* Contact & Updates */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Questions & Updates</h3>
              <p className="text-slate-300 mb-6">
                For questions about our Cookie Policy or to request changes to your cookie settings, 
                please contact our Data Protection Officer. We update this policy regularly to reflect 
                changes in technology and regulations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-slate-300">Regular policy reviews and updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-slate-300">Transparent data practices</span>
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
                  <div className="text-sm text-slate-400 mb-1">Privacy Support</div>
                  <a href="tel:+919876543211" className="text-amber-400 hover:text-amber-300 font-medium">
                    +91 98765 43211
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">For Technical Inquiries</div>
                  <a href="mailto:tech@FNAEstate.com" className="text-amber-400 hover:text-amber-300 font-medium">
                    tech@FNAEstate.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Policy Updates & Compliance</h4>
              <p className="text-slate-700 mb-4">
                We regularly review and update this Cookie Policy to ensure compliance with evolving regulations 
                and technological changes. Significant updates will be communicated through platform notifications 
                and email communications to registered users.
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4" />
                <span>Compliant with GDPR, CCPA, and Indian data protection regulations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};