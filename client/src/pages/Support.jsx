import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import {
  Mail,
  MessageSquare,
  BookOpen,
  ExternalLink,
  MessageCircle,
  Bug,
  Lightbulb,
  Copy,
  Check,
} from "lucide-react";

const Support = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("support@okunix.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <div className="flex-1 max-w-4xl mx-auto w-full p-8 md:p-12">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Need a hand?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              We're here to help. Whether you've found a bug, have a feature
              request, or just want to chat about analytics, here's how to reach
              us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Discord - The Community Hub */}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="md:col-span-2 bg-[#5865F2] hover:bg-[#4752C4] text-white p-6 rounded-2xl transition-all shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                <MessageCircle size={100} />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle size={24} />
                    <span className="font-bold">Discord Community</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    Join the conversation
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Get real-time help, share your feedback, and see what others
                    are building.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  Join Server <ExternalLink size={14} className="ml-2" />
                </div>
              </div>
            </a>

            {/* Docs - Self Serve */}
            <a
              href="#"
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all shadow-sm  group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Documentation
                </h3>
                <p className="text-gray-500 text-sm">
                  Read the guides and API reference.
                </p>
              </div>
              <div className="mt-4 text-orange-600 text-sm font-medium flex items-center">
                Read Docs{" "}
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telegram */}
            <a
              href="#"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Telegram Channel
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  Quick updates & chat
                </p>
              </div>
              <ExternalLink
                size={16}
                className="text-gray-400 group-hover:text-gray-600"
              />
            </a>

            {/* Email */}
            <div
              className="relative flex items-center gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors group cursor-pointer"
              onClick={() =>
                (window.location.href = "mailto:support@okunix.com")
              }
            >
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Email Support
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  support@okunix.com
                </p>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 mr-2 rounded-lg bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all active:scale-95"
                title="Copy email address"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>

              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                ~24h
              </span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/SAYOUNCDR/okunix/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
              >
                <Bug size={16} className="mr-2 text-rose-500" />
                Report a Bug
              </a>
              <a
                href="https://github.com/SAYOUNCDR/okunix/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
              >
                <Lightbulb size={16} className="mr-2 text-yellow-500" />
                Request Feature
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
