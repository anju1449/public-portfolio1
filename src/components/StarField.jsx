import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 5000 }) {
    const points = useRef();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;

            positions.set([x, y, z], i * 3);
        }

        return positions;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            // Base rotation - very slow drift
            let rotationSpeed = 0.0003;

            // Accelerate based on scroll position - "Warp Speed" effect
            // We use window.scrollY directly for simplicity in this global context
            const scrollY = window.scrollY;
            // Much subtler acceleration
            rotationSpeed += Math.min(scrollY * 0.00002, 0.02);

            points.current.rotation.y += rotationSpeed;
            points.current.rotation.x += rotationSpeed * 0.2;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                sizeAttenuation
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default StarField;
