import { Toaster } from "sonner";

import { useAuthRedirectHandler } from "./hooks/useAuthRedirectHandler";
import { toastOptions } from "./components/ui/toastStyles";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Router from "./routes/Router";

function App() {
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
