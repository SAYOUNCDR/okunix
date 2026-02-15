import React from "react";
import {
  Eye,
  Users,
  Activity,
  Router,
  MapPin,
  Smartphone,
  Type,
  Filter,
  Clock,
  Users2,
  Zap,
  Database,
  Tag,
  Share2,
  BarChart,
  PieChart,
  Link as LinkIcon,
  BoxSelect,
  GitCompare,
  GitMerge,
  ListFilter,
  RotateCcw,
  Target,
  Map,
  DollarSign,
  Network,
  ShieldCheck,
  UserX,
  Cookie,
  DatabaseZap,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Getstarted from "../components/layout/Getstarted";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 h-full">
    <div className="flex items-center gap-3 mb-3">
      {Icon && <Icon className="w-5 h-5 text-gray-900" />}
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const Section = ({ title, description, features }) => (
  <div className="mb-24">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-500 max-w-2xl text-sm">{description}</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </div>
);

const Features = () => {
  const analyticsFeatures = [
    {
      icon: Eye,
      title: "Page views",
      description:
        "Knowing which of your pages gets the most traffic is essential to improving your website content.",
    },
    {
      icon: Users,
      title: "Visitors",
      description:
        "Get detailed information about your visitors like their device, browser, OS and location.",
    },
    {
      icon: Activity,
      title: "Bounce rate",
      description:
        "See which pages keep your visitors engaged versus those they are abandoning.",
    },
    {
      icon: Router,
      title: "Traffic sources",
      description:
        "See where your traffic is coming from to better understand where you should be spending your effort.",
    },
    {
      icon: MapPin,
      title: "Location",
      description:
        "Find out where your visitors are coming from including the city, region and country.",
    },
    {
      icon: Smartphone,
      title: "Devices",
      description:
        "See the most popular devices used by visitors to help you optimize your pages.",
    },
    {
      icon: Type,
      title: "Languages",
      description:
        "Know which languages are the most popular among your visitors to help you tailor your content.",
    },
    {
      icon: Filter,
      title: "Filtering",
      description:
        "Gain further insight into your data by applying filters like country, browser, and URL.",
    },
    {
      icon: Clock,
      title: "Realtime data",
      description:
        "Data available in seconds, not days. The data that OkUnix collects is immediately available on your dashboard.",
    },
    {
      icon: Users2,
      title: "Teams",
      description:
        "The teams feature allows you to securely share websites access with different team members.",
    },
    {
      icon: Zap,
      title: "Custom events",
      description:
        "Track everything that happens on your website like signups and cart checkouts using custom events.",
    },
    {
      icon: Database,
      title: "Custom data",
      description:
        "Use custom data properties to help you further analyze your data.",
    },
    {
      icon: Tag,
      title: "UTM tracking",
      description:
        "Measure the effectiveness of your campaign by analyzing UTM query parameters that are automatically collected.",
    },
    {
      icon: Share2,
      title: "Sharing",
      description:
        "Easily share your stats with others through a secure, uniquely generated URL.",
    },
    {
      icon: BarChart,
      title: "Insights",
      description:
        "Build insights for specific websites and date ranges to cover all your data needs.",
    },
    {
      icon: PieChart,
      title: "Segments",
      description:
        "Save commonly used filters, so you can quickly reapply them without setting criteria each time.",
    },
    {
      icon: Users,
      title: "Cohorts",
      description:
        "Group your users based on specific actions, helping you uncover trends and measure engagement more effectively.",
    },
    {
      icon: LinkIcon,
      title: "Links",
      description:
        "Monitor and record clicks on URLs to show where visitors come from and how they interact with your links.",
    },
    {
      icon: BoxSelect,
      title: "Pixels",
      description: "Embed a tracking pixel anywhere to start collecting data.",
    },
  ];

  const insightsFeatures = [
    {
      icon: GitCompare,
      title: "Compare",
      description:
        "See your metric performance compared against previous date ranges.",
    },
    {
      icon: GitMerge,
      title: "Breakdown",
      description: "Dive deeper into your data by using segments and filters.",
    },
    {
      icon: ListFilter,
      title: "Funnels",
      description: "Understand the conversion and drop-off rate of users.",
    },
    {
      icon: RotateCcw,
      title: "Retention",
      description:
        "Measure your website stickiness by tracking how often users return.",
    },
    {
      icon: Tag,
      title: "UTM",
      description: "Track your campaigns through UTM parameters.",
    },
    {
      icon: Target,
      title: "Goals",
      description: "Track your goals for pageviews and events.",
    },
    {
      icon: Map,
      title: "Journey",
      description: "Look into your revenue data and how users are spending.",
    },
    {
      icon: DollarSign,
      title: "Revenue",
      description: "Understand how users navigate through your website.",
    },
    {
      icon: Network,
      title: "Attribution",
      description:
        "See how users engage with your marketing and what drives conversions.",
    },
  ];

  const privacyFeatures = [
    {
      icon: ShieldCheck,
      title: "GDPR & CCPA",
      description:
        "OkUnix never collects any personal information from your visitors so it is fully compliant with GDPR and CCPA.",
    },
    {
      icon: UserX,
      title: "Data anonymization",
      description:
        "All visitor data is anonymized to protect your visitors' privacy.",
    },
    {
      icon: Cookie,
      title: "No cookies",
      description:
        "OkUnix does not use any cookies so no annoying cookie banner is required.",
    },
    {
      icon: DatabaseZap,
      title: "Data ownership",
      description:
        "Data is always in your control with OkUnix. You can self-host on your own infrastructure or export your data.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Features
          </h1>
          <p className="text-md text-gray-500 leading-relaxed">
            An overview of all the core features OkUnix provides.
          </p>
        </div>

        <Section
          title="Analytics"
          description="OkUnix collects all the metrics you care about to help you make better decisions."
          features={analyticsFeatures}
        />

        <Section
          title="Insights"
          description="OkUnix comes with out of the box insights that enables you to gain deep understanding of all your website data."
          features={insightsFeatures}
        />

        <Section
          title="Privacy"
          description="OkUnix is private by default and helps you stay compliant with data privacy laws."
          features={privacyFeatures}
        />

        {/* CTA */}
        <div className="mt-20">
          <Getstarted />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
