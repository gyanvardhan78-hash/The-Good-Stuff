import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import pistachio from "@/assets/pistachio-latte.jpg";
import croissant from "@/assets/croissant.jpg";
import ramen from "@/assets/ramen.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import bombon from "@/assets/bombon.jpg";

const ITEMS = [
  {
    img: pistachio,
    name: "Pistachio Latte",
    note: "House signature",
    desc: "Slow-roasted single origin, pistachio cream, a dusting of green gold.",
    price: "₹380",
    speed: -90,
  },
  {
    img: croissant,
    name: "Avocado & Egg Croissant",
    note: "All-day brunch",
    desc: "Butter-laminated, smashed avocado, jammy egg, chilli crunch.",
    price: "₹420",
    speed: 70,
  },
  {
    img: ramen,
    name: "Midnight Ramen",
    note: "Served till 11:45 PM",
    desc: "Twelve-hour broth, torched chashu, soft-set egg. Comfort in a bowl.",
    price: "₹540",
    speed: -60,
  },
  {
    img: cheesecake,
    name: "Burnt Basque Cheesecake",
    note: "Baked daily",
    desc: "Caramelised top, molten centre, always with a tiny flower.",
    price: "₹340",
    speed: 95,
  },
  {
    img: bombon,
    name: "Café Bombón",
    note: "Two-sip wonder",
    desc: "Espresso layered over condensed milk. Small glass, loud personality.",
    price: "₹260",
    speed: -75,
  },
];

function MenuCard({
  item,
  progress,
  index,
}: {
  item: (typeof ITEMS)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const y = useTransform(progress, [0, 1], [item.speed, -item.speed]);

  return (
    <motion.article
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
      className={`card-lift group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] ${
        index % 2 === 1 ? "md:mt-16" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={900}
          height={1100}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-80"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[oklch(0.15_0.02_40/0.6)] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-cream uppercase backdrop-blur-md">
          {item.note}
        </span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
          <h3 className="min-w-0 font-display text-2xl leading-tight">{item.name}</h3>
          <span className="shrink-0 font-display text-lg text-accent">{item.price}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
      </div>
    </motion.article>
  );
}

export function ParallaxMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="menu" ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-8">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-neon/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-ember/20 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-accent uppercase">The Menu</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-6xl">
          Things people come back <span className="text-gradient-warm">again and again</span> for.
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <MenuCard key={item.name} item={item} progress={scrollYProgress} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
