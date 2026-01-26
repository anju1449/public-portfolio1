import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState, SCENE_STATES } from '../utils/sceneStateController';
import { usePerformanceMonitor } from '../utils/performanceMonitor';

/**
 * Enhanced GlobalGeometry with state-based morphing
 * Implements sequential transitions: morph → move → color
 */
function GlobalGeometry() {
    const meshRef = useRef();
    const materialRef = useRef();
    const geometryRef = useRef();

    const { state, config, stateProgress } = useSceneState();
    const { useStaticGeometry } = usePerformanceMonitor();

    // Track previous state for transition detection
    const prevStateRef = useRef(state);
    const transitionProgressRef = useRef(1); // 0 = start transition, 1 = complete

    // Current geometry type
    const [currentGeometryType, setCurrentGeometryType] = useState('icosahedron');

    // Detect state changes
    useEffect(() => {
        if (prevStateRef.current !== state) {
            // State changed - start transition
            transitionProgressRef.current = 0;
            prevStateRef.current = state;
        }
    }, [state]);

    // Create geometry based on type
    const geometry = useMemo(() => {
        switch (currentGeometryType) {
            case 'icosahedron':
                return new THREE.IcosahedronGeometry(1, 1);
            case 'octahedron':
                return new THREE.OctahedronGeometry(1, 0);
            case 'torusKnot':
                return new THREE.TorusKnotGeometry(0.6, 0.25, 100, 16);
            case 'sphere':
                return new THREE.SphereGeometry(1, 32, 32);
            default:
                return new THREE.IcosahedronGeometry(1, 1);
        }
    }, [currentGeometryType]);

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        const time = state.clock.getElapsedTime();
        const geometryConfig = config.geometry;
        const colorConfig = config.colors;

        // Update transition progress
        if (transitionProgressRef.current < 1) {
            transitionProgressRef.current = Math.min(transitionProgressRef.current + 0.02, 1);
        }

        const transitionProgress = transitionProgressRef.current;

        // ===== PHASE 1: MORPH GEOMETRY (0.0 - 0.3) =====
        const morphProgress = Math.min(transitionProgress / 0.3, 1);

        if (morphProgress < 1 && geometryConfig.type !== currentGeometryType) {
            // Morphing in progress - update geometry type when morph completes
            if (morphProgress >= 0.99) {
                setCurrentGeometryType(geometryConfig.type);
            }
        }

        // ===== PHASE 2: MOVE POSITION (0.5 - 0.8) =====
        const moveProgress = Math.max(0, Math.min((transitionProgress - 0.5) / 0.3, 1));

        // Target position from config
        const [targetX, targetY, targetZ] = geometryConfig.position;

        // Mouse parallax (subtle) - disabled if static geometry
        let mouseX = 0;
        let mouseY = 0;

        if (!useStaticGeometry) {
            mouseX = state.mouse.x * 0.5;
            mouseY = state.mouse.y * 0.5;
        }

        // Smooth lerp to target position
        const lerpFactor = useStaticGeometry ? 0.02 : 0.05;
        meshRef.current.position.x += (targetX + mouseX - meshRef.current.position.x) * lerpFactor;
        meshRef.current.position.y += (targetY + mouseY - meshRef.current.position.y) * lerpFactor;
        meshRef.current.position.z += (targetZ - meshRef.current.position.z) * lerpFactor;

        // ===== ROTATION LOGIC =====
        if (useStaticGeometry) {
            // Static geometry - minimal rotation
            meshRef.current.rotation.x = geometryConfig.rotation[0];
            meshRef.current.rotation.y = geometryConfig.rotation[1];
            meshRef.current.rotation.z = geometryConfig.rotation[2];
        } else {
            // Scroll-driven rotation with subtle time-based drift
            const scrollRotationX = geometryConfig.rotation[0] + (stateProgress * Math.PI);
            const scrollRotationY = geometryConfig.rotation[1] + (stateProgress * Math.PI * 2);

            meshRef.current.rotation.x = scrollRotationX + (time * 0.05);
            meshRef.current.rotation.y = scrollRotationY + (time * 0.1);
        }

        // ===== PHASE 3: CHANGE COLOR (0.7 - 1.0) =====
        const colorProgress = Math.max(0, Math.min((transitionProgress - 0.7) / 0.3, 1));

        // Lerp to target color
        materialRef.current.color.lerp(colorConfig.accent, 0.05);

        // Update emissive for glow effect
        if (materialRef.current.emissive) {
            materialRef.current.emissive.lerp(colorConfig.emissive, 0.05);
        }

        // ===== SCALE =====
        const targetScale = geometryConfig.scale;
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.05
        );
    });

    return (
        <group>
            <mesh ref={meshRef} position={[3, 0, -2]} scale={1.5} geometry={geometry}>
                <meshStandardMaterial
                    ref={materialRef}
                    color="#00d4ff"
                    wireframe
                    transparent
                    opacity={0.3}
                    emissive="#0088cc"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </group>
    );
}

export default GlobalGeometry;
