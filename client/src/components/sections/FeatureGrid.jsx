import React from "react";
import { ArrowRight, BarChart2, Globe, MousePointer2, Filter, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const FeatureItem = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col gap-4">
    <div className="bg-gray-100 rounded-2xl aspect-video w-full flex items-center justify-center mb-2 overflow-hidden border border-gray-200">
       <div className="text-gray-400 flex flex-col items-center">
            {Icon && <Icon size={48} className="mb-2 opacity-50" />}
            <span className="text-sm">Image Placeholder</span>
       </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{description}</p>
  </div>
);

const FeatureGrid = () => {
    const features = [
        {
            title: "Traffic analysis",
            description: "Get insights into your traffic so you optimize for growth. Easily see all your metrics at a glance.",
            icon: BarChart2
        },
        {
            title: "Visitor analysis",
            description: "Get detailed breakdowns about your visitors including where they are located and what device they used.",
            icon: Globe
        },
        {
            title: "Custom events",
            description: "Track more than just pageviews. Capture any event on your website like button clicks and form entries.",
            icon: MousePointer2
        },
        {
            title: "Powerful filters",
            description: "Dive deeper into your data using easy to apply filters. Segment your users by any metric such as browser, OS, and country.",
            icon: Filter
        },
        {
            title: "Realtime data",
            description: "Get a realtime view of your current website traffic. See the exact pages where your visitors are landing.",
            icon: Zap
        },
        {
            title: "Trend detection",
            description: "Compare date periods to discover key trends in your traffic. Easily measure the success of your campaigns.",
            icon: TrendingUp
        }
    ];

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-16">
          <h4 className="text-orange-600 font-bold mb-2 uppercase tracking-wide text-sm">Web Analytics</h4>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-2">
            A complete analytics solution with all the features you need.
          </h2>
          <p className="text-md text-gray-600">
            OkUnix is packed with amazing features that enable you to better understand your website traffic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
            ))}
        </div>

        <div className="mt-16 flex justify-center">
             <Link to="/features">
                <Button variant="ghost" className="group border border-gray-300 shadow-sm hover:bg-gray-100">
                    Explore more features
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
             </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
