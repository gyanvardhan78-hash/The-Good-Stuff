import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, Star } from "lucide-react";
import hero from "@/assets/hero-cafe.jpg";
import { ThemeToggle } from "./ThemeToggle";

export function Hero({ onReserve }: { onReserve: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.img
        style={{ y }}
        src={hero}
        alt="The Good Stuff cafe interior glowing at night"
        width={1600}
        height={1008}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.12_0.02_40/0.82),oklch(0.1_0.02_40/0.68)_45%,oklch(0.1_0.02_40/0.95))]" />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <div className="min-w-0">
          <p className="truncate font-display text-lg text-cream sm:text-xl">The Good Stuff</p>
          <p className="text-[9px] tracking-[0.3em] text-cream/60 uppercase">Estd 2018</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <nav className="hidden gap-6 text-xs font-semibold tracking-[0.18em] text-cream/80 uppercase md:flex">
            <a href="#about" className="story-link transition-colors hover:text-cream">
              Vibe
            </a>
            <a href="#menu" className="story-link transition-colors hover:text-cream">
              Menu
            </a>
            <a href="#vibes" className="story-link transition-colors hover:text-cream">
              Neon
            </a>
            <a href="#visit" className="story-link transition-colors hover:text-cream">
              Visit
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-6xl flex-col justify-center px-4 pb-40 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[11px] font-semibold tracking-[0.35em] text-accent uppercase"
        >
          Roastery + Coffee Shop · Bandra West
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] text-cream sm:text-7xl lg:text-8xl"
        >
          Brewing coffee
          <span className="block italic text-gradient-warm">& creativity.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-cream/75"
        >
          Fourteen outlets across Surat, Mumbai and Hyderabad — and one corner of Sherly Rajan Road
          that always keeps the lights warm for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={onReserve}
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
          >
            Reserve a table
          </button>
          <a
            href="#menu"
            className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            See the menu
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex items-center gap-2 text-cream/80"
        >
          <span className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </span>
          <span className="text-xs tracking-wide">4.9 · loved by 280+ regulars</span>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-cream/60 md:bottom-8"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
