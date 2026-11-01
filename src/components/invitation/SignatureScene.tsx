import { Motif } from "@/data/templates";
import { Tusker, Mandala, Lotus, Palm, Peacock, Floral } from "./Motifs";
// Lightweight vector layers animate independently of the invitation typography.
export default function SignatureScene({ motif }: { motif: Motif }) {
  return (
    <div
      className={`signature-scene signature-scene-${motif}`}
      aria-hidden="true"
    >
      {motif === "perahera" ? (
        <>
          <div className="procession-lights">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ "--light": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="tusker-procession">
            {[0, 1, 2, 3].map((i) => (
              <Tusker key={i} />
            ))}
          </div>
        </>
      ) : motif === "peacock" ? (
        <div className="peacock-fan">
          <Peacock />
        </div>
      ) : motif === "moon" ? (
        <div className="celestial-stars">
          {Array.from({ length: 24 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 37 + 13) % 98}%`,
                top: `${(i * 23 + 5) % 92}%`,
                animationDelay: `${i * 0.35}s`,
              }}
            >
              ✧
            </i>
          ))}
        </div>
      ) : motif === "palm" ? (
        <>
          <Palm className="scene-palm-left" />
          <Palm className="scene-palm-right" />
          <div className="ocean-lines">
            <i />
            <i />
            <i />
          </div>
        </>
      ) : motif === "mandala" || motif === "lace" ? (
        <Mandala className="scene-bottom-mandala" />
      ) : motif === "floral" || motif === "arch" ? (
        <>
          <Floral className="scene-vine left" />
          <Floral className="scene-vine right" />
        </>
      ) : motif === "lotus" ? (
        <Lotus className="scene-bottom-lotus" />
      ) : null}
    </div>
  );
}
