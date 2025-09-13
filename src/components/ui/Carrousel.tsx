import React, { useEffect, useMemo, useRef, useState } from "react";

type CarouselProps = {
  items: React.ReactNode[];
  className?: string;
};

export default function Carousel({ items, className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const total = useMemo(() => items.length, [items]);

  // sincroniza índice en scroll/resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIdx(i);
    };
    const onResize = () => onScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* track */}
      <div
        ref={trackRef}
        className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex
                   [&>*]:snap-start [&>*]:shrink-0 [&>*]:basis-full no-scrollbar"
        aria-roledescription="carousel"
        aria-label="Carousel"
      >
        {items.map((node, i) => (
          <div
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
          >
            {node}
          </div>
        ))}
      </div>

      {/* controles */}
      <button
        onClick={() => goTo(idx - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50
                   hover:bg-black/70 text-white w-10 h-10 grid place-items-center"
        aria-label="Anterior"
      >
        ‹
      </button>

      <button
        onClick={() => goTo(idx + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50
                   hover:bg-black/70 text-white w-10 h-10 grid place-items-center"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition
              ${i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
