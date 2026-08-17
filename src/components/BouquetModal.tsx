import { AnimatePresence, motion } from "motion/react";
import { X, MessageCircle } from "lucide-react";

const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

function Flower({ delay, scale, x, y, hue }: { delay: number; scale: number; x: number; y: number; hue: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale, y }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 14 }}
      className="absolute left-1/2 bottom-16"
      style={{ x }}
    >
      <div className="relative h-0 w-0">
        {PETALS.map((deg) => (
          <span
            key={deg}
            className="absolute h-9 w-4 rounded-full opacity-90"
            style={{
              background: hue,
              transform: `rotate(${deg}deg) translateY(-16px)`,
              transformOrigin: "center bottom",
            }}
          />
        ))}
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-[oklch(0.85_0.16_85)]" />
      </div>
      <div className="mx-auto h-24 w-[3px] rounded-full bg-[oklch(0.5_0.11_145)]" />
    </motion.div>
  );
}

export function BouquetModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // WhatsApp Link Logic
  const handleWhatsAppRedirect = () => {
    // यहाँ क्लाइंट का असली नंबर आएगा (Country Code 91 के साथ)
    const phoneNumber = "919876543210"; 
    
    // प्री-टाइप्ड मैसेज
    const message = "Hey 'The Good Stuff'! 👋%0A%0AI would like to reserve a table/place an order.%0A%0A*Name:* %0A*Time:* %0A*Items:* ";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center bg-[oklch(0.12_0.02_40/0.75)] px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-lift)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative mx-auto h-56 w-full">
              <Flower delay={0.05} scale={1} x={-70} y={-10} hue="oklch(0.72 0.16 20)" />
              <Flower delay={0.14} scale={1.15} x={-24} y={-34} hue="oklch(0.75 0.2 340)" />
              <Flower delay={0.22} scale={1.05} x={26} y={-18} hue="oklch(0.9 0.06 90)" />
              <Flower delay={0.3} scale={0.95} x={70} y={-2} hue="oklch(0.66 0.18 300)" />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="absolute bottom-0 left-1/2 h-20 w-32 -translate-x-1/2 rounded-b-[3rem] rounded-t-lg bg-[var(--gradient-warm)] shadow-[var(--shadow-soft)]"
                style={{ backgroundImage: "var(--gradient-warm)" }}
              >
                <div className="mt-3 h-[2px] w-full bg-accent/60" />
              </motion.div>
            </div>

            <h3 className="mt-4 font-display text-3xl">One last step!</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              There'll be a tiny bouquet waiting with your first cup — that's just how we say hello. Tap below to instantly confirm your table or send us your order via WhatsApp.
            </p>
            
            <button
              onClick={handleWhatsAppRedirect}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#128C7E] hover:shadow-xl active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              Confirm via WhatsApp
            </button>

            <p className="mt-5 text-[11px] font-semibold tracking-[0.25em] text-accent uppercase">
              The Good Stuff · Estd 2018
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}