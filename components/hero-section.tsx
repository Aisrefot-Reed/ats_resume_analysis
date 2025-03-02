"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function RadarWave({ position = [0, -2, 0], color = "#2F80ED" }) {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, 1 + Math.sin(t) * 0.2, 0.1)
      mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, 1 + Math.sin(t) * 0.2, 0.1)
      mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, 1 + Math.sin(t) * 0.2, 0.1)
      mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2
      mesh.current.material.opacity = THREE.MathUtils.lerp(mesh.current.material.opacity, 0.5 + Math.sin(t) * 0.2, 0.1)
    }
  })

  return (
    <mesh ref={mesh} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[3, 3.1, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  )
}

function ResumeScene() {
  const group = useRef<THREE.Group>(null!)

  useFrame(({ clock, mouse }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.2, 0.1)
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * 0.2, 0.1)
    }
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#56CCF2"
            metalness={0.2}
            roughness={0.3}
            emissive="#56CCF2"
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.55, 32, 32]} />
          <meshStandardMaterial color="#2F80ED" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Resume paths */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#38A3A5" transparent opacity={0.6} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#56CCF2" transparent opacity={0.6} />
        </mesh>
      </Float>

      <RadarWave position={[0, -2, 0]} color="#2F80ED" />
      <RadarWave position={[0, -2.2, 0]} color="#56CCF2" />
      <RadarWave position={[0, -2.4, 0]} color="#38A3A5" />
    </group>
  )
}

export default function HeroSection() {
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-3xl">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold text-[#222222] mb-4 bg-white/80 px-6 py-2 rounded-lg backdrop-blur-sm">
          ATS Resume Builder
        </h1>
        <p className="text-xl md:text-2xl text-[#2F80ED] max-w-2xl bg-white/80 px-6 py-2 rounded-lg backdrop-blur-sm">
          Create professional ATS-friendly resumes with the STAR method
        </p>
      </div>

      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ResumeScene />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  )
}

