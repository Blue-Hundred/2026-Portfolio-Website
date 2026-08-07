import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { AppThemeProvider } from "./theme/AppThemeProvider";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <App />
  </AppThemeProvider>
);
