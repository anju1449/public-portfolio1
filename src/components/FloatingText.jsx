import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';

function FloatingText({ text, position = [0, 0, 0] }) {
    const meshRef = useRef();

    const materialRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
            // Subtle rotation
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

            // Fade out on scroll
            if (materialRef.current) {
                const scrollY = window.scrollY;
                const opacity = Math.max(1 - scrollY / 500, 0); // Fade out over 500px
                materialRef.current.opacity = opacity;

                // Also hide if opacity is 0 to avoid GPU work
                meshRef.current.visible = opacity > 0;
            }
        }
    });

    return (
        <Center position={position}>
            <Text3D
                ref={meshRef}
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.5}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                {text}
                <meshStandardMaterial
                    ref={materialRef}
                    color="#ffffff"
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={1}
                />
            </Text3D>
        </Center>
    );
}

export default FloatingText;
