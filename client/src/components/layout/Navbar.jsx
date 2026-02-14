import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";
import Button from "../common/Button";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const Navbar = () => {
  const [stars, setStars] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    // Fetch GitHub stars
    const fetchStars = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/#/okunix");
        if (res.ok) {
          const data = await res.json();
          // Use nullish coalescing to allow 0 as a valid value
          setStars(data.stargazers_count ?? 0);
        }
      } catch (error) {
        console.error("Failed to fetch stars:", error);
        setStars(0);
      }
    };

    fetchStars();
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-sm transition-all duration-300">
      <nav className="flex items-center justify-between px-6 py-3 w-full">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-0.5"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/h.png"
            alt="OkUnix Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="font-bold text-xl tracking-tight text-gray-900">
            kunix
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/features"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            to="/docs"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/sponsor"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            Sponsor
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

          <Button
            variant="ghost"
            className="hidden md:inline-flex px-4!"
            onClick={() => setIsLoginOpen(true)}
          >
            Login
          </Button>

          <Button
            variant="primary"
            className="hidden md:inline-flex px-5! py-2!"
            onClick={() => setIsRegisterOpen(true)}
          >
            Sign Up
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
          <Link
            to="/features"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/docs"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Docs
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/sponsor"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sponsor
          </Link>

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start px-0! text-gray-600 hover:text-gray-900"
              onClick={() => {
                setIsMenuOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Login
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => {
                setIsMenuOpen(false);
                setIsRegisterOpen(true);
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
};

export default Navbar;
