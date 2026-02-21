import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { COLOR_HSL, COLOR_RGB } from "@/constants/colors";

document.documentElement.style.setProperty("--color", COLOR_HSL);
document.documentElement.style.setProperty("--color-rgb", COLOR_RGB);

createRoot(document.getElementById("root")!).render(<App />);
