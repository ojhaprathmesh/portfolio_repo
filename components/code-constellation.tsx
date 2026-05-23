// filepath: components/code-constellation.tsx
"use client"

import { PointMaterial,Points } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

// ─── Constants ────────────────────────────────────────────────────────────────
const CODE_SYMBOLS = [
  "{ }",
  "</>",
  "()",
  "=>",
  "//",
  "[ ]",
  "&&",
  "||",
  "!=",
  ";;",
  "+=",
  "?.",
  "fn()",
  "::",
  "...",
]

const CONNECTION_THRESHOLD = 2.8
const NODE_COUNT = 13
const PARTICLE_COUNT = 580

// ─── Canvas Texture Factory ───────────────────────────────────────────────────
function createSymbolTexture(symbol: string): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")

  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.clearRect(0, 0, size, size)

  // Soft radial glow behind symbol
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  glow.addColorStop(0, "rgba(255,255,255,0.06)")
  glow.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)

  // Symbol text
  ctx.fillStyle = "rgba(255,255,255,0.82)"
  ctx.font = `bold ${Math.floor(size * 0.25)}px "Courier New", "Lucida Console", monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(symbol, size / 2, size / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface NodeDatum {
  symbol: string
  texture: THREE.CanvasTexture
  basePosition: THREE.Vector3
  floatSpeed: number
  floatOffset: number
  floatAmp: number
  scale: number
}

// ─── Particle Field (background glow cloud) ───────────────────────────────────
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const base = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 4.2 + Math.random() * 3.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      base[i * 3] = x
      base[i * 3 + 1] = y
      base[i * 3 + 2] = z
    }

    return [pos, base]
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    // Slow rotation + mouse parallax
    pointsRef.current.rotation.y += delta * 0.022
    pointsRef.current.rotation.x +=
      (pointer.y * 0.07 - pointsRef.current.rotation.x) * 0.012
    pointsRef.current.rotation.z +=
      (pointer.x * 0.04 - pointsRef.current.rotation.z) * 0.012

    // Subtle organic breathing
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      arr[i3] = base[i3] + Math.sin(t * 0.38 + i * 0.011) * 0.07
      arr[i3 + 1] = base[i3 + 1] + Math.cos(t * 0.28 + i * 0.015) * 0.07
      arr[i3 + 2] = base[i3 + 2] + Math.sin(t * 0.32 + i * 0.013) * 0.07
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  // Inline reference to base array (stable between renders)
  const base = basePositions

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.011}
        sizeAttenuation
        depthWrite={false}
        opacity={0.48}
      />
    </Points>
  )
}

// ─── Constellation Core (symbol nodes + connection lines) ─────────────────────
function ConstellationCore() {
  const mainGroupRef = useRef<THREE.Group>(null)
  const spritesGroupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  const { nodes, connectionGeo } = useMemo<{
    nodes: NodeDatum[]
    connectionGeo: THREE.BufferGeometry | null
  }>(() => {
    if (typeof document === "undefined") return { nodes: [], connectionGeo: null }

    // Distribute nodes evenly on a sphere with slight randomness
    const nodes: NodeDatum[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const symbol = CODE_SYMBOLS[i % CODE_SYMBOLS.length]
      // Golden angle distribution for even spreading
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      const theta = goldenAngle * i + (Math.random() - 0.5) * 0.6
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT) + (Math.random() - 0.5) * 0.3
      const r = 2.5 + Math.random() * 1.8

      return {
        symbol,
        texture: createSymbolTexture(symbol),
        basePosition: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ),
        floatSpeed: 0.28 + Math.random() * 0.32,
        floatOffset: Math.random() * Math.PI * 2,
        floatAmp: 0.08 + Math.random() * 0.14,
        scale: 0.44 + Math.random() * 0.26,
      }
    })

    // Build connection line geometry from nearby node pairs
    const lineVerts: number[] = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].basePosition.distanceTo(nodes[j].basePosition)
        if (dist < CONNECTION_THRESHOLD) {
          const a = nodes[i].basePosition
          const b = nodes[j].basePosition
          lineVerts.push(a.x, a.y, a.z, b.x, b.y, b.z)
        }
      }
    }

    const connectionGeo = new THREE.BufferGeometry()
    connectionGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVerts), 3)
    )

    return { nodes, connectionGeo }
  }, [])

  useFrame((state, delta) => {
    if (!mainGroupRef.current) return

    // Slow uniform Y rotation + mouse tilt
    mainGroupRef.current.rotation.y += delta * 0.042
    mainGroupRef.current.rotation.x +=
      (pointer.y * 0.12 - mainGroupRef.current.rotation.x) * 0.022

    if (!spritesGroupRef.current || nodes.length === 0) return

    const time = state.clock.elapsedTime
    const children = spritesGroupRef.current.children

    nodes.forEach((node, i) => {
      const sprite = children[i] as THREE.Sprite | undefined
      if (!sprite) return

      // Float up and down
      sprite.position.y =
        node.basePosition.y +
        Math.sin(time * node.floatSpeed + node.floatOffset) * node.floatAmp

      // Pulse opacity
      const mat = sprite.material as THREE.SpriteMaterial
      mat.opacity = 0.42 + Math.sin(time * 0.65 + node.floatOffset) * 0.16
    })
  })

  if (nodes.length === 0 || !connectionGeo) return null

  return (
    <group ref={mainGroupRef}>
      {/* Connection lines */}
      <lineSegments geometry={connectionGeo}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.10}
        />
      </lineSegments>

      {/* Symbol sprite nodes */}
      <group ref={spritesGroupRef}>
        {nodes.map((node, i) => (
          <sprite
            key={i}
            position={[node.basePosition.x, node.basePosition.y, node.basePosition.z]}
            scale={[node.scale, node.scale, node.scale]}
          >
            <spriteMaterial
              map={node.texture}
              transparent
              opacity={0.58}
              depthWrite={false}
            />
          </sprite>
        ))}
      </group>
    </group>
  )
}

// ─── Scene Fog Ring (soft depth boundary) ─────────────────────────────────────
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 4]} intensity={0.2} color="#ffffff" />
    </>
  )
}

// ─── Public Export ────────────────────────────────────────────────────────────
export function CodeConstellation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-72 h-72 rounded-full animate-pulse"
          style={{ border: "1px solid rgba(255,255,255,0.04)" }}
        />
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 44 }}
      className="w-full h-full"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Depth fog — creates cinematic depth and fades distant particles */}
      <fog attach="fog" args={["#050505", 9, 22]} />

      <SceneLighting />
      <ParticleField />
      <ConstellationCore />
    </Canvas>
  )
}
