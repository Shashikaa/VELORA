import { useEffect, useRef } from "react";
import { Lotus, Mandala, Tusker, Peacock, Floral, Palm } from "../Motifs";
export { Lotus, Mandala, Tusker, Peacock, Floral, Palm };
export function Plane({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m8 56 65-12 17-30c3-6 13-9 13-1l-4 29 65-10c12-2 14 6 1 11l-66 18-7 27-11 4 1-29-48 5-15 12-9 1 4-17Z"
        fill="currentColor"
      />
      <path d="m97 47 50-8" stroke="white" strokeOpacity=".4" />
    </svg>
  );
}
export function Car({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 150 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 46 41 21q5-7 17-7h39q10 0 15 7l15 25 10 10v20H13V56Z"
        fill="#d8b4a7"
        stroke="#744c48"
        strokeWidth="2"
      />
      <path d="m45 25-10 21h79l-11-21Z" fill="#b5c9c5" stroke="#744c48" />
      <path d="M17 57h116v14H17Z" fill="#f5dec8" stroke="#744c48" />
      <circle cx="34" cy="59" r="8" fill="#fff3c8" stroke="#ad8b68" />
      <circle cx="117" cy="59" r="8" fill="#fff3c8" stroke="#ad8b68" />
      <path d="M58 61h37m-35 5h33" stroke="#744c48" />
      <rect x="22" y="74" width="21" height="12" rx="4" fill="#55483e" />
      <rect x="107" y="74" width="21" height="12" rx="4" fill="#55483e" />
      <path
        d="m75 14-5-8c-10-7-22 6-7 10l12 3 12-3c15-4 3-17-7-10Z"
        fill="#914c5a"
      />
    </svg>
  );
}
export function Bow() {
  return (
    <svg
      className="satin-bow"
      viewBox="0 0 340 230"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="satin" x1="0" x2="1">
          <stop stopColor="#904455" />
          <stop offset=".25" stopColor="#e4abb0" />
          <stop offset=".5" stopColor="#b16776" />
          <stop offset=".75" stopColor="#f2ccd0" />
          <stop offset="1" stopColor="#a25163" />
        </linearGradient>
      </defs>
      <g fill="url(#satin)" stroke="#a15c6c" strokeWidth="1">
        <path
          className="bow-loop left"
          d="M166 92C100 6 24 15 42 78c10 35 73 48 124 14Z"
        />
        <path
          className="bow-loop right"
          d="M174 92C240 6 316 15 298 78c-10 35-73 48-124 14Z"
        />
        <path
          className="bow-tail left"
          d="M158 91c-39 24-37 65-61 115l37-9 18 20c20-64 25-91 21-123Z"
        />
        <path
          className="bow-tail right"
          d="M182 91c39 24 37 65 61 115l-37-9-18 20c-20-64-25-91-21-123Z"
        />
        <path d="M155 73q15-8 30 0l2 35q-18 9-34 0Z" />
      </g>
      <path
        d="M55 45q27-20 100 46m129-46q-27-20-100 46"
        stroke="#ffe3db"
        strokeWidth="4"
        opacity=".4"
      />
    </svg>
  );
}
export function Palace() {
  return (
    <svg
      className="palace-illustration"
      viewBox="0 0 420 280"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M21 246h378M54 244V97h312v147M74 244V110h272v134M89 110h244M123 244V113m174 131V113M145 244V115h130v129M158 243v-89a52 52 0 0 1 104 0v89" />
        <path d="M21 96 210 14l189 82H21Zm29-19L210 5l160 72M70 60h280M210 5V0m-17 32 17-12 17 12M96 94V74m228 20V74M103 244V133m18 111V133m178 111V133m18 111V133M31 257h358M12 270h396" />
        <path d="M183 242v-70a27 27 0 0 1 54 0v70" />
        {[89, 331].map((x) => (
          <g key={x}>
            <path d={`M${x - 13} 240V165h26v75m-32-75h38m-34-5h30m-26-5h22`} />
            <circle cx={x} cy="149" r="5" />
          </g>
        ))}
      </g>
    </svg>
  );
}
export function ScrollJourney({
  variant = "roadtrip",
}: {
  variant?: "roadtrip" | "flight";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const marker = useRef<SVGGElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let ancestor: HTMLElement | null = element.parentElement;
    while (
      ancestor &&
      !/(auto|scroll)/.test(getComputedStyle(ancestor).overflowY)
    )
      ancestor = ancestor.parentElement;
    const scroller = ancestor || window;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const viewport = ancestor
        ? ancestor.getBoundingClientRect()
        : { top: 0, height: window.innerHeight };
      const progress = Math.max(
        0,
        Math.min(
          1,
          (viewport.top + viewport.height * 0.8 - bounds.top) /
            (bounds.height + viewport.height * 0.3),
        ),
      );
      if (path.current && marker.current) {
        const length = path.current.getTotalLength();
        const point = path.current.getPointAtLength(length * progress);
        marker.current.setAttribute(
          "transform",
          `translate(${point.x},${point.y})`,
        );
      }
      element.style.setProperty("--journey-progress", String(progress));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      scroller.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={ref} className={`scroll-journey journey-${variant}`}>
      <svg viewBox="0 0 360 760" aria-hidden="true">
        <defs>
          <linearGradient id="road-edge" x2="0" y2="1">
            <stop stopColor="#c7ab88" />
            <stop offset="1" stopColor="#e5cdb2" />
          </linearGradient>
        </defs>
        <path
          d="M280 10C15 110 48 214 250 278S360 448 130 474 90 648 235 744"
          stroke="url(#road-edge)"
          strokeWidth={variant === "roadtrip" ? 25 : 2}
          fill="none"
        />
        <path
          ref={path}
          d="M280 10C15 110 48 214 250 278S360 448 130 474 90 648 235 744"
          stroke={variant === "roadtrip" ? "#fff3dd" : "#cbb689"}
          strokeWidth="1.5"
          strokeDasharray={variant === "roadtrip" ? "8 7" : "3 7"}
          fill="none"
        />
        <g ref={marker} transform="translate(280 10)">
          {variant === "roadtrip" ? (
            <svg x="-27" y="-20" width="54" height="36" viewBox="0 0 150 90">
              <Car />
            </svg>
          ) : (
            <svg x="-25" y="-15" width="50" height="30" viewBox="0 0 180 100">
              <Plane />
            </svg>
          )}
        </g>
      </svg>
      <article className="journey-stop one">
        <span>01 / A LITTLE HELLO</span>
        <h3>Where it all began.</h3>
        <p>
          A chance meeting.
          <br />
          An unexpected smile.
        </p>
      </article>
      <article className="journey-stop two">
        <span>02 / THE BEAUTIFUL YES</span>
        <h3>
          One question.
          <br />A thousand dreams.
        </h3>
      </article>
      <article className="journey-stop three">
        <span>03 / OUR FOREVER</span>
        <h3>
          All roads led
          <br />
          to this day.
        </h3>
      </article>
    </div>
  );
}
