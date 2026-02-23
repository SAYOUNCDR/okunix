import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-24 md:py-32">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-orange max-w-none text-gray-600">
          <p className="mb-6">Last updated: February 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            1. Our Commitment to Privacy
          </h2>
          <p className="mb-6">
            At Okunix Analytics, privacy is not an afterthought; it is our core
            feature. We are built from the ground up to provide valuable
            insights without compromising user privacy. We do not use cookies
            and we do not collect personal data from your website visitors.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            2. Data We Collect for You
          </h2>
          <p className="mb-6">
            When you use our snippet on your website, we collect anonymous data
            points such as page views, referrers, and browser types. This data
            is intentionally anonymized and cannot be traced back to individual
            visitors, keeping you fully compliant with GDPR and CCPA.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            3. Data Your Account Provides
          </h2>
          <p className="mb-6">
            When you create an Okunix account, we collect your name and email
            address. This information is used strictly for authentication,
            account management, and important service updates. We will never
            sell your personal information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            4. Data Security
          </h2>
          <p className="mb-6">
            We implement robust security measures to protect both your account
            information and the analytics data you collect through our service.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
