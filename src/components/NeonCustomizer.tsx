import { useState } from "react";
import { motion } from "motion/react";
import brick from "@/assets/brick.jpg";

export function NeonCustomizer() {
  const [name, setName] = useState("");
  const display = name.trim() || "good vibes only";

  return (
    <section id="vibes" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-semibold tracking-[0.3em] text-accent uppercase">
          Interactive
        </p>
        <h2 className="mt-3 text-center font-display text-4xl sm:text-5xl">
          Light up the <span className="text-gradient-warm">wall</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          Every table has a story. Type your name and watch it glow on our Bandra brick wall.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-10 overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]"
        >
          <img
            src={brick}
            alt="Dark brick wall inside the cafe"
            loading="lazy"
            width={1400}
            height={900}
            className="h-[300px] w-full object-cover sm:h-[420px]"
          />
          <div className="absolute inset-0 bg-[oklch(0.12_0.02_20/0.55)]" />
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div>
              <p className="neon-dim font-display text-lg sm:text-2xl">— the good stuff —</p>
              <p
                className="neon-text mt-2 font-display text-4xl leading-tight break-words sm:text-6xl"
                style={{ fontStyle: "italic" }}
              >
                {display}
              </p>
              <p className="neon-dim mt-3 text-[10px] tracking-[0.4em] uppercase">
                bandra west · mumbai
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-6 grid max-w-md grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <input
            value={name}
            maxLength={18}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name…"
            aria-label="Your name for the neon sign"
            className="min-w-0 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => setName("")}
            className="shrink-0 rounded-full border border-border px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-muted"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
