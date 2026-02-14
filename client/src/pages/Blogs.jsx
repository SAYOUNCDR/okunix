import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const BlogItem = ({ title, date, readTime, description, image, slug }) => (
  <div className="group relative py-8 first:pt-0 last:pb-0">
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      {/* Thumbnail */}
      <div className="shrink-0">
        <div className="w-15 h-15 rounded-lg overflow-hidden flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-orange-300 font-bold text-2xl border border-gray-200 rounded-lg w-full h-full flex items-center justify-center">
              {title.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 w-full">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors flex items-center gap-2">
            <Link to={`/blog/${slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {title}
            </Link>
            <ChevronRight
              size={16}
              className="text-gray-400 group-hover:text-orange-500 transition-colors"
            />
          </h3>
          <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">
            {readTime}
          </span>
        </div>

        {/* Date Row */}
        <div className="text-xs text-gray-400 mb-3 font-medium">{date}</div>

        {/* Description Row */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>

    {/* Divider */}
    <div className="absolute bottom-0 left-0 w-full border-b border-dashed border-gray-200 group-last:hidden mt-8" />
  </div>
);

const Blogs = () => {
  const posts = [
    {
      slug: "privacy-shield",
      title: "The Future of Privacy Shield 2.0",
      date: "February 12, 2026",
      readTime: "5 min read",
      description:
        "Understanding the implications of the new data transfer framework between the EU and US, and what it means for your business compliance strategy.",
      image: null, // Using placeholder for now
    },
    {
      slug: "open-source-analytics",
      title: "Why Open Source Analytics Matter",
      date: "January 28, 2026",
      readTime: "8 min read",
      description:
        "Proprietary analytics tools often hide how they process data. Discover why open-source transparency is becoming the new standard for trust.",
      image: null,
    },
    {
      slug: "cookieless-future",
      title: "Navigating a Cookieless World",
      date: "January 15, 2026",
      readTime: "6 min read",
      description:
        "With third-party cookies crumbling, first-party data strategies are essential. Learn how to adapt your marketing without compromising privacy.",
      image: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Insights & <span className="text-orange-600">Thoughts</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Exploring the intersection of privacy, technology, and analytics.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {posts.map((post) => (
              <BlogItem key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;
