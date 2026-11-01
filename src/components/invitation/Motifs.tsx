import { Motif } from "@/data/templates";
export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 125"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.3">
        <path d="M100 107C62 84 73 40 100 10c27 30 38 74 0 97Z" />
        <path d="M100 108C53 110 33 69 35 38c40 8 64 35 65 70ZM100 108c47 2 67-39 65-70-40 8-64 35-65 70Z" />
        <path d="M100 109C51 127 12 99 8 70c40-3 75 6 92 39Zm0 0c49 18 88-10 92-39-40-3-75 6-92 39Z" />
        <path d="M100 107V30m-3 73L46 51m57 52 51-52M39 115h122" />
        <path d="M65 118c-16-6-26-1-29 2m99-2c16-6 26-1 29 2" />
      </g>
      <circle cx="100" cy="117" r="3" fill="currentColor" />
    </svg>
  );
}
export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth=".7">
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="136" />
        <circle cx="200" cy="200" r="86" />
        {Array.from({ length: 24 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 15} 200 200)`}>
            <path d="M200 24q-32 48 0 85 32-37 0-85Zm0 94q-27 28 0 69 27-41 0-69Z" />
            <path d="M200 9v15m0 86v14m-7-87 7-10 7 10" />
            <circle cx="200" cy="165" r="3" />
            <path d="M200 176v19" />
          </g>
        ))}
        <circle cx="200" cy="200" r="17" />
        <circle cx="200" cy="200" r="8" />
      </g>
    </svg>
  );
}
export function Tusker({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 230 170"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34 130V77c0-31 28-45 67-40 26 3 43 14 51 30 14-5 27 1 29 19l8 36c2 13 15 13 20 1 10 25-17 35-27 17l-15-36-3 53h-21l-7-42-9 42h-20l-2-40H72l-9 40H43l-4-27Z" />
        <path d="M37 71C21 68 20 85 22 101m139-34c-29-16-42 17-20 37 18 13 27-9 20-37Z" />
        <path d="M66 40v62l27 11 36-11V46M72 45v51l21 9 29-9V49M77 57l17-7 19 10-19 11-17-14Zm0 28 17-9 19 10-19 9-17-10Z" />
        <path d="m153 66 6-25 15 20m-26 57c7 6 20 6 24-8" />
        <circle cx="172" cy="81" r="2" fill="currentColor" />
        <path d="m66 111 5 6m7-1 5 6m7-2 5 6m10-7 5 6m8-9 5 6M147 139h14m-47 0h12m-78 0h14" />
        <path d="M54 35h80l-5-12H61l-7 12Zm20-13c-3-15 31-21 43 0" />
      </g>
    </svg>
  );
}
export function Palm({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 250"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.4">
        <path d="M78 242c16-71 25-128 20-178m0 0C65 19 22 32 8 56c42-18 66 0 90 8Zm0 0c-15-51 26-66 57-53-31 6-49 24-57 53Zm0 0c31-37 75-25 92 5-37-17-64-6-92-5Zm0 0c-47-9-68 25-62 55 16-30 38-36 62-55Zm0 0c41 3 54 32 46 59-8-29-23-40-46-59Z" />
        <path d="M88 207h16m-11-29h15m-10-29h13m-8-28h11" />
      </g>
    </svg>
  );
}
export function Floral({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M20 250C160 203 71 92 160 11M76 218c-51-51-77-26-27 0 17 8 29-2 27-9Zm20-34c59-6 67-42 17-21-17 8-16 21-16 21Zm7-46c-59-14-60-49-20-21 13 9 20 21 20 21Zm8-35c44 6 63-25 24-20-16 2-24 20-24 20Zm23-49c-34-20-31-51-7-28 10 10 7 28 7 28Z" />
        <g transform="translate(148 48)">
          {Array.from({ length: 5 }, (_, i) => (
            <path
              key={i}
              d="M0 0c-20-8-16-32 0-19C16-32 20-8 0 0Z"
              transform={`rotate(${i * 72})`}
            />
          ))}
          <circle r="3" fill="currentColor" />
        </g>
        <g transform="translate(48 172)">
          {Array.from({ length: 5 }, (_, i) => (
            <path
              key={i}
              d="M0 0c-20-8-16-32 0-19C16-32 20-8 0 0Z"
              transform={`rotate(${i * 72})`}
            />
          ))}
          <circle r="3" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
export function Peacock({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 13 }, (_, i) => (
          <g key={i} transform={`rotate(${(i - 6) * 13} 110 187)`}>
            <path d="M110 184C65 132 84 32 110 12c26 20 45 120 0 172Z" />
            <ellipse cx="110" cy="56" rx="9" ry="17" />
            <ellipse cx="110" cy="56" rx="3" ry="7" fill="currentColor" />
            <path d="M110 80v95" />
          </g>
        ))}
        <path
          d="M108 191c-25-30-1-57 10-47 10 9-7 20-3 32 5 14 18 13 14 23-7 15-24 7-21-8Z"
          fill="currentColor"
        />
        <path d="M115 202v14m8-15 5 13m-9-70 10 4m-17-9-3-10m7 10 4-10" />
      </g>
    </svg>
  );
}
export function MotifArt({
  motif,
  className = "",
}: {
  motif: Motif;
  className?: string;
}) {
  if (motif === "elephant" || motif === "perahera")
    return <Tusker className={className} />;
  if (motif === "lotus") return <Lotus className={className} />;
  if (motif === "peacock") return <Peacock className={className} />;
  if (motif === "palm") return <Palm className={className} />;
  if (motif === "floral") return <Floral className={className} />;
  if (motif === "mandala" || motif === "lace")
    return <Mandala className={className} />;
  if (motif === "moon")
    return (
      <svg
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M130 30a75 75 0 1 0 38 119A70 70 0 0 1 130 30Z"
          stroke="currentColor"
        />
        {[
          [151, 47],
          [170, 88],
          [123, 98],
          [80, 29],
          [40, 151],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x - 4} ${y}h8m-4-4v8`} stroke="currentColor" />
        ))}
      </svg>
    );
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 238V100a83 83 0 0 1 166 0v138M27 238V100a73 73 0 0 1 146 0v138M7 238h186M17 114h166"
        stroke="currentColor"
      />
      <path
        d="M23 225c-20-50 25-80 6-128m143 128c20-50-25-80-6-128M26 162c-20-25-14-35 0-13m1 42c25-24 31-13 1 10m146-39c20-25 14-35 0-13m-1 42c-25-24-31-13-1 10"
        stroke="currentColor"
      />
    </svg>
  );
}
