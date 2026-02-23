import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-24 md:py-32">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-orange max-w-none text-gray-600">
          <p className="mb-6">Last updated: February 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-6">
            By accessing and using Okunix Analytics, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please
            do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            2. Description of Service
          </h2>
          <p className="mb-6">
            Okunix Analytics provides privacy-focused web analytics services. We
            stand by our promise: no cookies, no personal data collection, and
            full data ownership.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            3. Data Ownership
          </h2>
          <p className="mb-6">
            You retain all rights to the analytics data collected from your
            website. We only process this data to provide our analytics
            dashboard and services to you.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            4. Acceptable Use
          </h2>
          <p className="mb-6">
            You agree not to misuse our services or help anyone else do so. You
            must not use Okunix Analytics to track illegal activities or violate
            the privacy of your users.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            5. Account Termination
          </h2>
          <p className="mb-6">
            We reserve the right to suspend or terminate your account at any
            time for violations of these Terms of Service. You can also delete
            your account and all associated data at any time from your settings.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
