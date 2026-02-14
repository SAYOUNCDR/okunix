import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-1 mb-6">
              <img
                src="/h.png"
                alt="OkUnix Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                kunix
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-500 text-xs font-medium mb-6 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.10)] shadow-green-100/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              All systems operational
            </div>

            <p className="text-gray-500 text-xs leading-relaxed">
              <span className="block mb-1">© 2026 Okunix Analytics.</span>
              <span>Privacy-focused web analytics for the modern web.</span>
            </p>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-5 md:col-start-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/features"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Sponsor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/docs"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/sayoun/okunix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@okunix.com"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/okunix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/okunix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="text-lg">🍪</span>
            <span>Pure Analytics</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-orange-600 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-orange-600 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
