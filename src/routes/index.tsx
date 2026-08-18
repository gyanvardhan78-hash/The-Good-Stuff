import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@/components/theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CafeCanvas } from "@/components/experience/CafeCanvas";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ParallaxMenu } from "@/components/ParallaxMenu";
import { NeonCustomizer } from "@/components/NeonCustomizer";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { LofiToggle } from "@/components/LofiToggle";
import { BouquetModal } from "@/components/BouquetModal";

const title = "The Good Stuff · Roastery & Coffee Shop, Bandra West";
const description =
  "Brewing coffee & creativity since 2018. Pistachio lattes, midnight ramen and neon good vibes at Sherly Rajan Road, Bandra West, Mumbai. Rated 4.9 by 280+ regulars.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

function MainContent() {
  const { isExperienceMode } = useTheme();
  const [bouquet, setBouquet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const reserve = () => setBouquet(true);

  // मोबाइल डिवाइस डिटेक्ट करने का लॉजिक (Tailwind के 'md' ब्रेकपॉइंट 768px के बेस पर)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // लोड होते ही चेक करेगा
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D सिर्फ तब रेंडर होगा जब एक्सपीरियंस मोड ऑन हो और डिवाइस मोबाइल न हो
  const render3D = isExperienceMode && !isMobile;

  return (
    <>
      {render3D ? (
        <>
          {/* 3D Experience Mode (Strictly PC Only) */}
          <CafeCanvas />
          
          {/* 3D मोड में से बाहर निकलने के लिए Floating Theme Toggle */}
          <div className="fixed top-6 right-6 z-[100]">
            <ThemeToggle />
          </div>
        </>
      ) : (
        /* 2D Quick Mode (Mobile के लिए हमेशा, PC के लिए जब टॉगल ऑफ हो) */
        <main>
          <Hero onReserve={reserve} />
          <About />
          <ParallaxMenu />
          <NeonCustomizer />
          <Footer onReserve={reserve} />
        </main>
      )}

      {/* Lofi Audio दोनों मोड्स में काम करेगा */}
      <div className="fixed bottom-24 right-6 md:bottom-6 z-[100]">
        <LofiToggle />
      </div>

      {/* Mobile Bar सिर्फ Quick Mode में दिखेगा */}
      {!render3D && <MobileBar onReserve={reserve} />}
      
      <BouquetModal open={bouquet} onClose={() => setBouquet(false)} />
    </>
  );
}