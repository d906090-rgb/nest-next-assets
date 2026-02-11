/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export const Effects: React.FC = () => {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {/* Softened bloom or disabled for extreme stability */}
      {/* <Bloom 
        luminanceThreshold={0.9} 
        mipmapBlur 
        intensity={0.35} 
        radius={0.4}
        levels={4}
      /> */}
      {/* Noise/Vignette disabled for performance */}
      {/* <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} /> */}
      {/* <Vignette eskil={false} offset={0.1} darkness={0.5} /> */}
    </EffectComposer>
  );
};
