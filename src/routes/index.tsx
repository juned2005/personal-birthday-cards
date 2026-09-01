import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { SwipeDeck } from "@/components/SwipeDeck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${birthdayConfig.recipientName}` },
      {
        name: "description",
        content: `A birthday wish for ${birthdayConfig.recipientName} — photos, memories, and a heartfelt message.`,
      },
      { property: "og:title", content: `Happy Birthday, ${birthdayConfig.recipientName}` },
      {
        property: "og:description",
        content: `A birthday wish for ${birthdayConfig.recipientName} — photos, memories, and a heartfelt message.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SPARKLES = [
  { left: "10%", top: "12%", size: 18, delay: "0s", dur: "3.4s" },
  { left: "84%", top: "9%", size: 12, delay: "0.8s", dur: "4.2s" },
  { left: "22%", top: "34%", size: 10, delay: "1.6s", dur: "3.8s" },
  { left: "90%", top: "42%", size: 16, delay: "0.4s", dur: "5s" },
  { left: "6%", top: "62%", size: 12, delay: "2s", dur: "4.6s" },
  { left: "78%", top: "70%", size: 14, delay: "1.1s", dur: "3.2s" },
  { left: "45%", top: "6%", size: 11, delay: "2.4s", dur: "4.9s" },
  { left: "60%", top: "88%", size: 13, delay: "0.2s", dur: "4s" },
];

function Index() {
  const { eyebrow, recipientName, tagline, message, signature } = birthdayConfig;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(60% 42% at 12% 0%, color-mix(in oklab, var(--blush) 45%, transparent), transparent 70%), radial-gradient(55% 40% at 100% 18%, color-mix(in oklab, var(--gold) 32%, transparent), transparent 70%), linear-gradient(180deg, var(--cream) 0%, color-mix(in oklab, var(--blush) 22%, var(--cream)) 55%, color-mix(in oklab, var(--gold) 18%, var(--cream)) 100%)",
      }}
    >
      {/* Drifting sparkles / confetti accents */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        {SPARKLES.map((s, i) => (
          <Sparkles
            key={i}
            className="absolute text-gold-deep/70"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animation: `sparkle-shimmer ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-lg flex-col items-center px-6 pb-16 pt-14 sm:max-w-xl">
        {/* Eyebrow */}
        <p className="animate-rise text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground [animation-delay:60ms]">
          {eyebrow}
        </p>

        {/* The name */}
        <p
          className="animate-rise mt-6 font-serif text-2xl italic text-plum/80 [animation-delay:160ms]"
        >
          Happy Birthday,
        </p>
        <h1 className="animate-rise mt-1 text-center font-display text-[clamp(4rem,20vw,7.5rem)] font-semibold leading-[0.9] tracking-tight text-foreground [animation-delay:280ms]">
          {recipientName}
        </h1>
        <div className="animate-rise mt-5 h-px w-16 bg-gold-deep/60 [animation-delay:380ms]" />
        <p className="animate-rise mt-5 max-w-[30ch] text-center font-serif text-lg leading-relaxed text-muted-foreground [animation-delay:440ms]">
          {tagline}
        </p>

        {/* Swipe deck */}
        <section className="animate-rise mt-12 w-full [animation-delay:560ms]">
          <SwipeDeck />
        </section>

        {/* The wish */}
        <section className="animate-rise mt-14 w-full [animation-delay:680ms]">
          <div className="relative overflow-hidden rounded-3xl bg-card/90 p-8 shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--plum)_28%,transparent)] ring-1 ring-plum/10 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-blush/40 blur-2xl" />
            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="size-2 rounded-full bg-gold-deep" />
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  A wish for you
                </p>
              </div>
              <p className="font-serif text-xl leading-[1.7] text-foreground sm:text-[22px]">
                {message.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-7 font-display text-lg italic text-plum">{signature}</p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          Made with love
        </footer>
      </main>
    </div>
  );
}
