import { useEffect, useRef } from "react";
import learnStyles from "./LearnTab.css?inline";
import learnBody from "@/assets/learn/body.html?raw";
import learnScript from "@/assets/learn/script.js?raw";

// Bundle every video file in src/assets/videos so Vite hashes & serves them.
const videoUrls = import.meta.glob("@/assets/videos/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Map a REELS slug -> filename basename (without extension) in src/assets/videos.
// Edit these mappings if a slug should point to a different file.
const SLUG_TO_FILE: Record<string, string> = {
  "01-the-locked-door": "The_Locked_Door",
  "02-cool-under-fire": "Cool_Under_Fire",
  "03-same-assets-different-outcome": "Same_Assets_Different_Outcome",
  "04-fixing-day-one": "Fixing_Day_One",
  "05-go-touch-the-grass": "Go_Touch_The_Grass",
  "06-the-lemonade-stand": "The_Lemonade_Stand",
  "07-passing-through": "Passing_Through",
  "08-two-kinds-of-people": "Two_Kindsof_People",
  "09-the-currency-booth": "The_Currency_Booth",
  "10-walkthrough-44s": "The_Engine",
};

// Build slug -> resolved bundled URL
const buildVideoMap = (): Record<string, string> => {
  const byBasename: Record<string, string> = {};
  for (const [path, url] of Object.entries(videoUrls)) {
    const base = path.split("/").pop()?.replace(/\.mp4$/i, "") ?? "";
    byBasename[base] = url;
  }
  const map: Record<string, string> = {};
  for (const [slug, base] of Object.entries(SLUG_TO_FILE)) {
    if (byBasename[base]) map[slug] = byBasename[base];
  }
  return map;
};

const LearnTab = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Expose video URL map before the page script runs.
    (window as any).__LEARN_VIDEOS = buildVideoMap();

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-learn-tab", "");
    styleEl.textContent = learnStyles;
    document.head.appendChild(styleEl);

    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("data-learn-tab", "");
    scriptEl.textContent = learnScript;
    document.body.appendChild(scriptEl);

    const prevTitle = document.title;
    document.title = "Balcore — Learn";

    return () => {
      styleEl.remove();
      scriptEl.remove();
      document.title = prevTitle;
      delete (window as any).__LEARN_VIDEOS;
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
