import { motion } from "framer-motion";

import logo from "/composeAiLogo.png";
import clsx from "clsx";

export const AnimatedLogo = ({ home = true }: { home?: boolean }) => {
  return (
    <motion.img
      src={logo}
      className={clsx(
        "pointer-events-none",
        home
          ? "absolute -top-15 -right-10 z-20 max-lg:h-36 max-lg:-right-5 max-lg:-top-12 max-md:h-28 max-md:-top-10 max-sm:h-20 max-sm:-right-2 max-sm:-top-6"
          : "h-24"
      )}
      animate={{
        y: [0, -10, 0, 10, 0],
        rotate: [0, 2, -2, 2, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
};
