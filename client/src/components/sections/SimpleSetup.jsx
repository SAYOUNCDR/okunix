import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  UserPlus,
  Code2,
  ClipboardCopy,
  BarChart3,
} from "lucide-react";

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  linkText = "Learn More",
}) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    {/* Image Placeholder */}
    <div className="bg-orange-50/50 rounded-xl h-48 mb-6 flex items-center justify-center border-2 border-dashed border-orange-100 overflow-hidden relative">
      <div className="text-orange-200 absolute inset-0 flex items-center justify-center">
        {Icon ? <Icon size={64} strokeWidth={1} /> : "Isometric Image"}
      </div>
    </div>

    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 mb-6 grow leading-relaxed text-sm">
      {description}
    </p>

    <div className="mt-auto">
      <span className="inline-flex items-center text-orange-600 font-semibold text-sm hover:translate-x-1 transition-transform cursor-pointer">
        {linkText} <ArrowRight className="w-4 h-4 ml-1" />
      </span>
    </div>
  </div>
);

const SimpleSetup = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-orange-500 font-medium tracking-wide uppercase text-sm mb-2 block">
              Getting Started
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Simple Setup Process
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-500 text-lg">
              We help you track, analyze, and refine your digital presence with
              privacy-focused expertise and transparent metrics.
            </p>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <FeatureCard
            title="Register & Login"
            description="Create your account to get started. Secure authentication ensures your data remains private and accessible only to you."
            icon={UserPlus}
            linkText="Get Started"
          />
          <FeatureCard
            title="Generate Script"
            description="Our system automatically generates a unique, lightweight tracking script tailored for your specific website configuration."
            icon={Code2}
            linkText="View Documentation"
          />
          <FeatureCard
            title="Embed Tracking Code"
            description="Simply copy and paste the generated script into the <head> tag of your website. No complex coding knowledge required."
            icon={ClipboardCopy}
            linkText="Installation Guide"
          />
          <FeatureCard
            title="View Real-time Analytics"
            description="Access your dashboard instantly to see live traffic, user behavior, and insightful metrics unfold in real-time."
            icon={BarChart3}
            linkText="Explore Demo"
          />
        </div>
      </div>
    </section>
  );
};

export default SimpleSetup;
