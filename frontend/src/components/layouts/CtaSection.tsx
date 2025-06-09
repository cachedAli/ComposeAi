import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

import Button from "../ui/Button";

const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center flex-col gap-8 py-6 px-2 text-center">
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
        onClick={() => navigate("/signup")}
      >
        Start Writing Better Emails Now <ArrowRight size={30} />
      </Button>
    </section>
  );
};

export default CtaSection;
