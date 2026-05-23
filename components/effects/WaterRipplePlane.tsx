// filepath: src/components/effects/WaterRipplePlane.tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  waterRippleFragmentShader,
  waterRippleVertexShader,
} from "./water-ripple-shader";

type WaterRipplePlaneProps = {
  active: boolean;
  duration?: number;
  center?: [number, number];
  intensity?: number;
  onComplete?: () => void;
};

export function WaterRipplePlane({
  active,
  duration = 2.2,
  center = [0.5, 0.5],
  intensity = 1.35,
  onComplete,
}: WaterRipplePlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
      uCenter: { value: new THREE.Vector2(center[0], center[1]) },
      uIntensity: { value: intensity },
    }),
    [center, intensity]
  );

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;

    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uIntensity.value = intensity;

    if (!active) {
      startTimeRef.current = null;
      completedRef.current = false;
      uniforms.uProgress.value = 0;
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = clock.elapsedTime;
      completedRef.current = false;
    }

    const elapsed = clock.elapsedTime - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    uniforms.uProgress.value = progress;

    if (progress >= 1 && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  });

  return (
    <mesh renderOrder={999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        vertexShader={waterRippleVertexShader}
        fragmentShader={waterRippleFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}