import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { AppThemeProvider } from "./theme/AppThemeProvider";
import appStyles from "./styles/index.css?inline";

const styleElement = document.createElement("style");
styleElement.dataset.appStyles = "";
styleElement.textContent = appStyles;
document.head.appendChild(styleElement);

createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <App />
  </AppThemeProvider>
);
