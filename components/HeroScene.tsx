'use client'

import { Float, Line, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh, Points } from 'three'
import { AdditiveBlending, Color, Vector3 } from 'three'

function useNodeMap(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const ring = index % 3
        const angle = index * 0.63
        const radius = 1.35 + ring * 0.72 + ((index * 17) % 11) * 0.025
        return new Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.21) * (0.68 + ring * 0.2),
          Math.sin(angle * 0.87) * (0.62 + ring * 0.28),
        )
      }),
    [count],
  )
}

function WireSphere({
  position,
  scale,
  speed,
}: {
  position: [number, number, number]
  scale: number
  speed: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    const elapsed = clock.getElapsedTime()
    ref.current.rotation.x = elapsed * speed * 0.38 + pointer.y * 0.18
    ref.current.rotation.y = elapsed * speed * 0.52 + pointer.x * 0.24
    ref.current.position.x = position[0] + pointer.x * 0.18 * Math.abs(position[2])
    ref.current.position.y = position[1] + pointer.y * 0.12 * Math.abs(position[2])
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 3]} />
      <meshStandardMaterial
        color="#EDE4D4"
        emissive="#EDE4D4"
        emissiveIntensity={0.18}
        wireframe
        transparent
        opacity={0.42}
        roughness={0.28}
      />
    </mesh>
  )
}

function ParticleCloud() {
  const pointsRef = useRef<Points>(null)
  const positions = useMemo(() => {
    const coords = new Float32Array(520 * 3)
    for (let index = 0; index < 520; index += 1) {
      const stride = index * 3
      const angle = index * 2.41
      const radius = 2.9 + (index % 37) * 0.13
      coords[stride] = Math.cos(angle) * radius * 1.28
      coords[stride + 1] = Math.sin(index * 0.92) * 3.25
      coords[stride + 2] = Math.sin(angle) * radius - 1.85
    }
    return coords
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return
    const elapsed = clock.getElapsedTime()
    pointsRef.current.rotation.y = elapsed * 0.035 + pointer.x * 0.08
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.04 - pointer.y * 0.05
    pointsRef.current.position.x = pointer.x * 0.32
    pointsRef.current.position.y = pointer.y * 0.18
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#F5EDE4"
        transparent
        opacity={0.5}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function ConstellationBand() {
  const groupRef = useRef<Group>(null)
  const nodes = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => {
        const column = index % 19
        const row = Math.floor(index / 19)
        const x = -5.8 + column * 0.64
        const y = (row === 0 ? 1.65 : -1.55) + Math.sin(index * 0.8) * 0.42
        const z = -1.7 + Math.cos(index * 1.13) * 0.68
        return new Vector3(x, y, z)
      }),
    [],
  )

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const elapsed = clock.getElapsedTime()
    groupRef.current.position.x = pointer.x * 0.72
    groupRef.current.position.y = pointer.y * 0.24 + Math.sin(elapsed * 0.22) * 0.04
    groupRef.current.rotation.y = pointer.x * 0.08
    groupRef.current.rotation.x = -pointer.y * 0.05
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh key={`wide-node-${index}`} position={node}>
          <sphereGeometry args={[index % 6 === 0 ? 0.034 : 0.019, 12, 12]} />
          <meshBasicMaterial color={index % 6 === 0 ? '#F5EDE4' : '#C5B49F'} transparent opacity={0.48} />
        </mesh>
      ))}
      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`wide-link-${index}`}
          points={[node, nodes[index + 1]]}
          color="#EDE4D4"
          transparent
          opacity={index % 5 === 0 ? 0.15 : 0.07}
          lineWidth={1}
        />
      ))}
      {nodes.slice(0, 19).map((node, index) => (
        <Line
          key={`wide-vertical-${index}`}
          points={[node, nodes[index + 19]]}
          color="#C5B49F"
          transparent
          opacity={0.045}
          lineWidth={1}
        />
      ))}
    </group>
  )
}

