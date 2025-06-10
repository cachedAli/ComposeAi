import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import Button from "../../ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center flex-col gap-6 py-6 px-2 text-center">
      {/* Tagline */}
      <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 px-4 rounded-full text-sm flex items-center gap-2">
        <Zap size={16} />
        <h2 className="max-sm:text-xs">Boost Your Email Productivity</h2>
      </span>

      {/* Headline */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[1000px]">
        <h1 className={clsx("text-5xl font-bold", "max-sm:text-4xl")}>
          Transform the Way You Write Emails with{" "}
          <span
            className={clsx(
              "text-transparent bg-clip-text bg-gradient-to-b from-cyan-500 to-emerald-400",
              "max-sm:text-4xl"
            )}
          >
            AI
          </span>
        </h1>

        {/* Subheading */}
        <h2 className={clsx("text-xl text-gray-100", "max-sm:text-base")}>
          AI-powered email assistant that helps you draft emails faster and more
          effectively.
        </h2>
      </div>

      {/* Sign UpButton */}
      <Button
        variant="secondary"
        className="w-60"
        onClick={() => navigate("/signup")}
      >
        Get Started For Free
      </Button>

      <HeroImg />
    </section>
  );
};

export default HeroSection;

const HeroImg = () => {
  return (
    <div className="relative flex items-center justify-center mt-6">
      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-500 rounded-lg blur-xl opacity-70 transform -rotate-6 scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 rounded-lg blur-xl opacity-70 transform rotate-6 scale-105"></div>

      <span className="h-[500px] w-[1000px] bg-gray-800 z-10 rounded-2xl text-4xl flex items-center justify-center">
        Image Placeholder
      </span>
      <AnimatedLogo/>
    </div>
  );
};
