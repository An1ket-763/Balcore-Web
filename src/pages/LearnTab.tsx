import { useEffect, useRef } from "react";
import learnStyles from "./LearnTab.css?inline";
import learnBody from "@/assets/learn/body.html?raw";
import learnScript from "@/assets/learn/script.js?raw";

/**
 * Renders the standalone "Balcore — Learn" page.
 *
 * The original page ships as a single-file HTML document containing its own
 * <style> and <script>. To keep it working exactly as designed without
 * bleeding styles into the rest of the app, we mount its CSS and JS only
 * while this route is active and tear them down on unmount.
 */
const LearnTab = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Inject page-scoped stylesheet
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-learn-tab", "");
    styleEl.textContent = learnStyles;
    document.head.appendChild(styleEl);

    // Inject page script after the DOM is set
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("data-learn-tab", "");
    scriptEl.textContent = learnScript;
    document.body.appendChild(scriptEl);

    // Preserve the original document title
    const prevTitle = document.title;
    document.title = "Balcore — Learn";

    return () => {
      styleEl.remove();
      scriptEl.remove();
      document.title = prevTitle;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="balcore-learn"
      dangerouslySetInnerHTML={{ __html: learnBody }}
    />
  );
};

export default LearnTab;
