import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, Html, useProgress } from '@react-three/drei';

// Child Components (इन्हें हम आगे की फाइल्स में बनाएंगे)
import { CafeModel } from './CafeModel';
import { DynamicLighting } from './DynamicLighting';
import { MoonCursorLight } from './MoonCursorLight';

// कस्टम लोडिंग स्क्रीन (जब तक 3D मॉडल लोड हो रहा है)
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <span className="text-white/80 font-serif text-2xl tracking-widest mb-2 drop-shadow-md">
          Brewing Experience...
        </span>
        <div className="text-pink-500 font-bold text-lg animate-pulse">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
};

export const CafeCanvas: React.FC = () => {
  // Device Pixel Ratio (DPR) State for Dynamic Resolution
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] overflow-hidden absolute top-0 left-0 z-50">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        shadows
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        {/* Performance Optimization: सिस्टम के हिसाब से ग्राफिक्स एडजस्ट करेगा */}
        <PerformanceMonitor
          onIncline={() => setDpr(2)} // अच्छे सिस्टम के लिए हाई रेजोल्यूशन
          onDecline={() => setDpr(1)} // कमजोर सिस्टम/मोबाइल के लिए लो रेजोल्यूशन
        />

        {/* 3D Scene Loading Wrapper */}
        <Suspense fallback={<CanvasLoader />}>
          
          {/* 1. Time-based Global Lighting */}
          <DynamicLighting />

          {/* 2. Baked 3D Cafe Model */}
          <CafeModel />

          {/* 3. Epic Moon/Cursor Follower Light */}
          <MoonCursorLight />

        </Suspense>
      </Canvas>
    </div>
  );
};