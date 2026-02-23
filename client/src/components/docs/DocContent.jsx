import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Code,
  Zap,
  BookOpen,
  Layers,
  Globe,
  Database,
  Lock,
  Server,
  HelpCircle,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

// Table of contents item component
const TOCItem = ({ item, activeId }) => {
  const isActive = activeId === item.id;

  return (
    <a
      href={`#${item.id}`}
      className={`block text-sm py-1.5 ${
        isActive
          ? "text-gray-900 font-semibold"
          : "text-gray-500 hover:text-gray-800"
      }`}
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(item.id);
        if (element) {
          const offset = 100; // Offset for sticky headers
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "auto",
          });
        }
      }}
    >
      {item.label}
    </a>
  );
};

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg bg-gray-900 border border-gray-800">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed">
        {children}
      </pre>
    </div>
  );
};

const Section = ({ title, children, icon: Icon }) => (
  <div
    className="mb-12 scroll-mt-24"
    id={title.toLowerCase().replace(/\s+/g, "-")}
  >
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      {Icon && <Icon className="text-orange-500" size={24} />}
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="prose prose-orange max-w-none text-gray-600">
      {children}
    </div>
  </div>
);

const DocContent = ({ activeDoc, onNavigate }) => {
  // Content mapping with TOC
  const contentMap = {
    introduction: {
      toc: [
        { id: "introduction", label: "Introduction", level: 2 },
        { id: "what-is-okunix", label: "What is Okunix?", level: 3 },
        { id: "core-values", label: "Core Values", level: 3 },
        { id: "how-it-works", label: "How it works", level: 3 },
        { id: "features", label: "Core Features", level: 3 },
        { id: "explore", label: "Explore the docs", level: 3 },
      ],
      component: (
        <Section title="Introduction" icon={BookOpen}>
          <p className="text-lg leading-relaxed mb-6">
            Welcome to the official Okunix documentation. This guide will help
            you understand the platform, learn how to deploy it, and explore the
            internal architecture.
          </p>

          <h3
            id="what-is-okunix"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            What is Okunix?
          </h3>
          <p className="mb-4">
            Okunix is a powerful, open-source web analytics platform designed
            specifically for teams that care about privacy. It serves as a
            drop-in, self-hostable alternative to Google Analytics, stripping
            away invasive tracking mechanisms while still providing you with
            comprehensive and beautiful traffic insights.
          </p>

          <h3
            id="core-values"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            Core Values
          </h3>
          <ul className="grid sm:grid-cols-2 gap-4 mb-8">
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Privacy-first :</strong> No cookies, no fingerprinting, no
              personal data. Your visitors stay 100% anonymous.
            </li>
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Data Ownership :</strong> Self-host on your infrastructure.
              Your analytics data never leaves your servers, putting you in full
              control.
            </li>
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Lightweight :</strong> The tracking script is under 2KB. It
              won't slow down your website's performance or impact SEO scores.
            </li>
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Open Source :</strong> Fully transparent telemetry systems
              and aggregation pipelines that you can audit and modify.
            </li>
          </ul>

          <h3
            id="how-it-works"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            How it works
          </h3>
          <p className="mb-4">
            The architecture is designed to be as non-invasive as possible:
          </p>
          <ol className="list-decimal pl-5 space-y-2 mb-8 text-gray-600">
            <li>
              <strong>The Tracker:</strong> A tiny JavaScript snippet is
              injected into your website's <code>&lt;head&gt;</code>.
            </li>
            <li>
              <strong>Data Collection:</strong> When a user visits your site,
              the script extracts environmental data (browser, OS, screen size,
              page path) without storing any locally identifiable cookies.
            </li>
            <li>
              <strong>Processing:</strong> The data is sent securely to your
              Okunix backend node, which hashes IP addresses into ephemeral
              session tokens for strict anonymization.
            </li>
            <li>
              <strong>Visualization:</strong> Your React-powered dashboard
              aggregates these millions of tiny hits into beautiful, readable
              metrics instantly.
            </li>
          </ol>

          <h3
            id="features"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            Core Features
          </h3>

          <p className="mb-4 text-gray-700 font-medium">
            Analytics & Data Collection
          </p>
          <ul className="grid xl:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Page views",
                desc: "Knowing which of your pages gets the most traffic is essential to improving your website content.",
              },
              {
                title: "Visitors",
                desc: "Get detailed information about your visitors like their device, browser, OS and location.",
              },
              {
                title: "Bounce rate",
                desc: "See which pages keep your visitors engaged versus those they are abandoning.",
              },
              {
                title: "Traffic sources",
                desc: "See where your traffic is coming from to better understand where you should be spending your effort.",
              },
              {
                title: "Location & Devices",
                desc: "Find out where your visitors are coming from, and the most popular devices used by visitors.",
              },
              {
                title: "Realtime data",
                desc: "Data available in seconds, not days. The data that OkUnix collects is immediately available on your dashboard.",
              },
              {
                title: "Custom events",
                desc: "Track everything that happens on your website like signups and checkouts using custom events.",
              },
              {
                title: "UTM tracking",
                desc: "Measure the effectiveness of your campaign by analyzing UTM query parameters that are automatically collected.",
              },
            ].map((f, i) => (
              <li
                key={`analytics-${i}`}
                className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <Check className="text-green-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-gray-900 block mb-1 text-sm">
                    {f.title}
                  </strong>
                  <span className="text-sm text-gray-600 leading-relaxed block">
                    {f.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mb-4 text-gray-700 font-medium">
            Deep Insights & Comparisons
          </p>
          <ul className="grid xl:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Compare & Breakdown",
                desc: "See your metric performance compared against previous date ranges, and dive deeper using segments and filters.",
              },
              {
                title: "Funnels & Retention",
                desc: "Understand the conversion and drop-off rate of users, and measure your website stickiness by tracking how often users return.",
              },
              {
                title: "Goals",
                desc: "Track your goals for pageviews and events directly within the dashboard.",
              },
              {
                title: "Journey & Routing",
                desc: "Look into your user pathways, how they navigate, what drives conversions, and their entry/exit pages.",
              },
            ].map((f, i) => (
              <li
                key={`insights-${i}`}
                className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <Check className="text-orange-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-gray-900 block mb-1 text-sm">
                    {f.title}
                  </strong>
                  <span className="text-sm text-gray-600 leading-relaxed block">
                    {f.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mb-4 text-gray-700 font-medium">
            Privacy & Data Ownership
          </p>
          <ul className="grid xl:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "GDPR & CCPA Compliant",
                desc: "OkUnix never collects any personal information from your visitors so it is fully compliant.",
              },
              {
                title: "Data Anonymization",
                desc: "All visitor data is anonymized. We apply strict cryptographic hashing to ensure privacy is always protected.",
              },
              {
                title: "No Cookies",
                desc: "OkUnix does not use any tracking cookies, so no annoying cookie banner is required on your website.",
              },
              {
                title: "Full Data Ownership",
                desc: "Data is always in your control. You can self-host on your own infrastructure or export your data at any time.",
              },
            ].map((f, i) => (
              <li
                key={`privacy-${i}`}
                className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-gray-900 block mb-1 text-sm">
                    {f.title}
                  </strong>
                  <span className="text-sm text-gray-600 leading-relaxed block">
                    {f.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <h3
            id="explore"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            Explore the docs
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <a
              href="#guides"
              className="block p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-sm transition-all group"
            >
              <h5 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                Guides
              </h5>
              <p className="text-sm text-gray-500">
                Step-by-step deployment tutorials.
              </p>
            </a>
            <a
              href="#api"
              className="block p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-sm transition-all group"
            >
              <h5 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                API Reference
              </h5>
              <p className="text-sm text-gray-500">
                Endpoints for authentication and data.
              </p>
            </a>
            <a
              href="#cloud"
              className="block p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-sm transition-all group"
            >
              <h5 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                Cloud
              </h5>
              <p className="text-sm text-gray-500">
                Managed hosting solutions.
              </p>
            </a>
          </div>

          <div className="flex gap-6 pt-6 border-t border-gray-100">
            <a
              href="https://github.com/okunix"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/okunix"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              Discord
            </a>
            <a
              href="https://x.com/okunix"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </Section>
      ),
    },
    quickstart: {
      toc: [
        { id: "quick-start", label: "Quick Start", level: 2 },
        { id: "create-account", label: "1. Create an Account", level: 3 },
        { id: "add-website", label: "2. Add Your Website", level: 3 },
        { id: "install-script", label: "3. Install the Script", level: 3 },
      ],
      component: (
        <Section title="Quick Start" icon={Zap}>
          <p className="mb-4">
            Get up and running with Kunix in less than 5 minutes. Follow these
            steps to start tracking your website traffic.
          </p>

          <h3
            id="create-account"
            className="text-lg font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            1. Create an Account
          </h3>
          <p className="mb-4">
            Sign up for a free account on our platform. No credit card required.
          </p>

          <h3
            id="add-website"
            className="text-lg font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            2. Add Your Website
          </h3>
          <p className="mb-4">
            Navigate to your dashboard and click "Add Website". Enter your
            domain name.
          </p>

          <h3
            id="install-script"
            className="text-lg font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            3. Install the Script
          </h3>
          <p className="mb-4">
            Copy the generated tracking snippet and paste it into the{" "}
            <code>&lt;head&gt;</code> of your website.
          </p>

          <CodeBlock>
            {`<script defer data-domain="yourdomain.com" src="https://kunix.com/js/script.js"></script>`}
          </CodeBlock>
        </Section>
      ),
    },
    installation: {
      toc: [
        { id: "installation", label: "Installation", level: 2 },
        { id: "react-nextjs", label: "React / Next.js", level: 3 },
        { id: "standard-html", label: "Standard HTML", level: 3 },
      ],
      component: (
        <Section title="Installation" icon={Layers}>
          <p className="mb-4">
            Detailed instructions for different frameworks and platforms.
          </p>

          <h3
            id="react-nextjs"
            className="font-semibold text-gray-900 mt-6 mb-2 text-lg scroll-mt-24"
          >
            React / Next.js
          </h3>
          <p className="mb-2">
            For Next.js applications, we recommend using the Script component in
            your <code>_app.js</code> or layout file.
          </p>
          <CodeBlock>
            {`import Script from 'next/script'

<Script 
  defer 
  data-domain="yourdomain.com" 
  src="https://kunix.com/js/script.js" 
/>`}
          </CodeBlock>

          <h3
            id="standard-html"
            className="font-semibold text-gray-900 mt-6 mb-2 text-lg scroll-mt-24"
          >
            Standard HTML
          </h3>
          <p className="mb-2">
            Simply add the script tag before the closing{" "}
            <code>&lt;/head&gt;</code> tag.
          </p>
        </Section>
      ),
    },
    dashboard: {
      toc: [
        { id: "dashboard-overview", label: "Dashboard Overview", level: 2 },
        { id: "key-metrics", label: "Key Metrics", level: 3 },
        { id: "real-time", label: "Real-time Data", level: 3 },
      ],
      component: (
        <Section title="Dashboard Overview" icon={FileText}>
          <p>
            The dashboard is your central hub for analytics. Here you can view
            real-time visitors, historical trends, and manage your account
            settings.
          </p>
          <h3
            id="key-metrics"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Key Metrics
          </h3>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>
              <strong>Total Visitors:</strong> Unique visitors to your site.
            </li>
            <li>
              <strong>Pageviews:</strong> Total number of pages viewed.
            </li>
            <li>
              <strong>Bounce Rate:</strong> Percentage of users who leave after
              viewing one page.
            </li>
          </ul>
          <h3
            id="real-time"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Real-time Data
          </h3>
          <p>
            See who is on your site right now, which pages they are viewing, and
            where they are coming from.
          </p>
        </Section>
      ),
    },
    websites: {
      toc: [
        { id: "managing-websites", label: "Managing Websites", level: 2 },
        { id: "add-new-site", label: "Add a New Site", level: 3 },
        { id: "site-settings", label: "Site Settings", level: 3 },
      ],
      component: (
        <Section title="Managing Websites" icon={Globe}>
          <p>
            You can track multiple websites from a single account. Each website
            receives a unique Site ID and tracking script.
          </p>
          <h3
            id="add-new-site"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Add a New Site
          </h3>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>Go to the Dashboard.</li>
            <li>Click the "Add Website" button in the top right.</li>
            <li>Enter your domain (e.g., mysite.com).</li>
            <li>Click "Create".</li>
          </ol>
          <h3
            id="site-settings"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Site Settings
          </h3>
          <p>
            You can configure site-specific settings, such as enabling/disabling
            public dashboards or resetting data.
          </p>
        </Section>
      ),
    },
    analytics: {
      toc: [
        { id: "analytics-metrics", label: "Analytics & Metrics", level: 2 },
        { id: "time-filtering", label: "Time Range Filtering", level: 3 },
        { id: "kpi-definitions", label: "KPI Definitions", level: 3 },
      ],
      component: (
        <Section title="Analytics & Metrics" icon={Database}>
          <p>
            The Okunix engine calculates comparative insights on the fly,
            evaluating millions of node interactions to generate percentage
            deltas across flexible time ranges.
          </p>
          <h3
            id="time-filtering"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Time Range Filtering
          </h3>
          <p>
            The dashboard dynamically accepts `?range=24h`, `?range=7d`, or
            `?range=30d` queries, instantly isolating traffic segments and
            computing prior-period vectors to measure true growth vs stagnation.
          </p>
          <h3
            id="kpi-definitions"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            KPI Definitions
          </h3>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>
              <strong>Visitors:</strong> The volume of totally unique
              cryptographic Session IDs hitting your domain.
            </li>
            <li>
              <strong>Visits:</strong> Total successful page resolutions,
              regardless of user uniqueness.
            </li>
            <li>
              <strong>Bounce Rate:</strong> The ratio of single-hit sessions vs
              multi-hit sessions. Lower is better.
            </li>
          </ul>
        </Section>
      ),
    },
    tracker: {
      toc: [
        { id: "tracking-engine", label: "Tracking Engine", level: 2 },
        { id: "script-injection", label: "Script Injection", level: 3 },
        { id: "payload-extraction", label: "Payload Extraction", level: 3 },
      ],
      component: (
        <Section title="Tracking Engine" icon={Code}>
          <p>
            Okunix operates via an asynchronous, non-blocking telemetry{" "}
            <code>&lt;script&gt;</code> that fires instantly upon page
            resolution, extracting environmental data natively from the browser
            context before dispatching to the{" "}
            <code>POST /api/track/collect</code> ingress gateway.
          </p>

          <h3
            id="script-injection"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Script Injection
          </h3>
          <p>
            The tracker uses modern Single Page Application (SPA) listeners
            hooked into the `history.pushState` and `window.popstate` bindings
            to track seamless client-side routing natively without requiring
            hard refreshes.
          </p>
          <CodeBlock>
            {`// SPA Hook Example
const originalPushState = history.pushState;
history.pushState = function () {
    originalPushState.apply(this, arguments);
    sendData("pageview");
};`}
          </CodeBlock>

          <h3
            id="payload-extraction"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Payload Extraction
          </h3>
          <p>
            The core script assigns both an ephemeral `sessionStorage` token and
            a persistent `localStorage` 10-year generic GUID to maintain user
            anonymity while tracking return-visitor retention loops.
          </p>
        </Section>
      ),
    },
    models: {
      toc: [
        { id: "database-models", label: "Database Models", level: 2 },
        { id: "trackeddata-schema", label: "TrackedData Schema", level: 3 },
        { id: "user-schema", label: "Identity & Roles", level: 3 },
      ],
      component: (
        <Section title="Database Models" icon={Database}>
          <p>
            The backend engine is powered by a high-availability MongoDB cluster
            managed via Mongoose Object Relational Mappers (ORMs) spanning 3
            core tables: `Users`, `Websites`, and `TrackedData`.
          </p>

          <h3
            id="trackeddata-schema"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            TrackedData Schema
          </h3>
          <p>
            The hyper-dense transactional scale of the entire application.
            Designed without nested sub-documents to prioritize massive,
            parallel, un-indexed write speeds.
          </p>
          <CodeBlock>
            {`const trackedDataSchema = new mongoose.Schema({
  websiteId: { type: ObjectId, ref: "Website", required: true },
  url: { type: String, required: true },
  referrer: { type: String, default: "" },
  country: { type: String, default: "Unknown" },
  sessionId: { type: String, required: true },
  visitorId: { type: String }, // 10-Year Token
  event: { type: String, enum: ["pageview", "leave", "custom"] },
  browser: String,
  os: String,
  device: String,
}, { timestamps: true });`}
          </CodeBlock>

          <h3
            id="user-schema"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Identity & Roles
          </h3>
          <p>
            The `User` model manages cryptographic password hashes via `bcrypt`,
            alongside active token-rotation versioning integers (`tokenVersion`)
            ensuring compromised sessions can be permanently terminated
            server-side.
          </p>
        </Section>
      ),
    },
    middleware: {
      toc: [
        { id: "security-middleware", label: "Security & Middleware", level: 2 },
        { id: "rate-limiting", label: "Rate Limiting", level: 3 },
        { id: "jwt-verification", label: "JWT Verification", level: 3 },
      ],
      component: (
        <Section title="Security & Middleware" icon={Lock}>
          <p>
            Complex Express middleware pipes intercept rogue network traffic
            before resolving downstream logic.
          </p>

          <h3
            id="rate-limiting"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            Rate Limiting (`express-rate-limit`)
          </h3>
          <p>
            All authentication vectors (<code>/login</code>,{" "}
            <code>/register</code>, <code>/forgot-password</code>) are strictly
            regulated by a centralized IP firewall dropping connections globally
            if 10 or more requests occur inside a rolling 15 minute window.
          </p>
          <CodeBlock>
            {`// middleware/rateLimiter.js
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP"
});`}
          </CodeBlock>

          <h3
            id="jwt-verification"
            className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24"
          >
            JWT Verification (`verifyToken`)
          </h3>
          <p>
            The engine enforces asymmetric JSON Web Tokens via HTTP-Only active
            cookie storage and explicit Bearer headers. Protected resources will
            hard-reject any `401 Unauthorized` access attempt lacking proper
            signature validation.
          </p>
        </Section>
      ),
    },
    authApi: {
      toc: [
        { id: "authentication-api", label: "Authentication API", level: 2 },
        { id: "auth-endpoints", label: "Core Endpoints", level: 3 },
      ],
      component: (
        <Section title="Authentication API Reference" icon={Lock}>
          <p className="mb-6">
            The `/api/auth` namespace orchestrates all credential initialization
            and destruction pipelines.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Endpoint
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-4 py-3 font-mono text-orange-600">POST</td>
                  <td className="px-4 py-3 font-mono">/register</td>
                  <td className="px-4 py-3 text-gray-600">
                    Securely generates identity & issues token
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-orange-600">POST</td>
                  <td className="px-4 py-3 font-mono">/login</td>
                  <td className="px-4 py-3 text-gray-600">
                    Authenticates standard HTTP requests
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-green-600">GET</td>
                  <td className="px-4 py-3 font-mono">/me</td>
                  <td className="px-4 py-3 text-gray-600">
                    Retrieves protected object model instance
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-red-600">DELETE</td>
                  <td className="px-4 py-3 font-mono">/delete-account</td>
                  <td className="px-4 py-3 text-gray-600">
                    Permanently truncates the associated identity
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      ),
    },
    analyticsApi: {
      toc: [
        { id: "analytics-pipeline", label: "Analytics Pipeline API", level: 2 },
        { id: "analytics-endpoints", label: "Core Endpoints", level: 3 },
      ],
      component: (
        <Section title="Analytics Pipeline Reference" icon={Server}>
          <p className="mb-6">
            The `/api/analytics` namespace connects the Dashboard visualization
            modules to massive read-replica operations. These paths accept
            `?range=24h/7d/30d` variables.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Endpoint
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-4 py-3 font-mono">/stats/:websiteId</td>
                  <td className="px-4 py-3 text-gray-600">
                    Evaluates concurrent comparative deltas (Visitors/Views)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">/heatmap/:websiteId</td>
                  <td className="px-4 py-3 text-gray-600">
                    Projects a 7-day 24-hour activity density matrix
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">/location/:websiteId</td>
                  <td className="px-4 py-3 text-gray-600">
                    Aggregates origin traces via GeoIP into Country/Region
                    mappings
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">/pages/:websiteId</td>
                  <td className="px-4 py-3 text-gray-600">
                    Tracks explicitly isolated client Entry and Exit paths
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      ),
    },
    websiteApi: {
      toc: [
        { id: "website-control", label: "Website Control API", level: 2 },
        { id: "website-endpoints", label: "Core Endpoints", level: 3 },
      ],
      component: (
        <Section title="Website Control API" icon={Globe}>
          <p className="mb-6">
            The `/api/website` paths execute standard RESTful logic regarding
            domain association and structural resets.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Endpoint
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-4 py-3 font-mono text-orange-600">POST</td>
                  <td className="px-4 py-3 font-mono">/createWebsite</td>
                  <td className="px-4 py-3 text-gray-600">
                    Wires a brand new `domain` array strictly to the `userId`
                    bounds
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-green-600">GET</td>
                  <td className="px-4 py-3 font-mono">/getUserWebsites</td>
                  <td className="px-4 py-3 text-gray-600">
                    Builds the dashboard routing library array
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-blue-600">PUT</td>
                  <td className="px-4 py-3 font-mono">/updateWebsite/:id</td>
                  <td className="px-4 py-3 text-gray-600">
                    Reconfigures strings explicitly updating the DB Record
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-red-600">DELETE</td>
                  <td className="px-4 py-3 font-mono">/resetWebsite/:id</td>
                  <td className="px-4 py-3 text-gray-600">
                    Triggers a soft-delete destroying telemetry records while
                    preserving the domain definition structure
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      ),
    },
  };

  const DOC_ORDER = [
    { id: "introduction", label: "Introduction" },
    { id: "quickstart", label: "Quick Start" },
    { id: "installation", label: "Installation" },
    { id: "dashboard", label: "Dashboard Overview" },
    { id: "websites", label: "Managing Websites" },
    { id: "analytics", label: "Analytics & Metrics" },
    { id: "tracker", label: "Tracking Engine" },
    { id: "models", label: "Database Models" },
    { id: "middleware", label: "Security & Middleware" },
    { id: "authApi", label: "Authentication API" },
    { id: "analyticsApi", label: "Analytics Pipeline API" },
    { id: "websiteApi", label: "Website Control API" },
  ];

  const currentDocIndex = DOC_ORDER.findIndex((doc) => doc.id === activeDoc);
  const prevDoc = currentDocIndex > 0 ? DOC_ORDER[currentDocIndex - 1] : null;
  const nextDoc =
    currentDocIndex < DOC_ORDER.length - 1
      ? DOC_ORDER[currentDocIndex + 1]
      : null;

  const currentDoc = contentMap[activeDoc];
  const [activeSectionId, setActiveSectionId] = useState("");

  return (
    <div className="flex xl:flex-row flex-col gap-10 max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {currentDoc ? (
          <>
            {currentDoc.component}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-16 pt-8 border-t border-gray-100">
              {prevDoc ? (
                <button
                  onClick={() => onNavigate(prevDoc.id)}
                  className="group flex flex-col items-start gap-1 p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-sm transition-all text-left"
                >
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-orange-600 transition-colors">
                    Previous
                  </span>
                  <span className="text-gray-900 font-medium group-hover:text-orange-600 transition-colors">
                    {prevDoc.label}
                  </span>
                </button>
              ) : (
                <div /> /* Spacer */
              )}

              {nextDoc ? (
                <button
                  onClick={() => onNavigate(nextDoc.id)}
                  className="group flex flex-col items-end gap-1 p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-sm transition-all text-right"
                >
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-orange-600 transition-colors">
                    Next
                  </span>
                  <span className="text-gray-900 font-medium group-hover:text-orange-600 transition-colors">
                    {nextDoc.label}
                  </span>
                </button>
              ) : (
                <div />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-gray-900">
              Document not found
            </h2>
            <p className="text-gray-500 mt-2">
              The requested documentation section could not be found.
            </p>
          </div>
        )}
      </div>

      {/* Table of Contents - Sidebar */}
      {currentDoc && currentDoc.toc && (
        <div className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-6">
            <h5 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              On this page
            </h5>

            <nav className="flex flex-col">
              {currentDoc.toc.map((item) => (
                <TOCItem key={item.id} item={item} activeId={activeSectionId} />
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Resources
              </h5>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://okunix.tech"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600"
                  >
                    <Globe size={14} /> Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://okunix.tech/blog"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600"
                  >
                    <BookOpen size={14} /> Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SAYOUNCDR/okunix"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600"
                  >
                    <Code size={14} /> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocContent;
