import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import Button from "../common/Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Fetch GitHub stars (replace with your actual repo)
    fetch("https://api.github.com/repos/sayoun/okunix")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count || 0))
      .catch(() => setStars(0));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
        isScrolled ? "pt-4" : ""
      }`}
    >
      <nav
        className={`
          transition-all duration-300 
          flex items-center justify-between 
          px-6 py-3
          ${
            isScrolled
              ? "w-[90%] max-w-6xl bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200/50"
              : "w-full bg-white border-b border-gray-100"
          }
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5">
          <img
            src="/h.png"
            alt="OkUnix Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="font-bold text-xl tracking-tight text-gray-900">
            kUnix
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/features"
            className="text-gray-600 hover:text-[#F38020] font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-gray-600 hover:text-[#F38020] font-medium transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/docs"
            className="text-gray-600 hover:text-[#F38020] font-medium transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-[#F38020] font-medium transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* GitHub Stars */}
          <a
            href="https://github.com/SAYOUNCDR/okunix"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mr-2"
          >
            <Github size={20} />
            <span className="font-medium">{stars}</span>
          </a>

          <Link to="/login">
            <Button variant="ghost" className="px-4!">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="primary" className="px-5! py-2!">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
