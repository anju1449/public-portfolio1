import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSceneState } from '../utils/sceneStateController';
import { usePerformanceMonitor } from '../utils/performanceMonitor';

/**
 * Camera controller for cinematic scroll-mapped motion
 * Implements subtle camera movements per scene state
 */
function CameraController() {
    const { camera } = useThree();
    const { config, stateProgress } = useSceneState();
    const { disableParallax } = usePerformanceMonitor();

    const timeRef = useRef(0);
    const targetPositionRef = useRef([0, 0, 5]);
    const targetRotationRef = useRef([0, 0, 0]);

    useFrame((state, delta) => {
        // Skip camera motion on mobile/low-end devices
        if (disableParallax) {
            return;
        }

        timeRef.current += delta;
        const cameraConfig = config.camera;

        // Calculate target position based on state
        let targetX = cameraConfig.offset[0];
        let targetY = cameraConfig.offset[1];
        let targetZ = 5 + cameraConfig.offset[2];

        // Hero: Breathing dolly motion (±0.3 units on Z-axis)
        if (cameraConfig.breathing) {
            const breathingCycle = Math.sin(timeRef.current * 0.5) * cameraConfig.breathingAmplitude;
            targetZ += breathingCycle;
        }

        // Projects: Lateral pan mapped to scroll progress within state
        if (config.camera.offset[0] !== 0) {
            // Smooth pan across the state progress
            targetX = cameraConfig.offset[0] * Math.sin(stateProgress * Math.PI);
        }

        // Contact: Stabilize (recenter)
        if (cameraConfig.stabilize) {
            targetX = 0;
            targetY = 0;
            targetZ = 5;
        }

        // Store target
        targetPositionRef.current = [targetX, targetY, targetZ];

        // Smooth lerp to target position
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.position.z += (targetZ - camera.position.z) * 0.05;

        // Subtle rotation (max ±3 degrees = ±0.052 radians)
        const MAX_ROTATION = 0.052;

        // Rotate slightly based on offset (look at where we're moving)
        const targetRotationY = -targetX * 0.1; // Subtle look left/right
        const targetRotationX = -targetY * 0.1; // Subtle look up/down

        // Clamp rotation
        const clampedRotationY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, targetRotationY));
        const clampedRotationX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, targetRotationX));

        // Smooth lerp to target rotation
        camera.rotation.y += (clampedRotationY - camera.rotation.y) * 0.03;
        camera.rotation.x += (clampedRotationX - camera.rotation.x) * 0.03;
    });

    return null; // This component doesn't render anything
}

export default CameraController;
