import { useCallback, useEffect, useRef, useState } from "react";
import explainerVideo from "@/assets/videos/market-making-explained.mp4";
import explainerPoster from "@/assets/images/market-making-explained-poster.jpg";
import { useReveal } from "./hooks/useReveal";

function formatTime(seconds: number) {
  const s = Number.isFinite(seconds) ? seconds : 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

const HeroPlayer = () => {
  const h1Reveal = useReveal<HTMLHeadingElement>();
  const pReveal = useReveal<HTMLParagraphElement>();
  const stageReveal = useReveal<HTMLDivElement>();

  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(88);
  const [progressPct, setProgressPct] = useState(0);

  const total = duration;

  const play = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    else pause();
  }, [play, pause]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => setPlaying(false);
    const handleLoadedMetadata = () => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const pct = total ? (video.currentTime / total) * 100 : 0;
      setProgressPct(pct);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [total]);

  const seekFromEvent = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const scrub = scrubRef.current;
      const video = videoRef.current;
      if (!scrub || !video) return;
      const rect = scrub.getBoundingClientRect();
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const x = clientX - rect.left;
      const pct = Math.min(1, Math.max(0, x / rect.width));
      video.currentTime = pct * total;
    },
    [total]
  );

  const handleScrubKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;
      if (event.key === "ArrowRight") {
        video.currentTime = Math.min(total, video.currentTime + 5);
        event.preventDefault();
      }
      if (event.key === "ArrowLeft") {
        video.currentTime = Math.max(0, video.currentTime - 5);
        event.preventDefault();
      }
    },
    [total]
  );

  const handlePlayerClick = useCallback(
    (event: React.MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;
      if (event.target === video && !video.paused) pause();
    },
    [pause]
  );

  const handlePlayerKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === " " &&
        document.activeElement &&
        (document.activeElement as HTMLElement).closest(".mm-player") &&
        target.tagName !== "BUTTON"
      ) {
        event.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const player = playerRef.current;
    const video = videoRef.current as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (player?.requestFullscreen) {
      player.requestFullscreen();
    } else if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }, []);

  return (
    <section className="mm-wrap mm-hero">
      <span className="mm-eyebrow">
        <i />
        How It Works
      </span>
      <h1
        ref={h1Reveal.ref}
        className={`mm-reveal ${h1Reveal.revealed ? "mm-in" : ""}`}
      >
        Market making, <span className="mm-g">explained.</span>
      </h1>
      <p
        ref={pReveal.ref}
        className={`mm-reveal ${pReveal.revealed ? "mm-in" : ""}`}
      >
        How idle assets take the market maker&apos;s seat — earn the spread on
        every trade.
      </p>

      <div
        ref={stageReveal.ref}
        className={`mm-stage mm-reveal ${stageReveal.revealed ? "mm-in" : ""}`}
      >
        <div
          className={`mm-player ${playing ? "playing" : ""}`}
          id="mm-player"
          ref={playerRef}
          onClick={handlePlayerClick}
          onKeyDown={handlePlayerKeyDown}
        >
          <video
            ref={videoRef}
            poster={explainerPoster}
            playsInline
            preload="metadata"
          >
            <source src={explainerVideo} type="video/mp4" />
            Your browser doesn&apos;t support embedded video.{" "}
            <a href={explainerVideo}>Download the explainer</a>.
          </video>

          <span className="mm-bracket mm-tl" />
          <span className="mm-bracket mm-tr" />
          <span className="mm-bracket mm-bl" />
          <span className="mm-bracket mm-br" />

          <button
            className="mm-big-play"
            aria-label="Play the explainer video"
            onClick={play}
          >
            <span className="mm-ripple" />
            <span className="mm-disc">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          <div className="mm-controls">
            <button
              className="mm-ctrl"
              aria-label={playing ? "Pause" : "Play"}
              onClick={toggle}
            >
              <svg viewBox="0 0 24 24">
                {playing ? (
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>
            <div
              className="mm-scrub"
              ref={scrubRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressPct)}
              onClick={seekFromEvent}
              onKeyDown={handleScrubKeyDown}
            >
              <div
                className="mm-scrub-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="mm-time">
              {formatTime(currentTime)} / {formatTime(total)}
            </span>
            <button
              className="mm-ctrl"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            >
              <svg viewBox="0 0 24 24">
                {muted ? (
                  <>
                    <path d="M3 9v6h4l5 5V4L7 9H3z" />
                    <path
                      d="M16 9l5 5m0-5l-5 5"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
                )}
              </svg>
            </button>
            <button
              className="mm-ctrl"
              aria-label="Fullscreen"
              onClick={toggleFullscreen}
            >
              <svg viewBox="0 0 24 24">
                <path d="M7 3H5a2 2 0 0 0-2 2v2h2V5h2V3zm10 0v2h2v2h2V5a2 2 0 0 0-2-2h-2zM5 17H3v2a2 2 0 0 0 2 2h2v-2H5v-2zm14 0v2h-2v2h2a2 2 0 0 0 2-2v-2h-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mm-meta">
          <span>Runtime 1:28</span>
          <span className="mm-dot" />
          <span>Market-making mechanics</span>
        </div>
      </div>
    </section>
  );
};

export default HeroPlayer;
