'use client'

import { Effects, Environment, Lightformer, Line, Sparkles } from '@react-three/drei'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import type { ThreeElement } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh, Points } from 'three'
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Shape,
  Vector3,
  Vector2,
  ExtrudeGeometry,
} from 'three'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

declare module '@react-three/fiber' {
  interface ThreeElements {
    unrealBloomPass: ThreeElement<typeof UnrealBloomPass>
  }
}

type CrystalClusterConfig = {
  position: [number, number, number]
  scale: number
  rotation: [number, number, number]
  parallax: number
  drift: number
  side: 'topRight' | 'bottomLeft'
}

const crystalClusters: CrystalClusterConfig[] = [
  {
    position: [5.18, 1.96, -1.12],
    scale: 1.72,
    rotation: [-0.18, -0.36, -0.08],
    parallax: 0.56,
    drift: 0.24,
    side: 'topRight',
  },
  {
    position: [-5.24, -1.92, -1.08],
    scale: 1.78,
    rotation: [0.12, 0.28, 0.08],
    parallax: 0.58,
    drift: 0.26,
    side: 'bottomLeft',
  },
  {
    position: [-4.92, 1.54, -2.42],
    scale: 1.08,
    rotation: [-0.06, -0.46, 0.34],
    parallax: 0.38,
    drift: 0.18,
    side: 'topRight',
  },
  {
    position: [4.98, -1.58, -2.48],
    scale: 1.1,
    rotation: [0.08, 0.48, -0.32],
    parallax: 0.4,
    drift: 0.18,
    side: 'bottomLeft',
  },
]

const topRightPath = [
  new Vector3(-1.2, 0.08, 0.04),
  new Vector3(-0.42, 1.52, -0.12),
  new Vector3(0.12, 0.2, 0.12),
  new Vector3(0.72, 1.18, -0.06),
  new Vector3(1.22, -0.18, 0.08),
  new Vector3(1.74, 0.72, -0.1),
]

const bottomLeftPath = [
  new Vector3(-1.74, -0.74, -0.1),
  new Vector3(-1.18, 0.32, 0.12),
  new Vector3(-0.48, -1.02, -0.04),
  new Vector3(0.16, 0.18, 0.08),
  new Vector3(0.84, -0.82, -0.1),
  new Vector3(1.32, 0.36, 0.06),
]

function createSliverGeometry(width = 0.18, length = 1.72, depth = 0.18) {
  const geometry = new Shape()
  geometry.moveTo(-width * 0.35, -length * 0.5)
  geometry.lineTo(width * 0.48, -length * 0.12)
  geometry.lineTo(width * 0.18, length * 0.5)
  geometry.lineTo(-width * 0.5, length * 0.18)
  geometry.lineTo(-width * 0.35, -length * 0.5)

  return new ExtrudeGeometry(geometry, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.025,
    bevelThickness: 0.026,
    bevelSegments: 1,
  })
}

function createFacetGeometry() {
  const geometry = new Shape()
  geometry.moveTo(-0.72, -0.36)
  geometry.lineTo(0.38, -0.58)
  geometry.lineTo(0.86, 0.28)
  geometry.lineTo(-0.18, 0.72)
  geometry.lineTo(-0.72, -0.36)

  return new ExtrudeGeometry(geometry, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSize: 0.018,
    bevelThickness: 0.02,
    bevelSegments: 1,
  })
}

function usePrismGeometry() {
  const geometry = useMemo<BufferGeometry>(() => {
    const vertices = new Float32Array([
      0, 1.25, 0,
      -0.64, 0, 0.46,
      0.64, 0, 0.46,
      0.64, 0, -0.46,
      -0.64, 0, -0.46,
      0, -1.25, 0,
    ])

    const indices = [
      0, 1, 2,
      0, 2, 3,
      0, 3, 4,
      0, 4, 1,
      5, 2, 1,
      5, 3, 2,
      5, 4, 3,
      5, 1, 4,
    ]

    const prism = new BufferGeometry()
    prism.setIndex(indices)
    prism.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    prism.computeVertexNormals()
    return prism
  }, [])

  return geometry
}

