'use client'

import { Float, Line, OrbitControls, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'

function NeuralCore() {
  const groupRef = useRef<Group>(null)
  const nodes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const angle = index * 0.74
        const radius = 1.72 + (index % 9) * 0.18
        return [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.34) * radius * 0.52,
          Math.sin(index * 1.18) * 0.82,
        ] as [number, number, number]
      }),
    [],
  )

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = elapsed * 0.12 + pointer.x * 0.18
    groupRef.current.rotation.x = Math.sin(elapsed * 0.35) * 0.12 - pointer.y * 0.14
    groupRef.current.position.x = pointer.x * 0.16
    groupRef.current.position.y = pointer.y * 0.1
  })

  return (
    <group ref={groupRef} scale={1.26}>
      <Float speed={1.25} rotationIntensity={0.22} floatIntensity={0.22}>
        <mesh>
          <icosahedronGeometry args={[1.18, 2]} />
          <meshStandardMaterial color="#EDE4D4" emissive="#6F5D49" emissiveIntensity={0.16} wireframe roughness={0.45} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.94, 0.01, 16, 128]} />
          <meshStandardMaterial color="#B8B8B0" transparent opacity={0.46} wireframe />
        </mesh>
        <mesh rotation={[0, Math.PI / 2.8, 0]}>
          <torusGeometry args={[2.5, 0.008, 16, 128]} />
          <meshStandardMaterial color="#EDE4D4" transparent opacity={0.22} wireframe />
        </mesh>
      </Float>

      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node}>
          <sphereGeometry args={[index % 5 === 0 ? 0.035 : 0.023, 12, 12]} />
          <meshBasicMaterial color={index % 5 === 0 ? '#F5EDE4' : '#B8B8B0'} transparent opacity={0.76} />
        </mesh>
      ))}

      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`line-${index}`}
          points={[node, nodes[index + 1]]}
          color="#EDE4D4"
          transparent
          opacity={0.13}
          lineWidth={1}
        />
      ))}
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 opacity-95">
      <Canvas camera={{ position: [0, 0, 5.9], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.64} />
        <pointLight position={[2.8, 2.4, 3.2]} color="#EDE4D4" intensity={16} />
        <pointLight position={[-2.8, -1.6, 2.4]} color="#B8B8B0" intensity={5} />
        <Stars radius={46} depth={20} count={820} factor={2.1} saturation={0} fade speed={0.18} />
        <NeuralCore />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,17,17,0.68)_0%,rgba(17,17,17,0.44)_18%,rgba(237,228,212,0.08)_42%,transparent_66%),linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.76))]" />
    </div>
  )
}
