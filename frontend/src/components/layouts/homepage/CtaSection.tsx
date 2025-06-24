import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { preloadSignup } from "@/routes/preloadRoutes";
import Button from "../../ui/Button";

const CtaSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex items-center justify-center flex-col gap-8 py-6 px-2 text-center"
    >
      {/* Headline */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[1000px]">
        <h1 className={clsx("text-5xl font-bold", "max-sm:text-4xl")}>
          Ready to{" "}
          <span
            className={clsx(
              "text-transparent bg-clip-text bg-gradient-to-b from-cyan-500 to-emerald-400",
              "max-sm:text-4xl"
            )}
          >
            supercharge
          </span>{" "}
          your emails?
        </h1>
      </div>

      {/* Sign UpButton */}
      <Button
        variant="secondary"
        className="w-96 max-sm:w-full max-sm:text-xs"
        onMouseEnter={() => preloadSignup()}
        onClick={() => {
          preloadSignup();
          navigate("/signup");
        }}
      >
        Start Writing Better Emails Now <ArrowRight size={30} />
      </Button>
    </motion.section>
  );
};

export default CtaSection;