function ParticleMist() {
  const pointsRef = useRef<Points>(null)
  const positions = useMemo(() => {
    const coords = new Float32Array(640 * 3)

    for (let index = 0; index < 640; index += 1) {
      const stride = index * 3
      const angle = index * 2.37
      const radius = 3.4 + (index % 47) * 0.09

      coords[stride] = Math.cos(angle) * radius * 1.55
      coords[stride + 1] = Math.sin(index * 0.7) * 3.1
      coords[stride + 2] = Math.sin(angle) * radius - 2.4
    }

    return coords
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return

    const elapsed = clock.getElapsedTime()
    pointsRef.current.rotation.y = elapsed * 0.018 + pointer.x * 0.07
    pointsRef.current.position.x = pointer.x * 0.22
    pointsRef.current.position.y = pointer.y * 0.12
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#F5EDE4"
        size={0.014}
        transparent
        opacity={0.36}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function GlowPlane({
  position,
  rotation,
  scale,
  opacity,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  opacity: number
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#F5EDE4"
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  )
}

function GlassMaterial({
  opacity = 0.52,
  accent = '#F5EDE4',
}: {
  opacity?: number
  accent?: string
}) {
  return (
    <meshPhysicalMaterial
      color="#F5EDE4"
      emissive={new Color(accent)}
      emissiveIntensity={0.16}
      transparent
      opacity={opacity}
      roughness={0.025}
      metalness={0.1}
      transmission={0.92}
      thickness={2.15}
      ior={1.72}
      reflectivity={1}
      clearcoat={1}
      clearcoatRoughness={0.035}
      side={DoubleSide}
    />
  )
}

function CrystalShard({
  geometry,
  position,
  rotation,
  scale,
  accent,
  index,
}: {
  geometry: BufferGeometry
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  accent: string
  index: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const elapsed = clock.getElapsedTime()
    meshRef.current.rotation.x = rotation[0] + Math.sin(elapsed * 0.2 + index) * 0.052
    meshRef.current.rotation.y = rotation[1] + elapsed * (0.036 + index * 0.0016)
    meshRef.current.rotation.z = rotation[2] + Math.cos(elapsed * 0.18 + index) * 0.045
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} rotation={rotation} scale={scale}>
      <GlassMaterial opacity={0.52} accent={accent} />
    </mesh>
  )
}

function CrystalCluster({ config, index }: { config: CrystalClusterConfig; index: number }) {
  const groupRef = useRef<Group>(null)
  const prismGeometry = usePrismGeometry()
  const sliverGeometry = useMemo(() => createSliverGeometry(), [])
  const longSliverGeometry = useMemo(() => createSliverGeometry(0.16, 2.36, 0.16), [])
  const facetGeometry = useMemo(() => createFacetGeometry(), [])
  const path = config.side === 'topRight' ? topRightPath : bottomLeftPath
  const edgeColor = config.side === 'topRight' ? '#F5EDE4' : '#D8CDBA'

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return

    const elapsed = clock.getElapsedTime()
    groupRef.current.position.x = config.position[0] + pointer.x * config.parallax + Math.sin(elapsed * 0.15 + index) * config.drift
    groupRef.current.position.y =
      config.position[1] + pointer.y * config.parallax * 0.54 + Math.cos(elapsed * 0.13 + index) * config.drift * 0.72
    groupRef.current.position.z = config.position[2] + Math.sin(elapsed * 0.12 + index) * 0.12
    groupRef.current.rotation.x = config.rotation[0] - pointer.y * 0.075 + Math.sin(elapsed * 0.1) * 0.03
    groupRef.current.rotation.y = config.rotation[1] + pointer.x * 0.11 + elapsed * 0.02
    groupRef.current.rotation.z = config.rotation[2] + Math.sin(elapsed * 0.12 + index) * 0.038
  })

  return (
    <group ref={groupRef} scale={config.scale}>
      <GlowPlane
        position={config.side === 'topRight' ? [0.64, 0.34, -0.24] : [-0.54, -0.2, -0.24]}
        rotation={[0, 0, config.side === 'topRight' ? -0.82 : -0.9]}
        scale={[0.16, 4.9, 1]}
        opacity={0.16}
      />
      <GlowPlane
        position={config.side === 'topRight' ? [0.12, 0.84, -0.28] : [-0.04, -0.78, -0.28]}
        rotation={[0, 0, config.side === 'topRight' ? 0.58 : 0.72]}
        scale={[0.09, 3.4, 1]}
        opacity={0.1}
      />

      <Line points={path} color={edgeColor} transparent opacity={0.96} lineWidth={1.55} />
      <Line
        points={path.map((point) => point.clone().add(new Vector3(0.055, -0.055, 0.08)))}
        color="#AEEAF1"
        transparent
        opacity={0.18}
        lineWidth={1}
      />
      <Line
        points={path.map((point) => point.clone().add(new Vector3(-0.065, 0.05, -0.06)))}
        color="#F3D6B8"
        transparent
        opacity={0.22}
        lineWidth={1}
      />

      {path.slice(0, -1).map((point, shardIndex) => {
        const next = path[shardIndex + 1]
        const midpoint = point.clone().lerp(next, 0.5)
        const angle = Math.atan2(next.y - point.y, next.x - point.x) - Math.PI / 2

        return (
          <CrystalShard
            key={`spine-shard-${config.side}-${shardIndex}`}
            geometry={shardIndex % 2 === 0 ? longSliverGeometry : sliverGeometry}
            position={[midpoint.x, midpoint.y, midpoint.z]}
            rotation={[0.36 + shardIndex * 0.08, -0.16 + shardIndex * 0.09, angle]}
            scale={[1.02 + shardIndex * 0.04, 1.1, 1]}
            accent={shardIndex % 2 === 0 ? '#F5EDE4' : '#C5B49F'}
            index={shardIndex + index * 8}
          />
        )
      })}

      <CrystalShard
        geometry={prismGeometry}
        position={config.side === 'topRight' ? [-0.8, 0.62, 0.04] : [0.68, -0.48, 0.02]}
        rotation={config.side === 'topRight' ? [0.42, -0.24, -0.28] : [-0.32, 0.24, 0.48]}
        scale={config.side === 'topRight' ? [0.86, 1.5, 0.72] : [0.92, 1.62, 0.78]}
        accent="#F5EDE4"
        index={index * 11 + 1}
      />
      <CrystalShard
        geometry={prismGeometry}
        position={config.side === 'topRight' ? [0.92, 0.48, -0.08] : [-0.92, -0.54, -0.08]}
        rotation={config.side === 'topRight' ? [-0.16, 0.38, 0.58] : [0.18, -0.44, -0.58]}
        scale={config.side === 'topRight' ? [0.62, 1.12, 0.58] : [0.7, 1.28, 0.64]}
        accent="#D8CDBA"
        index={index * 11 + 2}
      />
      <CrystalShard
        geometry={facetGeometry}
        position={config.side === 'topRight' ? [0.12, -0.54, -0.12] : [-0.2, 0.5, -0.12]}
        rotation={config.side === 'topRight' ? [0.22, -0.36, -0.16] : [-0.18, 0.36, 0.16]}
        scale={[1.22, 0.9, 0.78]}
        accent="#B8B8B0"
        index={index * 11 + 3}
      />
    </group>
  )
}

