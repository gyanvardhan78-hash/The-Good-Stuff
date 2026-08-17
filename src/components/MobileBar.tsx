import { CalendarHeart, MapPin, ShoppingBag } from "lucide-react";

export function MobileBar({ onReserve }: { onReserve: () => void }) {
  const item = "flex flex-1 min-w-0 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold tracking-wide uppercase transition-colors";

  return (
    <nav className="glass-panel fixed inset-x-3 bottom-3 z-[75] flex items-center gap-1 rounded-3xl p-2 shadow-[var(--shadow-lift)] md:hidden">
      <button onClick={onReserve} className={`${item} bg-accent text-accent-foreground`}>
        <CalendarHeart className="h-5 w-5" />
        Reserve
      </button>
      <a href="#menu" className={`${item} hover:bg-muted`}>
        <ShoppingBag className="h-5 w-5" />
        Order
      </a>
      <a href="#visit" className={`${item} hover:bg-muted`}>
        <MapPin className="h-5 w-5" />
        Locations
      </a>
    </nav>
  );
}
