import clsx from "clsx";

import { howItWorks } from "@/libs/constants/homepageConstants";

const HowItWorks = () => {
  return (
    <div
      id="howItWorks"
      className="flex items-center justify-center flex-col gap-6 py-6 px-2 text-center"
    >
      {/* Tagline */}
      <span className="border border-t-cyan-500 border-r-cyan-500 border-l-indigo-500 border-b-indigo-500 py-2 px-4 rounded-full text-sm flex items-center gap-2">
        <h2 className="max-sm:text-xs">How It Works</h2>
      </span>

      {/* Headline */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[1000px]">
        <h1
          className={clsx("text-5xl font-bold leading-14", "max-sm:text-4xl")}
        >
          Get started with ComposeAI in three simple steps
        </h1>
      </div>
      <HowItWorksSteps />
    </div>
  );
};

export default HowItWorks;

const HowItWorksSteps = () => {
  return (
    <div className={clsx("flex flex-wrap items-center gap-4 mt-20")}>
      {howItWorks.map((steps, i) => (
        <HowItWorksCard key={i} steps={steps} />
      ))}
    </div>
  );
};

const HowItWorksCard = ({ steps }: { steps: any }) => {
  return (
    <section
      className={clsx(
        "group border border-gray-700 border-l-indigo-500 flex flex-col justify-center items-center rounded-2xl p-8 flex-1 h-full text-start gap-24 transition-colors duration-300",
        "hover:border-b-indigo-500 hover:border-t-cyan-500 hover:border-r-cyan-500"
      )}
    >
      <div className="flex flex-col gap-4">
        <h2 className={clsx("text-3xl font-bold")}>{steps.title}</h2>
        <p className={clsx("text-lg text-gray-300")}>{steps.description}</p>
      </div>

      {/* Icon */}
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        <steps.icon
          size={200}
          className="text-cyan-500 group-hover:text-cyan-300 z-10 transition duration-300"
        />

        {/* Gradient overlays */}
        <GradientOverlays />
      </div>
    </section>
  );
};

const GradientOverlays = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-500 rounded-lg blur-xl opacity-0 group-hover:opacity-70 transform -rotate-6 scale-105 transition duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 rounded-lg blur-xl opacity-0 group-hover:opacity-70 transform rotate-6 scale-105 transition duration-300"></div>
    </>
  );
};
