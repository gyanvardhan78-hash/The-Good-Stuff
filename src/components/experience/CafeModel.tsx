import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';

export const CafeModel: React.FC = () => {
  // 3D मॉडल को लोड कर रहे हैं।
  // ध्यान दें: तुम्हारा बेक किया हुआ 3D मॉडल 'public/models/cafe-baked.glb' लोकेशन पर होना चाहिए।
  const { scene } = useGLTF('/models/cafe-baked.glb');
  const modelRef = useRef<Group>(null);

  // Optional: अगर बेक किए हुए मॉडल का मटेरियल बहुत डार्क या लाइट लगे, 
  // तो हम उसे यहाँ थोड़ा एडजस्ट कर सकते हैं। 
  // फिलहाल इसे बेसिक रखा है क्योंकि बेक किए हुए मॉडल्स अपने आप में परफेक्ट होते हैं।

  return (
    <group ref={modelRef} dispose={null}>
      {/* <primitive> टैग सीधे हमारे GLTF सीन को Canvas के अंदर रेंडर करता है */}
      <primitive 
        object={scene} 
        position={[0, -1.5, 0]} // मॉडल को थोड़ा नीचे सेट किया है ताकि कैमरा सही एंगल पर रहे
        scale={1}               // अगर मॉडल बहुत छोटा या बड़ा लगे, तो इसे 0.5 या 2 करके एडजस्ट कर सकते हो
        rotation={[0, 0, 0]}    // जरूरत पड़ने पर Y-axis (बीच वाला 0) पर रोटेट कर सकते हैं 
      />
    </group>
  );
};

// यह लाइन बहुत इम्पॉर्टेंट है। यह वेबसाइट लोड होते ही मॉडल को कैश (cache) में डाल देगी, 
// जिससे लोडिंग टाइम बहुत कम हो जाएगा और एक्सपीरियंस स्मूथ रहेगा।
useGLTF.preload('/models/cafe-baked.glb');