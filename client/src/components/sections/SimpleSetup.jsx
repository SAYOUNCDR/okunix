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
  image,
  linkText = "Learn More",
}) => (
  <div className="p-4 flex flex-col h-full bg-orange-100/20 text-left">
    {/* Image Placeholder */}
    <div className="rounded-xl h-68 mb-6 flex items-center justify-center overflow-hidden relative bg-white shadow-sm border border-gray-200">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="text-orange-200 absolute inset-0 flex items-center justify-center">
          {Icon ? <Icon size={64} strokeWidth={1} /> : "Isometric Image"}
        </div>
      )}
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
    <section className="bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto  px-6">
        <div className="max-w-5xl mx-auto border border-gray-200 grid grid-cols-1 md:grid-cols-2 bg-white">
          <div className="border-b md:border-r border-gray-200">
            <FeatureCard
              title="Register & Login"
              description="Create your account to get started. Secure authentication ensures your data remains private and accessible only to you."
              icon={UserPlus}
              image="/onboading.png"
              linkText="Get Started"
            />
          </div>
          <div className="border-b border-gray-200">
            <FeatureCard
              title="Generate Script"
              description="Our system automatically generates a unique, lightweight tracking script tailored for your specific website configuration."
              icon={Code2}
              image="/GenerateScript.png"
              linkText="View Documentation"
            />
          </div>
          <div className="md:border-r border-gray-200">
            <FeatureCard
              title="Embed Tracking Code"
              description="Simply copy and paste the generated script into the <head> tag of your website. No complex coding knowledge required."
              icon={ClipboardCopy}
              image="/deploy.png"
              linkText="Installation Guide"
            />
          </div>
          <div>
            <FeatureCard
              title="View Real-time Analytics"
              description="Access your dashboard instantly to see live traffic, user behavior, and insightful metrics unfold in real-time."
              icon={BarChart3}
              image="/Analytics.png"
              linkText="Explore Demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleSetup;
