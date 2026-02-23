import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";
import Button from "../common/Button";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-sm transition-all duration-300">
      <nav className="flex items-center justify-between px-6 py-3 w-full">
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

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/SAYOUNCDR/okunix"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mr-2"
          >
            <Github size={20} />
            <span className="font-medium">4</span>
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

          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

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
