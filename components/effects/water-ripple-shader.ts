// filepath: src/components/effects/water-ripple-shader.ts

export const waterRippleVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const waterRippleFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uCenter;
  uniform float uIntensity;

  varying vec2 vUv;

  float gaussian(float x, float width) {
    return exp(-(x * x) / (2.0 * width * width));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;

    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - uCenter) * aspect;

    float dist = length(p);
    float progress = clamp(uProgress, 0.0, 1.0);

    // Much wider expansion - waves go well beyond screen edges
    float eased = 1.0 - pow(1.0 - progress, 2.2);
    float radius = mix(0.02, 2.5, eased);

    // Longer visibility, smoother disappearance.
    float lifeFade = 1.0 - smoothstep(0.62, 1.0, progress);
    float birthFade = smoothstep(0.0, 0.12, progress);
    float fade = birthFade * lifeFade;

    // Soft pressure bands instead of hard ring borders.
    float bandA = gaussian(dist - radius, 0.035);
    float bandB = gaussian(dist - radius * 0.74, 0.05) * 0.42;
    float bandC = gaussian(dist - radius * 1.22, 0.065) * 0.24;

    float bands = bandA + bandB + bandC;

    // Organic breakup so it does not look like a perfect SVG circle.
    float organic = noise(uv * 16.0 + uTime * 0.12);
    organic += noise(uv * 34.0 - uTime * 0.08) * 0.5;
    organic = organic / 1.5;

    float irregularity = mix(0.88, 1.12, organic);

    // Water-height wave. Lower frequency = less artificial, more readable.
    float wave = sin((dist - radius * irregularity) * 42.0 - uTime * 2.6);
    wave *= bands;
    wave *= fade;

    // Vertical depth bias. This gives the ripple height instead of flatness.
    vec2 dir = normalize(p + 0.00001);
    vec2 verticalNormal = vec2(dir.x * 0.45, dir.y * 1.75);

    float displacement = wave * 0.105 * uIntensity;

    vec2 refractedUv = uv + verticalNormal * displacement;

    // Refracted blueprint/grid shimmer.
    float gridScale = 24.0;

    float gx = abs(fract(refractedUv.x * gridScale) - 0.5);
    float gy = abs(fract(refractedUv.y * gridScale) - 0.5);

    float gridX = 1.0 - smoothstep(0.012, 0.028, gx);
    float gridY = 1.0 - smoothstep(0.012, 0.028, gy);

    float refractedGrid = (gridX + gridY) * 0.055;

    // White glow emission, but soft. No physical border.
    float crest = pow(max(wave, 0.0), 2.0);
    float glow = bands * 0.32 * fade;
    glow += crest * 0.55;

    // Center pressure bloom, not a droplet.
    float pressure = exp(-dist * 28.0);
    pressure *= 1.0 - smoothstep(0.0, 0.26, progress);
    pressure *= 0.38;

    // Vertical refraction column, subtle Alche-like height.
    float verticalColumn = exp(-abs(p.x) * 18.0) * exp(-abs(p.y) * 3.2);
    verticalColumn *= smoothstep(0.08, 0.28, progress);
    verticalColumn *= 1.0 - smoothstep(0.45, 0.95, progress);
    verticalColumn *= 0.16;

    float alpha = 0.0;
    alpha += glow;
    alpha += refractedGrid * bands * fade;
    alpha += pressure;
    alpha += verticalColumn;

    // Soft clipping. Prevents harsh visible circular edges.
    alpha = smoothstep(0.015, 0.75, alpha);
    alpha *= 0.82;

    vec3 color = vec3(1.0);
    color *= alpha;

    gl_FragColor = vec4(color, alpha);
  }
`;