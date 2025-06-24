import { useEffect } from "react";

import { Toaster } from "sonner";

import { useAuthRedirectHandler } from "./hooks/useAuthRedirectHandler";
import { useEmailAssistantStore } from "./store/useEmailAssistantStore";
import { toastOptions } from "./components/ui/toastStyles";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useAuthStore } from "./store/useAuthStore";
import Router from "./routes/Router";

function App() {
  const { checkAuth } = useAuthStore();
  const setLoading = useEmailAssistantStore((state) => state.setLoading);

  useEffect(() => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;

    const isMagicLink = hash.includes("access_token");
    const isMagicReset = isMagicLink && pathname === "/reset-password";

    const isAuthCallback = pathname === "/auth/callback";

    if (isMagicReset || isAuthCallback) {
      setLoading(false);
    } else {
      checkAuth().finally(() => setLoading(false));
    }
  }, []);
  useScrollToTop();
  useAuthRedirectHandler();

  return (
    <>
      <div className="antialiased">
        <Router />
        <Toaster position="top-right" toastOptions={toastOptions} />
      </div>
    </>
  );
}

export default App;
