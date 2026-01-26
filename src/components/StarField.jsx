import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState, SCENE_STATES } from '../utils/sceneStateController';
import { usePerformanceMonitor } from '../utils/performanceMonitor';

/**
 * Enhanced StarField with state-aware behavior and scroll velocity
 * Implements narrative star behaviors per scene state
 */
function StarField({ count = 5000 }) {
    const points = useRef();
    const { state, config } = useSceneState();
    const { reduceStarCount } = usePerformanceMonitor();

    // Scroll velocity tracking
    const prevScrollYRef = useRef(0);
    const smoothVelocityRef = useRef(0);
    const lastTimeRef = useRef(performance.now());

    // Adjust particle count based on performance
    const adjustedCount = reduceStarCount ? Math.floor(count / 2) : count;

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(adjustedCount * 3);

        for (let i = 0; i < adjustedCount; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;

            positions.set([x, y, z], i * 3);
        }

        return positions;
    }, [adjustedCount]);

    // Particle sizes (for warp effect)
    const particleSizes = useMemo(() => {
        const sizes = new Float32Array(adjustedCount);
        for (let i = 0; i < adjustedCount; i++) {
            sizes[i] = Math.random() * 0.05 + 0.02;
        }
        return sizes;
    }, [adjustedCount]);

    useFrame((state) => {
        if (!points.current) return;

        const currentTime = performance.now();
        const deltaTime = Math.max(currentTime - lastTimeRef.current, 16); // Clamp to 60fps min
        lastTimeRef.current = currentTime;

        // Calculate scroll velocity
        const scrollY = window.scrollY;
        const rawVelocity = Math.abs(scrollY - prevScrollYRef.current) / deltaTime;
        prevScrollYRef.current = scrollY;

        // Exponential smoothing for velocity
        smoothVelocityRef.current += (rawVelocity - smoothVelocityRef.current) * 0.1;

        const starFieldConfig = config.starField;
        let rotationSpeed = starFieldConfig.speed;
        let opacity = 0.8;
        let size = 0.05;

        // State-specific behaviors
        switch (state) {
            case SCENE_STATES.HERO:
                // Slow calm drift (default)
                break;

            case SCENE_STATES.PROJECTS:
                // Warp streaks on scroll bursts
                const WARP_THRESHOLD = 0.5;
                if (smoothVelocityRef.current > WARP_THRESHOLD) {
                    // Warp effect - increase speed and stretch
                    rotationSpeed *= (1 + smoothVelocityRef.current * 2);
                    opacity = Math.min(1, 0.8 + smoothVelocityRef.current * 0.4);
                    size *= (1 + smoothVelocityRef.current * 0.5);
                }
                break;

            case SCENE_STATES.SKILLS:
                // Denser, slower, controlled
                // Density handled by count, speed already configured
                break;

            case SCENE_STATES.CONTACT:
                // Decelerate and fade
                rotationSpeed *= 0.5;
                opacity = 0.3;
                break;
        }

        // Apply rotation
        points.current.rotation.y += rotationSpeed;
        points.current.rotation.x += rotationSpeed * 0.2;

        // Update material properties
        if (points.current.material) {
            points.current.material.opacity = opacity;
            points.current.material.size = size;
            points.current.material.needsUpdate = true;
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
                <bufferAttribute
                    attach="attributes-size"
                    count={particleSizes.length}
                    array={particleSizes}
                    itemSize={1}
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
