import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SimpleSetup from "../components/sections/SimpleSetup";
import FeatureGrid from "../components/sections/FeatureGrid";
import Hero from "../components/sections/Hero";
import Getstarted from "../components/layout/Getstarted";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Hero />
      <div className="pb-20">
        <SimpleSetup />
      </div>
      <FeatureGrid />

      <div className="max-w-5xl mx-auto w-full px-4 mb-20">
        <Getstarted />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
