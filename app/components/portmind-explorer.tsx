'use client'
import { useEffect, useRef, useState } from 'react'

const regions = [
  {
    label: "Truck + empty chassis",
    x: 542,
    y: 390,
    w: 82,
    h: 160,
    copy: "A truck towing an empty chassis counts as a container-truck task.",
  },
  {
    label: "Container stack",
    x: 1590,
    y: 485,
    w: 310,
    h: 235,
    copy: "A stack of containers is not a truck attachment.",
  },
  {
    label: "Shipping containers",
    x: 1325,
    y: 390,
    w: 250,
    h: 190,
    copy: "Look for the truck and its attachment, not just a container.",
  },
  {
    label: "Containers beside the road",
    x: 2080,
    y: 680,
    w: 375,
    h: 275,
    copy: "Containers nearby do not make a vehicle a container truck.",
  },
];
export function PortImageExplorer() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [pulse, setPulse] = useState(0);
  const stopped = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const svg = stage.current?.querySelector("svg");
      if (svg)
        svg.setAttribute(
          "viewBox",
          stage.current!.clientWidth < 600
            ? "0 0 2560 1440"
            : "0 180 2560 1000",
        );
    });
    if (stage.current) observer.observe(stage.current);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let start = Math.floor(Math.random() * regions.length);
    try {
      const previous = Number(
        sessionStorage.getItem("portmind-hero-start") ?? -1,
      );
      if (start === previous) start = (start + 1) % regions.length;
      sessionStorage.setItem("portmind-hero-start", String(start));
    } catch {}
    const timers: ReturnType<typeof setTimeout>[] = [];
    const stop = () => {
      stopped.current = true;
    };
    stopped.current = false;
    if (!media.matches)
      for (let i = 0; i < 3; i++)
        timers.push(
          setTimeout(
            () => {
              if (!stopped.current && !document.hidden)
                setActive((start + i) % regions.length);
            },
            100 + i * 1300,
          ),
        );
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      media.removeEventListener("change", stop);
    };
  }, []);
  function nearest(x: number, y: number) {
    const rect = stage.current!.getBoundingClientRect();
    const px = ((x - rect.left) / rect.width) * 2560,
      py =
        (rect.width < 600 ? 0 : 180) +
        ((y - rect.top) / rect.height) * (rect.width < 600 ? 1440 : 1000);
    return regions.reduce(
      (best, r, i) =>
        Math.hypot(px - r.x - r.w / 2, py - r.y - r.h / 2) <
        Math.hypot(
          px - regions[best].x - regions[best].w / 2,
          py - regions[best].y - regions[best].h / 2,
        )
          ? i
          : best,
      0,
    );
  }
  return (
    <figure className="port-explorer hero-canvas pm-live" id="images">
      <div
        ref={stage}
        className="port-image-stage"
        role="button"
        tabIndex={0}
        aria-label="Explore the port image. Move your pointer to highlight objects. Click to hold or release. Use arrow keys to explore, Enter to hold, Escape to clear."
        aria-pressed={pinned}
        data-keyboard={keyboard}
        data-pinned={pinned}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") {
            stopped.current = true;
            setKeyboard(false);
            if (!pinned) setActive(nearest(e.clientX, e.clientY));
          }
        }}
        onPointerLeave={() => {
          if (!pinned) setActive(null);
        }}
        onClick={(e) => {
          stopped.current = true;
          setKeyboard(false);
          const next = nearest(e.clientX, e.clientY);
          if (pinned && next === active) {
            setPinned(false);
          } else {
            setActive(next);
            setPinned(true);
            setPulse((p) => p + 1);
          }
        }}
        onFocus={() => {
          stopped.current = true;
          setKeyboard(true);
        }}
        onKeyDown={(e) => {
          if (
            ["ArrowRight", "ArrowLeft", "Enter", " ", "Escape"].includes(e.key)
          ) {
            e.preventDefault();
            stopped.current = true;
            setKeyboard(true);
            if (e.key === "Escape") {
              setPinned(false);
              setActive(null);
            } else if (e.key === "Enter" || e.key === " ") {
              setActive(active ?? 0);
              setPinned(!pinned);
            } else {
              setActive(
                ((active ?? 0) +
                  (e.key === "ArrowRight" ? 1 : regions.length - 1)) %
                  regions.length,
              );
              setPinned(false);
            }
          }
        }}
      >
        <svg
          viewBox="0 180 2560 1000"
          className="port-image-svg"
          aria-hidden="true"
        >
          <image
            href="/images/case-studies/portmind-paper/montreal-viterra.jpg"
            width="2560"
            height="1440"
          />
          {regions.map((r, i) => (
            <g
              key={r.label}
              className="hero-region"
              data-active={active === i}
              data-near={active !== null && i === (active + 1) % regions.length}
            >
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                className="hero-region-fill"
              />
              <path
                className="hero-corners"
                vectorEffect="non-scaling-stroke"
                d={`M${r.x + 22} ${r.y}h-22v22 M${r.x + r.w - 22} ${r.y}h22v22 M${r.x} ${r.y + r.h - 22}v22h22 M${r.x + r.w - 22} ${r.y + r.h}h22v-22`}
              />
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                className="hero-region-border"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>
        <span className="hero-image-kicker">Example labels</span>
        {active !== null && (
          <>
            <span
              key={`label-${active}`}
              className="hero-object-tag"
              style={{
                left: `${Math.min((regions[active].x / 2560) * 100, 69)}%`,
                top: `${Math.max(((regions[active].y - 180) / 1000) * 100 - 7, 10)}%`,
              }}
            >
              {regions[active].label}
            </span>
            <div key={`note-${pulse}`} className="hero-image-note">
              <strong>
                {pinned ? "◉ " : ""}
                {regions[active].label}
              </strong>
              <span>
                {pinned
                  ? regions[active].copy
                  : "Move to explore · Click to hold"}
              </span>
            </div>
          </>
        )}
        {active === null && (
          <div className="hero-image-note">
            <strong>Hover or tap an object</strong>
          </div>
        )}
      </div>
      <figcaption className="caption" aria-live="polite">
        {active !== null ? regions[active].copy : "Port of Montréal · Viterra camera. Explore with your pointer, tap to hold a label, or use the arrow keys."}
      </figcaption>
    </figure>
  );
}
