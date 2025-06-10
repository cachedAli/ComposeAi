import { useScrollToTop } from "./hooks/useScrollToTop";
import Router from "./routes/Router";

function App() {
  useScrollToTop();
  return (
    <>
      <div className="antialiased">
        <Router />
      </div>
    </>
  );
}

export default App;
