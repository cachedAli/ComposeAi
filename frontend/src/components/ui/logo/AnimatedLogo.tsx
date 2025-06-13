import { motion } from "framer-motion";

import logo from "/composeAiLogo.png";
import clsx from "clsx";

export const AnimatedLogo = ({ home = true }: { home?: boolean }) => {
  return (
    <motion.img
      src={logo}
      className={clsx(home ? "absolute -top-16 -right-16 z-20" : "h-24")}
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
