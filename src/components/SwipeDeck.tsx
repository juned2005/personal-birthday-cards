import { useCallback, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { birthdayConfig, type WishCard } from "@/config/birthday";

/**
 * A stacked deck of photo cards. The cards sit visibly layered; dragging or
 * swiping the top card past a threshold sends it flying off and reveals the
 * next card underneath. The deck loops, so swiping never runs out.
 */

const SWIPE_THRESHOLD = 90; // px of horizontal drag needed to dismiss
const FLY_OUT_MS = 380;

interface DeckCard extends WishCard {
  id: number;
  photo: string;
}

let nextId = 0;
const initialDeck = (): DeckCard[] =>
  birthdayConfig.cards.map((c) => ({ ...c, id: nextId++ }));

export function SwipeDeck() {
  const [deck, setDeck] = useState<DeckCard[]>(initialDeck);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);
  const start = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const top = deck[deck.length - 1];

  const cycle = useCallback((dir: "left" | "right") => {
    setExiting(dir);
    window.setTimeout(() => {
      setDeck((d) => {
        const copy = [...d];
        const card = copy.pop()!;
        copy.unshift(card);
        return copy;
      });
      setExiting(null);
      setDrag({ x: 0, y: 0, active: false });
    }, FLY_OUT_MS);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exiting) return;
    dragging.current = true;
    start.current = { x: e.clientX - drag.x, y: e.clientY - drag.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDrag((d) => ({ ...d, active: true }));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || exiting) return;
    setDrag({
      x: e.clientX - start.current.x,
      y: (e.clientY - start.current.y) * 0.35,
      active: true,
    });
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (Math.abs(drag.x) > SWIPE_THRESHOLD) {
      cycle(drag.x > 0 ? "right" : "left");
    } else {
      setDrag({ x: 0, y: 0, active: false });
    }
  };

  const addPhoto = (id: number, file: File) => {
    const url = URL.createObjectURL(file);
    setDeck((d) => d.map((c) => (c.id === id ? { ...c, photo: url } : c)));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Deck */}
      <div className="relative h-[430px] w-[300px] touch-pan-y select-none sm:h-[470px] sm:w-[330px]">
        {deck.map((card, i) => {
          const depth = deck.length - 1 - i; // 0 = top card
          if (depth > 2) return null; // only render top 3 layers
          const isTop = depth === 0;

          let transform = `translateY(${depth * 14}px) scale(${1 - depth * 0.05}) rotate(${depth * (i % 2 === 0 ? -2.2 : 2.2)}deg)`;
          let transition = "transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s ease";
          let opacity = 1 - depth * 0.08;

          if (isTop) {
            if (exiting) {
              const dir = exiting === "right" ? 1 : -1;
              transform = `translate(${dir * 460}px, -30px) rotate(${dir * 18}deg)`;
              transition = `transform ${FLY_OUT_MS}ms cubic-bezier(0.5, 0, 0.75, 0), opacity ${FLY_OUT_MS}ms ease`;
              opacity = 0;
            } else {
              const rotate = drag.x / 14;
              transform = `translate(${drag.x}px, ${drag.y}px) rotate(${rotate}deg)`;
              transition = drag.active
                ? "none"
                : "transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)";
            }
          }

          return (
            <div
              key={card.id}
              className="absolute inset-0"
              style={{
                zIndex: 10 - depth,
                transform,
                transition,
                opacity,
                pointerEvents: isTop ? "auto" : "none",
              }}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <article
                className="flex h-full flex-col rounded-3xl bg-card p-3 shadow-[0_24px_60px_-16px_color-mix(in_oklab,var(--plum)_35%,transparent)] ring-1 ring-plum/10"
                style={{ cursor: isTop ? (drag.active ? "grabbing" : "grab") : "default" }}
              >
                <div className="relative flex-1 overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src={card.photo}
                    alt={card.title}
                    width={1024}
                    height={1365}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Add / replace photo */}
                  {isTop && (
                    <label className="absolute right-3 top-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-foreground backdrop-blur transition-colors hover:bg-background">
                      <ImagePlus className="size-3.5" />
                      Add photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) addPhoto(card.id, file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
                <div className="px-2 pb-2 pt-4">
                  <p className="font-display text-lg text-foreground">{card.title}</p>
                  <p className="mt-0.5 font-serif text-base italic leading-snug text-muted-foreground">
                    {card.caption}
                  </p>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Progress dots + hint */}
      <div className="mt-7 flex items-center gap-2">
        {deck.map((c, i) => (
          <span
            key={c.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === deck.length - 1 ? "w-6 bg-plum" : "w-1.5 bg-plum/25"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        Swipe the top card
      </p>
    </div>
  );
}
