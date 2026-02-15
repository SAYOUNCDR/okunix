import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SimpleSetup from "../components/sections/SimpleSetup";
import Hero from "../components/sections/Hero";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Hero />

      <div className="pb-20">
        <SimpleSetup />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
