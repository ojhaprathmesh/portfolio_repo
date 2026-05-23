// filepath: src/components/effects/ripple-shader-config.ts

export const rippleShaderConfig = {
  background: "#050505",
  color: "#ffffff",

  // visual strength
  intensity: 0.55,
  refraction: 0.075,
  brightness: 0.85,
  glow: 0.42,

  // water behavior
  damping: 0.985,
  velocityDamping: 0.992,
  spring: 0.005,
  delta: 1.0,

  // impulse
  impulseRadius: 0.055,
  impulseStrength: 0.85,

  // timing
  duration: 1600,
  fadeOut: 500,

  // center of screen
  center: {
    x: 0.5,
    y: 0.5,
  },
} as const;