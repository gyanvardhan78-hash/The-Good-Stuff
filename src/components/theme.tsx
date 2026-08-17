import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Mode = "quick" | "experience";

// हमने यहाँ isExperienceMode ऐड किया है ताकि दूसरे कंपोनेंट्स में आसानी हो
interface ThemeContextType {
  mode: Mode;
  isExperienceMode: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "experience", // डिफ़ॉल्ट रूप से एक्सपीरियंस मोड 
  isExperienceMode: true,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("experience");

  // पेज रीलोड होने पर लोकल स्टोरेज से यूज़र का पिछला प्रेफरेंस फेच करना
  useEffect(() => {
    const stored = window.localStorage.getItem("tgs-mode") as Mode | null;
    if (stored === "quick" || stored === "experience") {
      setMode(stored);
    }
  }, []);

  // मोड चेंज होने पर HTML टैग में 'dark' क्लास लगाना और लोकल स्टोरेज अपडेट करना
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "experience");
    window.localStorage.setItem("tgs-mode", mode);
  }, [mode]);

  // टॉगल फंक्शन को ऑप्टिमाइज़ किया है ताकि री-रेंडरिंग बचे
  const toggle = useCallback(() => {
    setMode((prev) => (prev === "experience" ? "quick" : "experience"));
  }, []);

  return (
    <ThemeContext.Provider 
      value={{ 
        mode, 
        isExperienceMode: mode === "experience", 
        toggle 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook: इसे यूज़ करके हम पूरी वेबसाइट में कहीं से भी थीम चेंज कर सकते हैं
export const useTheme = () => useContext(ThemeContext);