import { useState, useEffect, useRef } from 'react';

const FPS_SAMPLE_SIZE = 60; // Track FPS over 60 frames
const LOW_FPS_THRESHOLD = 30;
const CHECK_INTERVAL = 2000; // Check performance every 2 seconds

/**
 * Detect device capabilities
 */
function detectCapabilities() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    ) || ('ontouchstart' in window);

    const isLowDPR = window.devicePixelRatio < 1.5;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
        isMobile,
        isLowDPR,
        isReducedMotion
    };
}

/**
 * FPS tracker using requestAnimationFrame
 */
class FPSTracker {
    constructor() {
        this.frames = [];
        this.lastTime = performance.now();
        this.rafId = null;
    }

    start(onUpdate) {
        const track = (currentTime) => {
            const delta = currentTime - this.lastTime;

            if (delta > 0) {
                const fps = 1000 / delta;
                this.frames.push(fps);

                // Keep only recent samples
                if (this.frames.length > FPS_SAMPLE_SIZE) {
                    this.frames.shift();
                }

                // Calculate average FPS
                if (this.frames.length >= FPS_SAMPLE_SIZE) {
                    const avgFPS = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
                    onUpdate(avgFPS);
                }
            }

            this.lastTime = currentTime;
            this.rafId = requestAnimationFrame(track);
        };

        this.rafId = requestAnimationFrame(track);
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    reset() {
        this.frames = [];
    }
}

/**
 * Hook for automatic performance monitoring and degradation
 * Returns degradation flags based on device capabilities and runtime performance
 */
export function usePerformanceMonitor() {
    const [degradationFlags, setDegradationFlags] = useState({
        reduceStarCount: false,
        disableReflections: false,
        disableParallax: false,
        useStaticGeometry: false
    });

    const fpsTrackerRef = useRef(null);
    const capabilitiesRef = useRef(null);
    const checkIntervalRef = useRef(null);

    useEffect(() => {
        // Detect capabilities once
        capabilitiesRef.current = detectCapabilities();
        const { isMobile, isLowDPR, isReducedMotion } = capabilitiesRef.current;

        // Initial degradation based on capabilities
        const initialFlags = {
            reduceStarCount: isMobile || isLowDPR,
            disableReflections: isLowDPR,
            disableParallax: isMobile || isReducedMotion,
            useStaticGeometry: isMobile || isReducedMotion
        };

        setDegradationFlags(initialFlags);

        // Only track FPS on desktop (mobile already degraded)
        if (!isMobile && !isReducedMotion) {
            fpsTrackerRef.current = new FPSTracker();

            const handleFPSUpdate = (avgFPS) => {
                // Check FPS periodically, not on every frame
                if (!checkIntervalRef.current) {
                    checkIntervalRef.current = setTimeout(() => {
                        checkIntervalRef.current = null;

                        if (avgFPS < LOW_FPS_THRESHOLD) {
                            console.log(`Low FPS detected: ${avgFPS.toFixed(1)}. Enabling degradation.`);

                            setDegradationFlags(prev => ({
                                ...prev,
                                reduceStarCount: true,
                                disableReflections: true
                            }));
                        }
                    }, CHECK_INTERVAL);
                }
            };

            fpsTrackerRef.current.start(handleFPSUpdate);
        }

        return () => {
            if (fpsTrackerRef.current) {
                fpsTrackerRef.current.stop();
            }
            if (checkIntervalRef.current) {
                clearTimeout(checkIntervalRef.current);
            }
        };
    }, []);

    return {
        ...degradationFlags,
        capabilities: capabilitiesRef.current || detectCapabilities()
    };
}

/**
 * Get static capabilities without monitoring (for one-time checks)
 */
export function getDeviceCapabilities() {
    return detectCapabilities();
}
