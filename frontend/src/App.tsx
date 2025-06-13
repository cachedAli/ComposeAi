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
    checkAuth().finally(() => setLoading(false));
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
