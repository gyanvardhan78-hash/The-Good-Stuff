import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const DynamicLighting: React.FC = () => {
  // लाइट्स को टारगेट करने के लिए References
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  // यूजर के डिवाइस का करंट टाइम (घंटे) निकाल रहे हैं
  const currentHour = new Date().getHours();

  // टाइम के हिसाब से लाइटिंग का डेटा सेट कर रहे हैं
  const lightSettings = useMemo(() => {
    if (currentHour >= 6 && currentHour < 12) {
      // 🌅 Morning (6 AM - 12 PM): Warm & Golden
      return {
        ambientColor: new THREE.Color('#ffe4c4'), // वार्म बिस्क
        ambientIntensity: 0.5,
        dirColor: new THREE.Color('#ffb75e'),     // गोल्डन ऑरेंज (Sun)
        dirIntensity: 1.5,
        dirPosition: new THREE.Vector3(5, 5, 5)
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      // ☀️ Afternoon (12 PM - 5 PM): Bright Vintage White
      return {
        ambientColor: new THREE.Color('#ffffff'), // वाइट
        ambientIntensity: 0.8,
        dirColor: new THREE.Color('#fff0d4'),     // हल्की पीलापन लिए हुए वाइट
        dirIntensity: 2.0,
        dirPosition: new THREE.Vector3(0, 10, 2)
      };
    } else if (currentHour >= 17 && currentHour < 19) {
      // 🌇 Evening (5 PM - 7 PM): Sunset Effect
      return {
        ambientColor: new THREE.Color('#ffb38a'), // सॉफ्ट ऑरेंज/पर्पल
        ambientIntensity: 0.4,
        dirColor: new THREE.Color('#ff6b6b'),     // डीप सनसेट रेड
        dirIntensity: 1.2,
        dirPosition: new THREE.Vector3(-5, 3, 5)
      };
    } else {
      // 🌃 Night (7 PM - 6 AM): Dark Theme
      return {
        ambientColor: new THREE.Color('#0f0f1b'), // बहुत डार्क ब्लू (लगभग ब्लैक)
        ambientIntensity: 0.05,                   // इंटेंसिटी ना के बराबर, ताकि Moon Cursor का इफ़ेक्ट दिखे
        dirColor: new THREE.Color('#1a1a3a'),     // हल्की सी मूनलाइट 
        dirIntensity: 0.1,
        dirPosition: new THREE.Vector3(0, 5, -5)
      };
    }
  }, [currentHour]);

  // useFrame हर सेकंड 60 बार रन होता है। 
  // यह लॉजिक कलर्स और इंटेंसिटी को झटके से बदलने के बजाय बहुत स्मूथली ब्लेंड (Lerp) करेगा।
  useFrame(() => {
    if (ambientLightRef.current && directionalLightRef.current) {
      // Ambient Light को स्मूथली ट्रांजीशन करना
      ambientLightRef.current.color.lerp(lightSettings.ambientColor, 0.02);
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity, 
        lightSettings.ambientIntensity, 
        0.02
      );

      // Directional Light (Sun/Moon) को स्मूथली ट्रांजीशन और मूव करना
      directionalLightRef.current.color.lerp(lightSettings.dirColor, 0.02);
      directionalLightRef.current.intensity = THREE.MathUtils.lerp(
        directionalLightRef.current.intensity, 
        lightSettings.dirIntensity, 
        0.02
      );
      directionalLightRef.current.position.lerp(lightSettings.dirPosition, 0.01);
    }
  });

  return (
    <group>
      {/* Ambient Light: यह पूरे सीन में एक बेस रोशनी देता है */}
      <ambientLight ref={ambientLightRef} intensity={0} />
      
      {/* Directional Light: यह असली सूरज/चाँद की तरह काम करता है और परछाई बनाता है */}
      <directionalLight 
        ref={directionalLightRef} 
        castShadow 
        intensity={0}
        shadow-mapSize-width={1024} // शैडो की क्वालिटी (PC/Mobile दोनों के लिए ऑप्टिमाइज्ड)
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001} // शैडो में आने वाले ग्लिच (Shadow acne) को रोकने के लिए
      />
    </group>
  );
};