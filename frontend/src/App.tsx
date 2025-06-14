import { Toaster } from "sonner";

import { useAuthRedirectHandler } from "./hooks/useAuthRedirectHandler";
import { toastOptions } from "./components/ui/toastStyles";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Router from "./routes/Router";
import { useAuthStore } from "./store/useAuthStore";
import { useEmailAssistantStore } from "./store/useEmailAssistantStore";
import { useEffect } from "react";

function App() {
  const { checkAuth } = useAuthStore();
  const setLoading = useEmailAssistantStore((state) => state.setLoading);

  useEffect(() => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;

    const isMagicLink = hash.includes("access_token");
    const isAuthRoute =
      pathname === "/reset-password" || pathname === "/auth/callback";

    if (isMagicLink || isAuthRoute) {
      useEmailAssistantStore.getState().setLoading(false);
      return;
    } else {
      checkAuth().finally(() => setLoading(false));
    }
  });
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
