/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WantZavod Game - Full Version
 */

import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment } from './components/World/Environment';
import { Player } from './components/World/Player';
import { LevelManager } from './components/World/LevelManager';
import { Effects } from './components/World/Effects';
import { HUD } from './components/UI/HUD';
import { useStore } from './store';
import { GameStatus } from './types';

// Dynamic Camera Controller
const CameraController = () => {
  const { camera } = useThree();
  const speed = useStore(state => state.speed);
  
  useFrame((state, delta) => {
    // Subtle camera shake based on speed
    const intensity = Math.min(speed / 50, 0.5) * 0.02;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(state.clock.elapsedTime * 10) * intensity, delta * 5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5.5 + Math.cos(state.clock.elapsedTime * 8) * intensity, delta * 5);
  });
  
  return null;
};

function Scene() {
  return (
    <>
      <Environment />
      <group>
        <group userData={{ isPlayer: true }} name="PlayerGroup">
          <Player />
        </group>
        <LevelManager />
      </group>
      <Effects />
    </>
  );
}

function App() {
  const status = useStore(state => state.status);
  
  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
      <HUD />
      <Canvas
        dpr={[1, 1]} 
        gl={{ antialias: false, stencil: false, depth: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 5.5, 8], fov: 60 }}
      >
        <CameraController />
        <Suspense fallback={null}>
          {status === GameStatus.PLAYING && <Scene />}
          {status !== GameStatus.PLAYING && <Environment />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
