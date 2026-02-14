import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Zap, Shield, Crown, Coffee } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

const BenefitItem = ({ icon: Icon, title, description }) => (
  <div className="flex gap-4 items-start">
    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const TierCard = ({
  name,
  price,
  description,
  features,
  icon: Icon,
  recommended = false,
}) => (
  <div
    className={`relative bg-white rounded-2xl p-8 border ${recommended ? "border-orange-500 shadow-lg shadow-orange-100" : "border-gray-200 shadow-sm"} flex flex-col h-full`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
        Recommended
      </div>
    )}

    <div className="mb-6 flex items-center justify-between">
      <div
        className={`p-3 rounded-xl ${recommended ? "bg-orange-100 text-orange-600" : "bg-gray-50 text-gray-600"}`}
      >
        <Icon size={32} />
      </div>
      <div className="text-right">
        <span className="block text-2xl font-bold text-gray-900">${price}</span>
        <span className="text-gray-400 text-sm">/month</span>
      </div>
    </div>

    <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
    <p className="text-gray-500 text-sm mb-6 h-10">{description}</p>

    <ul className="space-y-3 mb-8 grow">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          {feature}
        </li>
      ))}
    </ul>

    <Button
      variant={recommended ? "primary" : "outline"}
      className="w-full justify-center"
    >
      Sponsor
    </Button>
  </div>
);

const Sponsor = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium mb-6">
              <Heart size={16} className="fill-orange-600" />
              Support Open Source
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Become a <span className="text-orange-600">Sponsor</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              OkUnix is proudly open source. Your sponsorship helps keep the
              servers running, supports development of privacy-focused features,
              and ensures the project remains independent and sustainable.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
            <BenefitItem
              icon={Zap}
              title="Faster Development"
              description="Directly fund dedicated development time for new features and performance improvements."
            />
            <BenefitItem
              icon={Shield}
              title="Privacy Protection"
              description="Help us maintain legal and infrastructure costs to defend user privacy without selling data."
            />
            <BenefitItem
              icon={Star}
              title="Community Growth"
              description="Resources for documentation, tutorials, and community support channels."
            />
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            <TierCard
              name="Supporter"
              price="5"
              icon={Coffee}
              description="Buy us a coffee and keep the code flowing."
              features={[
                "Sponsor badge on profile",
                "Access to discord supporter channel",
                "Weekly newsletter",
              ]}
            />
            <TierCard
              name="Backer"
              price="19"
              icon={Crown}
              recommended={true}
              description="Serious support for the project's sustainability."
              features={[
                "All Supporter benefits",
                "Priority bug reports",
                "Name in README.md",
                "Early access to beta features",
              ]}
            />
            <TierCard
              name="Partner"
              price="99"
              icon={Heart}
              description="For organizations who rely on OkUnix."
              features={[
                "All Backer benefits",
                "Logo on landing page",
                "Priority feature requests",
                "Direct support line",
                "Monthly strategy call",
              ]}
            />
          </div>

          {/* FAQ or Bottom CTA */}
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Other ways to support
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Not ready to sponsor financially? You can contribute by starring
              the repo, reporting bugs, improving documentation, or sharing
              OkUnix with your network.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/SAYOUNCDR/okunix"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline">Star on GitHub</Button>
              </a>
              <Link to="/contact">
                <Button variant="ghost">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsor;
