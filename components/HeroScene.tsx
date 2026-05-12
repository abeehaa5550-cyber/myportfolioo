'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Spark/Particle Effect Component
function SparkEffect({ position }: { position: THREE.Vector3 }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 200

  useEffect(() => {
    if (!particlesRef.current) return

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Random position in sphere around contact point
      const angle = Math.random() * Math.PI * 2
      const elevation = Math.random() * Math.PI
      const radius = Math.random() * 0.5

      positions[i * 3] = position.x + Math.sin(elevation) * Math.cos(angle) * radius
      positions[i * 3 + 1] = position.y + Math.sin(elevation) * Math.sin(angle) * radius
      positions[i * 3 + 2] = position.z + Math.cos(elevation) * radius

      // Velocity vectors for outward movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.05
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.userData.velocities = velocities

    particlesRef.current.geometry = geometry
  }, [position, particleCount])

  useFrame(() => {
    if (!particlesRef.current) return

    const geometry = particlesRef.current.geometry as THREE.BufferGeometry
    const positions = geometry.attributes.position.array as Float32Array
    const velocities = geometry.userData.velocities as Float32Array

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]

      velocities[i * 3] *= 0.98
      velocities[i * 3 + 1] *= 0.98
      velocities[i * 3 + 2] *= 0.98
    }

    geometry.attributes.position.needsUpdate = true
  })

  const material = new THREE.PointsMaterial({
    color: '#a855f7',
    size: 0.1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  })

  return <points ref={particlesRef} material={material} />
}

// Hand Model Component
function Hand({
  modelPath,
  position,
  rotation,
  scale,
  targetPosition,
}: {
  modelPath: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  targetPosition: [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene: gltfScene } = useGLTF(modelPath) || { scene: new THREE.Scene() }

  useEffect(() => {
    if (groupRef.current && gltfScene) {
      groupRef.current.clear()
      groupRef.current.add(gltfScene.clone())
    }
  }, [gltfScene])

  // Animate towards target position
  useFrame(() => {
    if (!groupRef.current) return

    const current = groupRef.current.position
    current.x += (targetPosition[0] - current.x) * 0.02
    current.y += (targetPosition[1] - current.y) * 0.02
    current.z += (targetPosition[2] - current.z) * 0.02
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale} />
  )
}

// Main 3D Scene Component
function Scene3D({
  touchTriggered,
}: {
  touchTriggered: boolean
}) {
  const [sparkPosition, setSparkPosition] = useState<THREE.Vector3 | null>(null)

  // Target positions for hands
  const humanHandTarget: [number, number, number] = touchTriggered ? [0.5, 0, 0] : [-2, -1.5, -1]
  const aiHandTarget: [number, number, number] = touchTriggered ? [-0.5, 0, 0] : [2, 1.5, -1]

  // Trigger spark effect at contact point
  useEffect(() => {
    if (touchTriggered) {
      setSparkPosition(new THREE.Vector3(0, 0, 0))
    }
  }, [touchTriggered])

  return (
    <>
      {/* Lighting Setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
      
      <ambientLight intensity={0.5} color="#ffffff" />
      
      {/* Spotlight on contact point */}
      <spotLight
        position={[0, 2, 2]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#a855f7"
        castShadow
      />
      
      {/* Directional light for global illumination */}
      <directionalLight position={[-5, 5, 5]} intensity={1} color="#0ea5e9" />

      {/* Human Hand (from left) */}
      <Hand
        modelPath="/models/human_hand.glb"
        position={[-2, -1.5, -1]}
        rotation={[0.2, 0.3, -0.1]}
        scale={1.2}
        targetPosition={humanHandTarget}
      />

      {/* AI Hand (from right) */}
      <Hand
        modelPath="/models/ai_hand.glb"
        position={[2, 1.5, -1]}
        rotation={[0.1, -0.3, 0.2]}
        scale={1.2}
        targetPosition={aiHandTarget}
      />

      {/* Spark Effect at contact point */}
      {sparkPosition && <SparkEffect position={sparkPosition} />}

      {/* Glow around contact point */}
      {touchTriggered && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.15}
            wireframe={false}
          />
        </mesh>
      )}
    </>
  )
}

// Main HeroScene Component
export function HeroScene() {
  const [touchTriggered, setTouchTriggered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Trigger the touch animation after 2 seconds of loading
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setTouchTriggered(true)
    }, 2000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      dpr={[1, 2]}
      performance={{ current: 1, min: 0.5 }}
    >
      {/* Dark background with gradient */}
      <color attach="background" args={['#020617']} />
      
      {/* Scene with 3D hands and effects */}
      <Scene3D touchTriggered={touchTriggered} />

      {/* Optional: Fog for depth perception */}
      <fog attach="fog" args={['#020617', 5, 15]} />
    </Canvas>
  )
}
