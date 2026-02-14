import React from "react";
import {
  BarChart3,
  Shield,
  Globe,
  Zap,
  Smartphone,
  Lock,
  Users,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

const FeatureCard = ({ icon: Icon, title, description, colorClass }) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass}`}
    >
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: "Privacy-First Analytics",
      description:
        "No cookies, no IP tracking, no fingerprinting. compliant with GDPR, CCPA, and PECR out of the box.",
      colorClass: "bg-green-100 text-green-600",
    },
    {
      icon: Zap,
      title: "Lightweight Script",
      description:
        "Our tracking script is less than 1KB gzipped. It loads asynchronously and won't slow down your site.",
      colorClass: "bg-orange-100 text-orange-600",
    },
    {
      icon: Globe,
      title: "Real-time Data",
      description:
        "See current visitors and pageviews as they happen. Watch your traffic spike when you launch.",
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      icon: BarChart3,
      title: "Simple Dashboard",
      description:
        "All the metrics you need on a single page. No complex menus or training required to understand your data.",
      colorClass: "bg-purple-100 text-purple-600",
    },
    {
      icon: Smartphone,
      title: "Device & Browser Tracking",
      description:
        "Understand what devices, browsers, and operating systems your visitors are using to optimize their experience.",
      colorClass: "bg-pink-100 text-pink-600",
    },
    {
      icon: Lock,
      title: "Data Ownership",
      description:
        "You own your data completely. We don't sell it, monetize it, or look at it. Export it whenever you want.",
      colorClass: "bg-gray-100 text-gray-600",
    },
  ];

  const additionalFeatures = [
    {
      icon: Users,
      title: "Visitor Flows",
      description:
        "See where your users are coming from and what pages they visit most often.",
    },
    {
      icon: Eye,
      title: "Event Tracking",
      description:
        "Track custom events like button clicks, form submissions, and more with simple attributes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
            Powerful Features
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Everything you need, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-400">
              nothing you don't
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            OkUnix provides essential insights without tracking personal data.
            Simple, fast, and privacy-friendly web analytics.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Big Feature Block - Integration */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-24 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Installs in seconds
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Just add a single line of code to your website's header. Works
                with React, Vue, Next.js, WordPress, and any other framework.
              </p>

              <div className="bg-gray-900 rounded-xl p-4 md:p-6 shadow-xl mb-6 font-mono text-sm text-gray-300 overflow-x-auto">
                <span className="text-purple-400">&lt;script</span>{" "}
                <span className="text-blue-400">defer</span>{" "}
                <span className="text-blue-400">data-domain</span>=
                <span className="text-green-400">"your-site.com"</span>{" "}
                <span className="text-blue-400">src</span>=
                <span className="text-green-400">
                  "https://okunix.com/js/tracker.js"
                </span>
                <span className="text-purple-400">&gt;&lt;/script&gt;</span>
              </div>

              <Link to="/docs">
                <Button>
                  View Documentation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
              <div className="relative bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                {/* Visual representation of data flow or chart */}
                <img src="/Analytics.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-900 rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to respect your users' privacy?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have switched to privacy-friendly
              analytics. Start for free, upgrade as you grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-transparent">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/sponsor">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-white border-gray-700 hover:bg-gray-800 hover:text-white"
                >
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
