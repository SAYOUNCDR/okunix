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

// Table of contents item component with smooth indicator
const TOCItem = ({ item, activeId }) => {
  const isActive = activeId === item.id;

  return (
    <a
      href={`#${item.id}`}
      className={`relative block text-sm py-1.5 pl-4 transition-colors duration-200 ${
        isActive
          ? "text-orange-600 font-medium"
          : "text-gray-500 hover:text-gray-900"
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
            behavior: "smooth",
          });
        }
      }}
    >
      {isActive && (
        <motion.span
          layoutId="active-indicator"
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500 rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
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
        { id: "why-okunix", label: "Why Okunix?", level: 3 },
        { id: "get-started", label: "Get started", level: 3 },
        { id: "features", label: "Features", level: 3 },
        { id: "explore", label: "Explore the docs", level: 3 },
      ],
      component: (
        <Section title="Introduction" icon={BookOpen}>
          <p className="text-lg leading-relaxed mb-6">
            Okunix is an open-source web analytics platform that respects user
            privacy. No cookies, no tracking across sites, no personal data
            collection. GDPR compliant out of the box.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3">
            <div className="shrink-0 mt-0.5">
              <AlertCircle className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Note</h4>
              <p className="text-sm text-blue-800">
                These docs track the latest version of Okunix. For previous
                versions or migration guides, check our legacy documentation.
              </p>
            </div>
          </div>

          <h3
            id="why-okunix"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            Why Okunix?
          </h3>
          <ul className="grid sm:grid-cols-2 gap-4 mb-8">
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Privacy-first</strong> — No cookies, no fingerprinting, no
              personal data. Your visitors stay anonymous.
            </li>
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Own your data</strong> — Self-host on your infrastructure.
              Your analytics data never leaves your servers.
            </li>
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Lightweight</strong> — The tracking script is under 2KB.
              It won't slow down your site.
            </li>
            <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Simple</strong> — Deploy with Docker or Node.js in
              minutes. No complex configuration required.
            </li>
          </ul>

          <h3
            id="get-started"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            Get started
          </h3>
          <p className="mb-4">
            You can get started immediately by cloning the repo and running the
            stack:
          </p>
          <CodeBlock>
            {`git clone https://github.com/okunix/okunix.git
cd okunix
npm install
npm run start`}
          </CodeBlock>
          <p className="mb-6">
            That's it. Open{" "}
            <a
              href="http://localhost:3000"
              className="text-orange-600 hover:underline"
            >
              http://localhost:3000
            </a>{" "}
            and log in with your admin credentials.
          </p>

          <h3
            id="features"
            className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
          >
            Features
          </h3>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <Check className="text-green-500 shrink-0 mt-1" size={18} />
              <div>
                <strong>Core analytics</strong> — Pageviews, visitors, bounce
                rate, session duration, referrers, browsers, operating systems,
                devices, and countries.
              </div>
            </li>
            <li className="flex gap-3">
              <Check className="text-green-500 shrink-0 mt-1" size={18} />
              <div>
                <strong>Custom events</strong> — Track button clicks, form
                submissions, or any user interaction with a simple data
                attribute or JavaScript call.
              </div>
            </li>
            <li className="flex gap-3">
              <Check className="text-green-500 shrink-0 mt-1" size={18} />
              <div>
                <strong>Advanced insights</strong> — Funnels, user journeys,
                retention analysis, goals, UTM campaign tracking, and cohort
                breakdowns.
              </div>
            </li>
            <li className="flex gap-3">
              <Check className="text-green-500 shrink-0 mt-1" size={18} />
              <div>
                <strong>Sessions</strong> — View individual visitor activity and
                session properties without identifying personal information.
              </div>
            </li>
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
  };

  const DOC_ORDER = [
    { id: "introduction", label: "Introduction" },
    { id: "quickstart", label: "Quick Start" },
    { id: "installation", label: "Installation" },
    { id: "dashboard", label: "Dashboard Overview" },
    { id: "websites", label: "Managing Websites" },
    { id: "analytics", label: "Analytics & Metrics" },
    { id: "authentication", label: "Authentication" },
    { id: "endpoints", label: "API Endpoints" },
    { id: "errors", label: "Error Handling" },
  ];

  const currentDocIndex = DOC_ORDER.findIndex((doc) => doc.id === activeDoc);
  const prevDoc = currentDocIndex > 0 ? DOC_ORDER[currentDocIndex - 1] : null;
  const nextDoc =
    currentDocIndex < DOC_ORDER.length - 1
      ? DOC_ORDER[currentDocIndex + 1]
      : null;

  const currentDoc = contentMap[activeDoc];
  const [activeSectionId, setActiveSectionId] = useState("");

  // Setup efficient scroll spy using IntersectionObserver
  useEffect(() => {
    if (!currentDoc || !currentDoc.toc) return;

    // Create an observer callback
    const callback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio or just pick the first one which is usually the top one
        // Better: prefer the one closer to the top of the viewport?
        // Actually, just picking the first intersecting one is okay enough for this use case
        // But let's handle the case where multiple might trigger
        const visibleEntry = visibleEntries[0];
        setActiveSectionId(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-10% 0px -80% 0px", // Adjusted to be very specific to top area
      threshold: 0,
    });

    // Observe all TOC targets
    currentDoc.toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Also set initial active state
    if (currentDoc.toc.length > 0) {
      setActiveSectionId(currentDoc.toc[0].id);
    }

    return () => observer.disconnect();
  }, [currentDoc, activeDoc]);

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

            <nav className="relative flex flex-col">
              {/* Vertical line track */}
              <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-100" />

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
                    href="#"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Globe size={14} /> Website
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <BookOpen size={14} /> Blog
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
