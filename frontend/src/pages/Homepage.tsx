import { useEffect, useRef, useState } from "react";

import HeroSection from "@/components/layouts/homepage/HeroSection";
import Header from "@/components/layouts/Header";
import Features from "@/components/layouts/homepage/Features";
import HowItWorks from "@/components/layouts/homepage/HowItWorks";
import CtaSection from "@/components/layouts/homepage/CtaSection";
import Footer from "@/components/layouts/homepage/Footer";

const Homepage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHero, setIsHero] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHero(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  return (
    <div className="px-4 py-4">
      <Header isHero={isHero} />

      <div ref={headerRef} className="h-1"></div>
      <div className="mt-20 flex flex-col gap-20">
        <HeroSection />
        <Features />
        <HowItWorks />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
