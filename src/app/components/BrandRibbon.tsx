import { brandMarks } from "./BrandMarks";

/**
 * A clean, auto-scrolling ribbon of geometric brand marks.
 * Purely decorative — hidden from assistive tech and paused on hover.
 * Falls back to a centered static row when reduced motion is preferred.
 */
export function BrandRibbon() {
  // Duplicate the set so the track can loop seamlessly at -50%.
  const marks = [...brandMarks, ...brandMarks];

  return (
    <div className="brand-ribbon relative w-full overflow-hidden" aria-hidden="true">
      {/* soft edge fades so marks slide in/out cleanly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent" />

      <div className="brand-ribbon-track flex w-max items-center gap-10 sm:gap-16">
        {marks.map((Mark, i) => (
          <Mark
            key={i}
            className="h-12 w-12 shrink-0 sm:h-16 sm:w-16 transition-transform duration-300 hover:scale-110"
          />
        ))}
      </div>
    </div>
  );
}
