import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";

export function LofiToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Play/Pause और Volume कंट्रोल लॉजिक
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // वॉल्यूम 30% पर फिक्स किया है (0.0 से 1.0 के बीच)
      
      if (playing) {
        // Browser autoplay पॉलिसी को हैंडल करने के लिए Promise catch लगाया है
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  return (
    <>
      {/* हिडन ऑडियो टैग: src में अपनी फाइल का सही नाम डाल देना अगर वो lofi.mp3 नहीं है */}
      <audio ref={audioRef} src="/lofi.mp3" loop preload="auto" />

      <motion.button
        onClick={() => setPlaying((p) => !p)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={playing ? "Pause cafe vibes" : "Play cafe vibes"}
        className="glass-panel fixed bottom-28 right-4 z-[70] flex items-center gap-3 rounded-full py-2 pl-2 pr-4 shadow-[var(--shadow-lift)] md:bottom-6 md:right-6"
      >
        <span
          className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[oklch(0.2_0.02_40)] ${playing ? "spin-vinyl animate-spin-slow" : ""}`}
        >
          <span className="absolute inset-1 rounded-full border border-[oklch(1_0_0/0.12)]" />
          <span className="absolute inset-3 rounded-full border border-[oklch(1_0_0/0.1)]" />
          <span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-accent-foreground">
            <span className="h-1 w-1 rounded-full bg-[oklch(0.2_0.02_40)]" />
          </span>
        </span>
        <span className="text-left">
          <span className="block text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            {playing ? "Now playing" : "Side A"}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            Cafe Vibes
          </span>
        </span>
        {playing && (
          <span className="flex h-5 items-end gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ height: [4, 16, 7, 13, 5] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                className="w-[3px] rounded-full bg-pink-500" // नियन कलर के लिए पिंक फिक्स किया है
              />
            ))}
          </span>
        )}
      </motion.button>
    </>
  );
}