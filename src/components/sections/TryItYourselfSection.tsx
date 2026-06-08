import { useEffect, useRef } from "react";

const TryItYourselfSection = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resize = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const h = Math.max(
          doc.body.scrollHeight,
          doc.documentElement.scrollHeight,
        );
        iframe.style.height = h + "px";
      } catch (e) {
        // ignore
      }
    };

    const onLoad = () => {
      resize();
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const ro = new ResizeObserver(resize);
        ro.observe(doc.body);
      } catch (e) {
        // ignore
      }
      // safety re-checks
      [200, 600, 1500, 3000].forEach((t) => setTimeout(resize, t));
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", resize);
    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="try-it-yourself"
      className="relative border-b border-purple-500/10"
    >
      <iframe
        ref={iframeRef}
        src="/try-it-yourself.html"
        title="Try It Yourself - Balcore Interactive Demo"
        className="w-full block"
        style={{ border: 0, background: "transparent", minHeight: "100vh" }}
        scrolling="no"
      />
    </section>
  );
};

export default TryItYourselfSection;
