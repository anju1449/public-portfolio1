import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobalGeometry() {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        // Calculate scroll progress (0 to 1)
        // Using document.documentElement.scrollHeight for better cross-browser support
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;

        // 0.0 at top, 1.0 at bottom
        // Clamp to ensure it stays within bounds
        const progress = Math.min(Math.max(scrollY / (scrollMax || 1), 0), 1);

        const time = state.clock.getElapsedTime();

        // --- POSITION LOGIC ---
        // Top: Center [0, 0, 0]
        // Middle: Right [4, 0, 0]
        // Bottom: Left [-4, 0, 0] or Center again

        // We'll use sine waves to move it smoothly across the screen
        // x goes from 3 (start) -> -3 (middle) -> 3 (end) roughly
        const targetX = Math.cos(progress * Math.PI * 2) * 3;
        const targetY = Math.sin(progress * Math.PI) * 1; // Slight arc up/down
        const targetZ = -2 + Math.sin(progress * Math.PI) * 2; // Moves closer/further

        // Mouse Parallax (keep it subtle)
        const mouseX = state.mouse.x * 0.5;
        const mouseY = state.mouse.y * 0.5;

        // Lerp position for smoothness
        meshRef.current.position.x += (targetX + mouseX - meshRef.current.position.x) * 0.05;
        meshRef.current.position.y += (targetY + mouseY - meshRef.current.position.y) * 0.05;
        meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.05;

        // --- ROTATION LOGIC ---
        // Controlled rotation based on scroll (Scrubbing) -> Premium feel
        // We remove the fast time-based spin.
        // Slight time-based drift for "alive" feel, but very slow.
        meshRef.current.rotation.x = (time * 0.05) + (progress * Math.PI * 2);
        meshRef.current.rotation.y = (time * 0.1) + (progress * Math.PI * 4);

        // --- COLOR LOGIC ---
        // Interpolate colors based on progress
        // 0.0 -> Blue (#00d4ff)
        // 0.5 -> Purple (#ff00ff)
        // 1.0 -> Green (#00ff00)

        const color1 = new THREE.Color("#00d4ff");
        const color2 = new THREE.Color("#ff00ff");
        const color3 = new THREE.Color("#00ff9f"); // Neon green

        let targetColor = new THREE.Color();

        if (progress < 0.5) {
            // Lerp between 1 and 2
            const localProgress = progress * 2; // 0 to 1
            targetColor.lerpColors(color1, color2, localProgress);
        } else {
            // Lerp between 2 and 3
            const localProgress = (progress - 0.5) * 2; // 0 to 1
            targetColor.lerpColors(color2, color3, localProgress);
        }

        materialRef.current.color.lerp(targetColor, 0.05);
    });

    return (
        <group>
            {/* Main morphing shape */}
            <mesh ref={meshRef} position={[3, 0, -2]} scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    ref={materialRef}
                    color="#00d4ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
}

export default GlobalGeometry;
