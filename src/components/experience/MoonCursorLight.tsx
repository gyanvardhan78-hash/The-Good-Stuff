import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const MoonCursorLight: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  
  // मोबाइल जायरोस्कोप के लिए स्टेट
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });
  
  // डिवाइस टाइप चेक
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // सिर्फ रात में (7 PM to 6 AM) मून लाइट एक्टिव रखने का लॉजिक
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 19 || currentHour < 6;

  useEffect(() => {
    if (isMobile) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        setOrientation({
          beta: event.beta || 0,   // Front/Back tilt
          gamma: event.gamma || 0, // Left/Right tilt
        });
      };
      
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [isMobile]);

  useFrame(({ pointer }) => {
    if (!lightRef.current || !isNight) return;

    const target = new THREE.Vector3();

    if (isMobile) {
      // Gyroscope Mapping: 90 degrees को व्यूपोर्ट की विड्थ/हाइट से मैप कर रहे हैं
      const x = (orientation.gamma / 90) * (viewport.width / 2);
      const y = -(orientation.beta / 90) * (viewport.height / 2);
      target.set(x, y, 3); // Z-axis पर 3 यूनिट आगे रखा है
    } else {
      // PC Mouse Mapping
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;
      target.set(x, y, 3);
    }

    // स्मूथ मूवमेंट (Lerp)
    lightRef.current.position.lerp(target, 0.1);
  });

  // अगर दिन है, तो यह कंपोनेंट कुछ भी रेंडर नहीं करेगा
  if (!isNight) return null;

  return (
    <pointLight
      ref={lightRef}
      color="#d6e4ff" // सिनेमैटिक मून वाइट/ब्लू टिंट
      intensity={3.0}
      distance={15}   // रोशनी कितनी दूर तक फैलेगी
      decay={2}       // रियलिस्टिक लाइट फॉलऑफ़
      castShadow
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-bias={-0.001}
    />
  );
};