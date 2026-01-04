import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, Code2, BarChart3, ArrowRight } from "lucide-react";
import Button from "../common/Button";

const StepCard = ({ number, title, description, icon: Icon }) => (
  <div className="relative flex flex-col items-center text-center p-6">
    <div className="absolute -top-4 bg-[#F38020] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-200">
      {number}
    </div>
    <div className="mt-4 mb-4 p-3 bg-orange-50 rounded-xl text-[#F38020]">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const SimpleSetup = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get up and running in{" "}
            <span className="text-[#F38020]">minutes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No complex configurations or heavy scripts. Start tracking your
            privacy-focused analytics in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2 transform scale-x-75" />

          <StepCard
            number="1"
            icon={UserPlus}
            title="Create Account"
            description="Sign up for a free OkUnix account. No credit card required to get started."
          />
          <StepCard
            number="2"
            icon={Code2}
            title="Add Script"
            description="Copy our lightweight, privacy-friendly tracking snippet into your website's head tag."
          />
          <StepCard
            number="3"
            icon={BarChart3}
            title="See Insights"
            description="Watch real-time data flow into your dashboard instantly. It's that simple."
          />
        </div>

        <div className="flex justify-center">
          <Link to="/register">
            <Button variant="primary" className="px-8! py-3! text-lg! group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimpleSetup;