function CenterAtmosphere() {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return

    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = pointer.x * 0.05 + Math.sin(elapsed * 0.08) * 0.025
    groupRef.current.position.x = pointer.x * 0.16
    groupRef.current.position.y = pointer.y * 0.08
  })

  return (
    <group ref={groupRef} position={[0, 0, -2.28]}>
      <Line
        points={[
          new Vector3(-5.3, 1.24, 0),
          new Vector3(-2.65, 0.42, -0.12),
          new Vector3(0.12, 0.78, -0.18),
          new Vector3(2.62, 0.34, -0.12),
          new Vector3(5.24, 1.02, 0),
        ]}
        color="#F5EDE4"
        transparent
        opacity={0.08}
        lineWidth={1}
      />
      <Line
        points={[
          new Vector3(-4.9, -1.32, 0),
          new Vector3(-2.1, -0.72, -0.1),
          new Vector3(0.2, -1.02, -0.16),
          new Vector3(2.24, -0.58, -0.1),
          new Vector3(4.85, -1.18, 0),
        ]}
        color="#C5B49F"
        transparent
        opacity={0.07}
        lineWidth={1}
      />
    </group>
  )
}

function CrystalScene() {
  const sceneRef = useRef<Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!sceneRef.current) return

    const elapsed = clock.getElapsedTime()
    sceneRef.current.rotation.y = pointer.x * 0.04 + Math.sin(elapsed * 0.08) * 0.014
    sceneRef.current.rotation.x = -pointer.y * 0.026
  })

  return (
    <group ref={sceneRef}>
      <ParticleMist />
      <CenterAtmosphere />
      {crystalClusters.map((config, index) => (
        <CrystalCluster key={`${config.side}-${index}`} config={config} index={index} />
      ))}
      <Sparkles count={76} scale={[11.6, 5.6, 4.8]} size={1.28} speed={0.1} color="#F5EDE4" opacity={0.24} />
      <Sparkles count={26} scale={[8.8, 4.4, 3.8]} size={2.4} speed={0.06} color="#D8CDBA" opacity={0.14} />
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full opacity-100">
      <Canvas
        camera={{ position: [0, 0, 6.35], fov: 52 }}
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080808']} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[0, 4.8, 4.8]} color="#F5EDE4" intensity={3.2} />
        <pointLight position={[-5.1, -2.9, 3.4]} color="#F5EDE4" intensity={34} distance={10} decay={2} />
        <pointLight position={[5.1, 3, 3.2]} color="#EDE4D4" intensity={42} distance={10} decay={2} />
        <pointLight position={[0, 0.3, 4.2]} color="#C5B49F" intensity={10} distance={7} decay={2} />

        <Environment resolution={128}>
          <Lightformer form="rect" color="#F5EDE4" intensity={4.2} position={[0, 4.2, -1.8]} scale={[7.2, 1.2, 1]} />
          <Lightformer form="rect" color="#FFFFFF" intensity={2.8} position={[5.4, 1.8, 1.6]} scale={[1.1, 5.8, 1]} />
          <Lightformer form="rect" color="#D8CDBA" intensity={2.6} position={[-5.2, -1.6, 1.4]} scale={[1.2, 5.4, 1]} />
          <Lightformer form="ring" color="#C5B49F" intensity={1.8} position={[0, 0, 3.2]} scale={[3.2, 3.2, 1]} />
        </Environment>

        <CrystalScene />
        <Effects multisamping={4} disableGamma>
          <unrealBloomPass args={[new Vector2(1024, 1024), 0.5, 0.72, 0.82]} />
        </Effects>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--cursor-x,50%)_var(--cursor-y,45%),rgba(245,237,228,0.12),transparent_15rem),radial-gradient(circle_at_center,rgba(8,8,8,0.2)_0%,rgba(8,8,8,0.18)_30%,rgba(8,8,8,0.74)_82%),linear-gradient(180deg,rgba(8,8,8,0.14),rgba(8,8,8,0.82))]" />
    </div>
  )
}
