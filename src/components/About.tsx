import { motion } from "motion/react";
import { Flower2, Coffee, Sparkles } from "lucide-react";
import bouquet from "@/assets/bouquet.jpg";

const STATS = [
  { k: "4.9★", v: "280+ ratings" },
  { k: "14", v: "outlets & growing" },
  { k: "2018", v: "since day one" },
  { k: "11:45", v: "open till PM" },
];

const NOTES = [
  { icon: Coffee, t: "Roasted in-house", d: "Our own roastery means the beans never travel far from the flame." },
  { icon: Flower2, t: "Flowers, unannounced", d: "Some days our staff hand out tiny bouquets. No occasion needed." },
  { icon: Sparkles, t: "Vintage meets neon", d: "Warm wood, soft jazz, and a pink glow that makes every photo work." },
];

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] text-accent uppercase">The Vibe</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            A cozy, unhurried corner of <span className="text-gradient-warm">Bandra</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            The Good Stuff started as a roastery obsession and turned into a living room for the
            city. Peaceful mornings, long afternoons on a laptop, cinematic nights under the neon —
            same cup, three different moods.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.k} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
                <p className="font-display text-2xl">{s.k}</p>
                <p className="mt-1 text-[11px] tracking-wide text-muted-foreground uppercase">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {NOTES.map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex min-w-0 gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <img
            src={bouquet}
            alt="Barista offering a small flower bouquet with coffee"
            loading="lazy"
            width={1100}
            height={900}
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
          <div className="glass-panel absolute -bottom-6 left-4 max-w-[15rem] rounded-2xl p-4 sm:left-8">
            <p className="font-display text-lg leading-snug">"They gave me flowers with my latte."</p>
            <p className="mt-1 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              — a regular, Bandra West
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
