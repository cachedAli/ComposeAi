import clsx from "clsx";
import composeAi from "/composeAi.png";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-10 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Logo + Tagline */}
        <div
          className={clsx(
            "flex flex-col items-start gap-4",
            "max-sm:items-center max-sm:text-center"
          )}
        >
          <img
            src={composeAi}
            alt="ComposeAI Logo"
            className="h-10 object-contain"
          />
          <p className="text-sm text-gray-400 max-w-xs">
            Your AI assistant for effortless email writing.
          </p>
        </div>

        {/* Company & Connect */}
        <div className="w-full flex  justify-around">
          <Company />
          <Connect />
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-800 pt-10">
        © {new Date().getFullYear()} ComposeAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

const Company = () => {
  return (
    <nav aria-label="Company" className="flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Company</h3>
      <ul className="text-gray-400 space-y-2">
        <li>
          <a
            href="https://mohammad-ali-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="mailto:contact.monkebytes@gmail.com?subject=Inquiry%20from%20ComposeAI%20Website"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

const Connect = () => {
  return (
    <nav aria-label="Connect" className="flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Connect</h3>
      <ul className="text-gray-400 space-y-2">
        <li>
          <a
            href="https://github.com/cachedAli"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/cachedAli/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://x.com/monkE_aLE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter
          </a>
        </li>
      </ul>
    </nav>
  );
};
