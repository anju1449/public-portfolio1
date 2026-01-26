import { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Scene state definitions
export const SCENE_STATES = {
    HERO: 'HERO',
    PROJECTS: 'PROJECTS',
    SKILLS: 'SKILLS',
    CONTACT: 'CONTACT'
};

// State configuration - defines visual properties for each scene state
const STATE_CONFIG = {
    [SCENE_STATES.HERO]: {
        geometry: {
            type: 'icosahedron',
            position: [3, 0, -2],
            rotation: [0, 0, 0],
            scale: 1.5,
            morphTarget: 0
        },
        colors: {
            accent: new THREE.Color('#00d4ff'), // Neon blue
            emissive: new THREE.Color('#0088cc')
        },
        starField: {
            speed: 0.0003,
            density: 1.0,
            behavior: 'drift' // slow calm drift
        },
        camera: {
            offset: [0, 0, 0],
            breathing: true, // Enable breathing dolly
            breathingAmplitude: 0.3
        }
    },
    [SCENE_STATES.PROJECTS]: {
        geometry: {
            type: 'octahedron',
            position: [-3, 1, -1],
            rotation: [Math.PI / 4, Math.PI / 4, 0],
            scale: 1.8,
            morphTarget: 1
        },
        colors: {
            accent: new THREE.Color('#ff00ff'), // Neon purple
            emissive: new THREE.Color('#cc00cc')
        },
        starField: {
            speed: 0.001,
            density: 1.0,
            behavior: 'warp' // warp streaks on scroll bursts
        },
        camera: {
            offset: [0.5, 0, 0], // Lateral pan
            breathing: false
        }
    },
    [SCENE_STATES.SKILLS]: {
        geometry: {
            type: 'torusKnot',
            position: [2, -1, -3],
            rotation: [0, Math.PI / 2, 0],
            scale: 1.2,
            morphTarget: 2
        },
        colors: {
            accent: new THREE.Color('#00ff9f'), // Neon green
            emissive: new THREE.Color('#00cc7f')
        },
        starField: {
            speed: 0.0002,
            density: 1.5, // Denser
            behavior: 'controlled' // slower, controlled
        },
        camera: {
            offset: [0, -0.3, 0], // Lower angle
            breathing: false
        }
    },
    [SCENE_STATES.CONTACT]: {
        geometry: {
            type: 'sphere',
            position: [0, 0, -2],
            rotation: [0, 0, 0],
            scale: 1.5,
            morphTarget: 3
        },
        colors: {
            accent: new THREE.Color('#ff0080'), // Neon pink
            emissive: new THREE.Color('#cc0066')
        },
        starField: {
            speed: 0.0001,
            density: 0.8,
            behavior: 'fade' // decelerate and fade
        },
        camera: {
            offset: [0, 0, 0], // Recenter
            breathing: false,
            stabilize: true
        }
    }
};

/**
 * Calculate current scene state based on scroll progress
 * Uses hysteresis to prevent flickering at boundaries
 */
function calculateSceneState(scrollProgress, prevState) {
    const HYSTERESIS = 0.05; // 5% buffer zone

    // Define state boundaries with hysteresis
    if (scrollProgress < 0.25 - HYSTERESIS) {
        return SCENE_STATES.HERO;
    } else if (scrollProgress < 0.25 + HYSTERESIS && prevState === SCENE_STATES.HERO) {
        return SCENE_STATES.HERO;
    } else if (scrollProgress < 0.5 - HYSTERESIS) {
        return SCENE_STATES.PROJECTS;
    } else if (scrollProgress < 0.5 + HYSTERESIS && prevState === SCENE_STATES.PROJECTS) {
        return SCENE_STATES.PROJECTS;
    } else if (scrollProgress < 0.75 - HYSTERESIS) {
        return SCENE_STATES.SKILLS;
    } else if (scrollProgress < 0.75 + HYSTERESIS && prevState === SCENE_STATES.SKILLS) {
        return SCENE_STATES.SKILLS;
    } else {
        return SCENE_STATES.CONTACT;
    }
}

/**
 * Hook to get current scene state and configuration
 * Returns: { state, config, progress, stateProgress }
 */
export function useSceneState() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentState, setCurrentState] = useState(SCENE_STATES.HERO);

    useEffect(() => {
        const handleScroll = () => {
            const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
            const scrollY = window.scrollY;
            const progress = Math.min(Math.max(scrollY / (scrollMax || 1), 0), 1);

            setScrollProgress(progress);

            // Update state with hysteresis
            setCurrentState(prevState => calculateSceneState(progress, prevState));
        };

        handleScroll(); // Initial calculation
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate progress within current state (0-1)
    const stateProgress = useMemo(() => {
        let stateStart, stateEnd;

        switch (currentState) {
            case SCENE_STATES.HERO:
                stateStart = 0;
                stateEnd = 0.25;
                break;
            case SCENE_STATES.PROJECTS:
                stateStart = 0.25;
                stateEnd = 0.5;
                break;
            case SCENE_STATES.SKILLS:
                stateStart = 0.5;
                stateEnd = 0.75;
                break;
            case SCENE_STATES.CONTACT:
                stateStart = 0.75;
                stateEnd = 1.0;
                break;
            default:
                stateStart = 0;
                stateEnd = 1;
        }

        const localProgress = (scrollProgress - stateStart) / (stateEnd - stateStart);
        return Math.min(Math.max(localProgress, 0), 1);
    }, [currentState, scrollProgress]);

    const config = useMemo(() => STATE_CONFIG[currentState], [currentState]);

    return {
        state: currentState,
        config,
        progress: scrollProgress,
        stateProgress
    };
}

/**
 * Get configuration for a specific state (useful for transitions)
 */
export function getStateConfig(state) {
    return STATE_CONFIG[state];
}
