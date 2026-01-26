import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function HeroGeometry() {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;

        // Continuous rotation
        meshRef.current.rotation.x += 0.002;
        meshRef.current.rotation.y += 0.003;

        // Mouse parallax
        // Smoothly interpolate current rotation/position towards mouse target
        const { x, y } = state.mouse;

        // We only perturb the rotation slightly based on mouse
        meshRef.current.rotation.x += y * 0.002;
        meshRef.current.rotation.y += x * 0.002;
    });

    return (
        <Float
            speed={2} // Animation speed
            rotationIntensity={0.5} // Float rotation intensity
            floatIntensity={0.5} // Float height intensity
        >
            <mesh ref={meshRef} position={[3, 0, -2]} scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Inner shape for complexity */}
            <mesh ref={meshRef} position={[-3, 1, -4]} scale={0.8}>
                <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
                <meshStandardMaterial
                    color="#ff00ff"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </Float>
    );
}

export default HeroGeometry;
