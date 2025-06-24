import { useState } from "react";
import clsx from "clsx";

import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { useMessagesStore } from "@/store/useMessagesStore";
import { preloadSignin } from "@/routes/preloadRoutes";
import { useUserStore } from "@/store/useUserStore";
import composeAi from "/composeAi.png";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

type HeaderProps = {
  isHero?: boolean;
  isAssistant?: boolean;
};

const Header = ({ isHero, isAssistant = false }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full px- z-50",
        isAssistant ? "px-8 max-sm:px-2 mt-2 max-sm:mt-0" : "px-8 mt-4"
      )}
    >
      <div className="relative">
        <div
          className={clsx(
            "w-full rounded-xl py-2 h-16 flex items-center border justify-between bg-[#0d0d0d] transition-colors duration-300",
            isHero ? "border border-gray-700 shadow-md" : "border-transparent",
            isAssistant ? "px-0" : "px-4"
          )}
        >
          {!isAssistant && (
            /* Hamburger Menu - only on small screens */
            <div className="sm:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          )}

          {/* Logo + Nav (hidden on small screens) */}
          <Nav isAssistant={isAssistant} />

          {isAssistant && <MessagesLoader />}

          <Buttons />
        </div>

        {/* Mobile Nav Dropdown */}
        {!isAssistant && menuOpen && <MobileNav />}
      </div>
    </header>
  );
};

export default Header;

const Nav = ({ isAssistant }: { isAssistant?: boolean }) => {
  return (
    <nav className="flex items-center gap-10">
      {/* Logo */}
      <Link to="/">
        <img src={composeAi} alt="ComposeAi" className="h-10 max-sm:h-8" />
      </Link>

      {/* Nav items */}
      {!isAssistant && (
        <ul className="flex gap-6 text-sm text-gray-200 max-sm:hidden">
          <a href="#features">
            <li className="hover:text-cyan-500 cursor-pointer transition-colors">
              Features
            </li>
          </a>

          <a href="#howItWorks">
            <li className="hover:text-cyan-500 cursor-pointer transition-colors">
              How it Works
            </li>
          </a>
        </ul>
      )}
    </nav>
  );
};

const MobileNav = () => {
  return (
    <nav
      className={clsx(
        "sm:hidden absolute top-full left-0  w-full bg-[#1a1a1a] border border-gray-700 rounded-xl mt-2 p-4 z-50 "
      )}
    >
      <ul className="flex flex-col gap-4 text-sm text-gray-200">
        <a href="#features">
          <li className="hover:text-cyan-500 cursor-pointer transition-colors">
            Features
          </li>
        </a>

        <a href="#howItWorks">
          <li className="hover:text-cyan-500 cursor-pointer transition-colors">
            How it Works
          </li>
        </a>
      </ul>
    </nav>
  );
};

const Buttons = () => {
  const { setLogout } = useEmailAssistantStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div>
      {!user ? (
        /* Sign in Button */
        <Button
          onClick={() => {
            preloadSignin();
            navigate("/signin");
          }}
          onMouseEnter={() => preloadSignin()}
          variant="primary"
          className="h-10 max-[400px]:text-xs"
        >
          Sign in
        </Button>
      ) : (
        // Logout Button
        <Button
          onClick={() => setLogout(true)}
          variant="primary"
          className="h-10 max-[400px]:text-xs"
        >
          Logout
        </Button>
      )}
    </div>
  );
};

const MessagesLoader = () => {
  const fetchMessagesLoading = useMessagesStore(
    (state) => state.fetchMessagesLoading
  );
  const user = useUserStore((state) => state.user);

  if (!fetchMessagesLoading) return null;

  return (
    user && (
      <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
        <Loader />
        <span> Loading conversation...</span>
      </div>
    )
  );
};
