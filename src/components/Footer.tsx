import { Clock, Instagram, MapPin, Phone } from "lucide-react";

export function Footer({ onReserve }: { onReserve: () => void }) {
  return (
    <footer id="visit" className="border-t border-border px-4 pb-32 pt-20 sm:px-8 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-3xl">The Good Stuff</h2>
            <p className="mt-1 text-[11px] tracking-[0.3em] text-accent uppercase">
              Roastery + Coffee Shop
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Surat · Mumbai · Hyderabad — 14 outlets and growing. Come for the coffee, stay for
              the quiet.
            </p>
            <button
              onClick={onReserve}
              className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Reserve a table
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Find us
            </p>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0">
                Shop No. 1, Hardik Villa, Sherly Rajan Rd, Bandra West, Mumbai, Maharashtra 400050
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-accent" /> Daily · open till 11:45 PM
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-accent" /> Walk-ins always welcome
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Follow
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 transition-colors hover:text-accent"
            >
              <Instagram className="h-4 w-4 text-accent" /> @thegoodstuff
            </a>
            <a href="#menu" className="block transition-colors hover:text-accent">
              Menu
            </a>
            <a href="#vibes" className="block transition-colors hover:text-accent">
              Neon customizer
            </a>
          </div>
        </div>

        <p className="mt-14 text-[11px] tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} The Good Stuff · Estd 2018 · Brewing coffee & creativity.
        </p>
      </div>
    </footer>
  );
}
