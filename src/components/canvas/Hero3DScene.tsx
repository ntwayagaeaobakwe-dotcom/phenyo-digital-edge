import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

function NodeNetwork() {
  const group = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  // Create random nodes
  const nodeCount = 30;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [nodeCount]);

  // Create lines connecting close nodes
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 3.5) {
          temp.push([nodes[i], nodes[j]]);
        }
      }
    }
    return temp;
  }, [nodes, nodeCount]);

  useFrame((state) => {
    if (!group.current) return;
    // Slow rotation
    group.current.rotation.y = state.clock.elapsedTime * 0.05;
    group.current.rotation.x = state.clock.elapsedTime * 0.02;

    // Subtle mouse parallax
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    group.current.position.x += (targetX - group.current.position.x) * 0.02;
    group.current.position.y += (targetY - group.current.position.y) * 0.02;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {nodes.map((pos, i) => (
          <Sphere key={`node-${i}`} position={pos} args={[0.08, 16, 16]}>
            <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
          </Sphere>
        ))}
        {lines.map((line, i) => (
          <Line
            key={`line-${i}`}
            points={line}
            color="#d946ef"
            opacity={0.15}
            transparent
            lineWidth={1}
          />
        ))}
      </Float>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />
        <NodeNetwork />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
