import clsx from "clsx";
import { motion } from "framer-motion";

import { howItWorks } from "@/libs/constants/homepageConstants";
import { Helmet } from "react-helmet-async";

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How ComposeAI Works – AI Email Assistant</title>
        <meta
          name="description"
          content="Learn how ComposeAI helps you write better emails in 3 simple steps using AI-powered suggestions and tools."
        />
        <link
          rel="canonical"
          href="https://compose-ai-app.vercel.app/#howItWorks"
        />
      </Helmet>
      <section
        id="howItWorks"
        className="flex items-center justify-center flex-col gap-6 py-6 px-2 text-center max-w-screen-2xl mx-auto"
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
      </section>
    </>
  );
};

export default HowItWorks;

const HowItWorksSteps = () => {
  return (
    <div className={clsx("flex flex-wrap items-center gap-4 mt-20")}>
      {howItWorks.map((steps, i) => (
        <HowItWorksCard key={i} steps={steps} i={i} />
      ))}
    </div>
  );
};

const HowItWorksCard = ({ steps, i }: { steps: any; i: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
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
          className="text-cyan-500 z-10 transition duration-300 group-hover:animate-pulse"
        />
      </div>
    </motion.article>
  );
};
