import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const Hero = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
    <section className="pt-24 pb-16 pl-4 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center overflow-x-hidden md:overflow-visible ">
      <div className="w-full lg:w-[45%] text-center lg:text-left z-20  shrink-0 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-12 leading-[1.1] tracking-tight">
            Simple Analytics. <br />
            Zero Compromise.
          </h1>
          <p className="text-lg md:text-md text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Track essential metrics without invading privacy.{" "}
            <br className="hidden md:block" />
            No banners. No noise. Just insights.
          </p>

          <div className="flex flex-row gap-4 justify-center lg:justify-start">
            <Button
              className="w-auto px-4! py-2! text-md! h-auto bg-orange-600 text-white hover:bg-orange-700 hover:border-orange-700 shadow-lg shadow-orange-200/50"
              onClick={() => setIsLoginOpen(true)}
            >
              Start Free Trial
            </Button>
            <Link to="/docs">
              <Button
                variant="ghost"
                className="w-auto px-4! py-2! text-md! h-auto  bg-slate-300 text-gray-700 border border-gray-300 shadow-sm "
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[70%] lg:-ml-[15%] mt-12 lg:mt-0 relative z-10">
        <div className="relative">
          <img
            src="/Analytics-Photoroom.webp"
            alt="OkUnix Analytics Dashboard"
            className="w-full h-auto"
          />
        </div>
      </div>

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
    </section>
  );
};

export default Hero;
