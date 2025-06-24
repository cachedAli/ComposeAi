import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";
import ComposeAiPreview from "/composeAiAssistantPreview.webp";
import Button from "../../ui/Button";
import { preloadEmailAssistant } from "@/routes/preloadRoutes";
import { Helmet } from "react-helmet-async";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>ComposeAI – Write Emails 10x Faster</title>
        <meta
          name="description"
          content="ComposeAI is your AI-powered email assistant that helps you write emails faster, better, and smarter – no signup required!"
        />
        <link rel="canonical" href="https://compose-ai-app.vercel.app/" />

        <meta
          property="og:title"
          content="ComposeAI – Write Emails Faster with AI"
        />
        <meta
          property="og:description"
          content="Draft professional emails faster using our AI-powered assistant – no signup needed."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dz70stseo/image/upload/v1750782271/ComposeAiPreview_uxeijo.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dz70stseo/image/upload/v1750782271/ComposeAiPreview_uxeijo.webp"
        />
        <meta
          name="twitter:title"
          content="ComposeAI – Write Emails 10x Faster"
        />
        <meta
          name="twitter:description"
          content="Draft professional emails faster using our AI-powered assistant – no signup needed."
        />
      </Helmet>

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
            AI-powered email assistant that helps you draft emails faster and
            more effectively.
          </h2>
        </div>

        {/* Button */}
        <div className="flex flex-col items-center justify-center gap-4 "></div>
        <Button
          variant="secondary"
          className="w-[370px] max-sm:text-sm max-sm:w-[280px]"
          onClick={() => {
            preloadEmailAssistant();
            navigate("/email-assistant");
          }}
          onMouseEnter={() => preloadEmailAssistant()}
        >
          Get started for free – no signup needed
        </Button>

        <HeroImg />
      </section>
    </>
  );
};

export default HeroSection;

const HeroImg = () => {
  return (
    <div className="relative flex items-center justify-center mt-6">
      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-500 rounded-lg blur-xl opacity-70 transform -rotate-6 scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 rounded-lg blur-xl opacity-70 transform rotate-6 scale-105"></div>

      <div className="aspect-video w-full max-w-[1000px] overflow-hidden shadow-lg z-10 rounded-2xl flex items-center justify-center bg-[#0d0d0d]">
        <img
          src={ComposeAiPreview}
          loading="lazy"
          alt="ComposeAI Preview"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      <AnimatedLogo />
    </div>
  );
};
