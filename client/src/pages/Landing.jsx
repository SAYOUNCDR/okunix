import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SimpleSetup from "../components/sections/SimpleSetup";
import Hero from "../components/sections/Hero";
import Sectionheader from "../components/sections/Sectionheader";
import Getstarted from "../components/layout/Getstarted";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Hero />
      <div className="pb-20">
        <SimpleSetup />
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 mb-20">
        <Getstarted />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
