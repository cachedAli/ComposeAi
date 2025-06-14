import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";
import { Suspense } from "react";

const LazyLoader = ({
  children,
  fallback: FallbackComponent,
}: {
  children: React.ReactNode;
  fallback?: React.ElementType;
}) => {
  return (
    <Suspense
      fallback={FallbackComponent ? <FallbackComponent /> : <div className="flex items-center justify-center h-screen"><AnimatedLogo home={false}/></div>}
    >
      {children}
    </Suspense>
  );
};

export default LazyLoader;
