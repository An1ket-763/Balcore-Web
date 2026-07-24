import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