function NeuralField() {
  const groupRef = useRef<Group>(null)
  const cursorRef = useRef<Mesh>(null)
  const { viewport } = useThree()
  const nodes = useNodeMap(54)
  const linePairs = useMemo(
    () =>
      nodes.flatMap((node, index) => {
        const next = nodes[(index + 1) % nodes.length]
        const skip = nodes[(index + 9) % nodes.length]
        return index % 4 === 0 ? [[node, next], [node, skip]] : [[node, next]]
      }),
    [nodes],
  )

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.08 + pointer.x * 0.34
      groupRef.current.rotation.x = Math.sin(elapsed * 0.28) * 0.1 - pointer.y * 0.24
      groupRef.current.position.x = pointer.x * 0.48
      groupRef.current.position.y = pointer.y * 0.26
    }

    if (cursorRef.current) {
      cursorRef.current.position.x = pointer.x * viewport.width * 0.26
      cursorRef.current.position.y = pointer.y * viewport.height * 0.2
      cursorRef.current.position.z = 1.2
      const pulse = 1 + Math.sin(elapsed * 3.2) * 0.08
      cursorRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <>
      <group ref={groupRef} scale={1.1}>
        <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.22}>
          <mesh>
            <sphereGeometry args={[1.08, 32, 32]} />
            <meshStandardMaterial
              color="#F5EDE4"
              emissive="#EDE4D4"
              emissiveIntensity={0.2}
              wireframe
              transparent
              opacity={0.34}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.5, 0.15, 0]}>
            <torusGeometry args={[1.78, 0.009, 12, 160]} />
            <meshBasicMaterial color="#EDE4D4" transparent opacity={0.48} />
          </mesh>
          <mesh rotation={[0.45, Math.PI / 2.4, 0]}>
            <torusGeometry args={[2.34, 0.008, 12, 160]} />
            <meshBasicMaterial color="#C5B49F" transparent opacity={0.34} />
          </mesh>
          <mesh rotation={[0.18, 0, Math.PI / 2.7]}>
            <torusGeometry args={[2.8, 0.006, 12, 160]} />
            <meshBasicMaterial color="#F5EDE4" transparent opacity={0.16} />
          </mesh>
        </Float>

        {nodes.map((node, index) => (
          <mesh key={`node-${index}`} position={node}>
            <sphereGeometry args={[index % 7 === 0 ? 0.05 : 0.027, 16, 16]} />
            <meshBasicMaterial
              color={index % 7 === 0 ? '#F5EDE4' : '#D8CDBA'}
              transparent
              opacity={index % 7 === 0 ? 0.9 : 0.64}
            />
          </mesh>
        ))}

        {linePairs.map(([start, end], index) => (
          <Line
            key={`link-${index}`}
            points={[start, end]}
            color={index % 3 === 0 ? '#F5EDE4' : '#C5B49F'}
            transparent
            opacity={index % 3 === 0 ? 0.18 : 0.11}
            lineWidth={1}
          />
        ))}
      </group>

      <mesh ref={cursorRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color={new Color('#F5EDE4')} transparent opacity={0.08} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full opacity-95">
      <Canvas camera={{ position: [0, 0, 6.4], fov: 54 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.58} />
        <pointLight position={[3.4, 2.8, 3.5]} color="#F5EDE4" intensity={22} />
        <pointLight position={[-3.2, -2.1, 2.6]} color="#8C7561" intensity={9} />
        <ParticleCloud />
        <ConstellationBand />
        <WireSphere position={[-4.45, 1.15, -1.35]} scale={0.5} speed={0.72} />
        <WireSphere position={[4.25, -0.88, -1.7]} scale={0.66} speed={0.54} />
        <WireSphere position={[-2.25, -1.95, -2.35]} scale={0.34} speed={0.82} />
        <WireSphere position={[2.35, 1.9, -2.2]} scale={0.36} speed={0.9} />
        <NeuralField />
        <Sparkles count={96} scale={[10.5, 4.6, 5.2]} size={1.15} speed={0.22} color="#EDE4D4" opacity={0.26} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--cursor-x,50%)_var(--cursor-y,45%),rgba(245,237,228,0.16),transparent_17rem),radial-gradient(circle_at_center,rgba(17,17,17,0.28)_0%,rgba(17,17,17,0.18)_30%,rgba(17,17,17,0.68)_76%),linear-gradient(180deg,rgba(17,17,17,0.06),rgba(17,17,17,0.86))]" />
    </div>
  )
}
