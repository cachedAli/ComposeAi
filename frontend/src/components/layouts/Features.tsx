import clsx from "clsx";

import { features } from "@/libs/constants/homepageConstants";

const Features = () => {
  return (
    <section
      id="features"
      className="flex items-center justify-center flex-col gap-6 py-6 px-2 text-center"
    >
      {/* Tagline */}
      <span className="border border-t-cyan-500 border-r-cyan-500 border-l-indigo-500 border-b-indigo-500 py-2 px-4 rounded-full text-sm flex items-center gap-2">
        <h2 className="max-sm:text-xs">Features</h2>
      </span>

      {/* Headline */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[1000px]">
        <h1
          className={clsx("text-5xl font-bold leading-14", "max-sm:text-4xl")}
        >
          Discover how ComposeAI can transform your email workflow{" "}
        </h1>
      </div>

      <AllFeatures />
    </section>
  );
};

export default Features;

const AllFeatures = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-3 justify-items-center gap-y-10 gap-x-10 mt-20",
        "max-md:grid-cols-2",
        "max-sm:grid-cols-1"
      )}
    >
      {features.map((feature, i) => (
        <div key={i} className="flex flex-col items-center justify-center">
          <span className="size-24 bg-[#1F1D27] flex items-center justify-center rounded-full mb-4">
            <feature.icon size={30} className="text-cyan-500" />
          </span>
          <div className="max-w-[350px] space-y-1 text-center">
            <h1 className={clsx("text-2xl font-medium")}>{feature.title}</h1>
            <p className={clsx("text-lg text-gray-300")}>
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
