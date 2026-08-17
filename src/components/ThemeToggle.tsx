import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./theme";

export function ThemeToggle() {
  // theme.tsx में अपडेट किए गए isExperienceMode का सीधा इस्तेमाल
  const { isExperienceMode, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isExperienceMode ? "Quick" : "Experience"} Mode`}
      // विंटेज और सिनेमैटिक ग्लो के लिए कस्टम होवर और एक्टिव स्टेट्स
      className="glass-panel group relative flex items-center gap-3 rounded-full p-1 pr-4 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] active:scale-95 border border-transparent dark:border-white/10"
    >
      {/* एनिमेटेड बैकग्राउंड ग्लो (होवर करने पर दिखेगा) */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-500/10 to-transparent transition-opacity duration-500" />

      <motion.span
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`grid h-8 w-8 z-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
          isExperienceMode 
            ? "bg-[#1a1a2e] text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.4)]" 
            : "bg-amber-100 text-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
        }`}
      >
        {/* आइकन में रोटेशन और स्केल एनीमेशन */}
        <motion.div
          initial={false}
          animate={{ 
            rotate: isExperienceMode ? -360 : 0, 
            scale: isExperienceMode ? 1 : 1.1 
          }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {isExperienceMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.div>
      </motion.span>
      
      <span className="z-10 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 text-foreground/80 group-hover:text-foreground">
        {isExperienceMode ? "Experience" : "Quick"}
      </span>
    </button>
  );
}