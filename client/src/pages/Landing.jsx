import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SimpleSetup from "../components/sections/SimpleSetup";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section Placeholder */}
      <div className="pt-32 pb-20 px-6 text-center grow">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Privacy-focused Analytics <br />
          <span className="text-[#F38020]">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Track your website traffic without compromising user privacy. No
          cookies, no GDPR consent banners, just pure insights.
        </p>
        <div className="h-96 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-5xl mx-auto flex items-center justify-center text-gray-400 mb-20">
          Dashboard Preview Placeholder
        </div>

        <SimpleSetup />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
