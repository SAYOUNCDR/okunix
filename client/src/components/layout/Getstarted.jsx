import { Link } from "react-router-dom";
import Button from "../common/Button";

const Getstarted = () => {
  return (
    <div className="text-center bg-gray-900 rounded-3xl p-12 md:p-20 relative overflow-hidden ">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to respect your users' privacy?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of developers who have switched to privacy-friendly
          analytics. Start for free, upgrade as you grow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-transparent">
              Get Started for Free
            </Button>
          </Link>
          <Link to="/sponsor">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white border border-gray-500 shadow-lg shadow-gray-800/50"
            >
              Support Our Mission
            </Button>
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default Getstarted