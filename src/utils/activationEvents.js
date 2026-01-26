import { useState, useEffect, useRef } from 'react';

// Track which sections have been activated globally
const activatedSections = new Set();

/**
 * Hook for one-shot section activation effects
 * Returns isActivating (true for 1 second on first entry)
 * 
 * @param {string} sectionId - Unique identifier for the section
 * @param {number} duration - Duration of activation effect in ms (default 1000)
 * @param {number} threshold - Intersection threshold (default 0.3)
 */
export function useSectionActivation(sectionId, duration = 1000, threshold = 0.3) {
    const [isActivating, setIsActivating] = useState(false);
    const elementRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Skip if already activated
        if (activatedSections.has(sectionId)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !activatedSections.has(sectionId)) {
                        // Mark as activated
                        activatedSections.add(sectionId);

                        // Trigger activation
                        setIsActivating(true);

                        // Reset after duration
                        timeoutRef.current = setTimeout(() => {
                            setIsActivating(false);
                        }, duration);
                    }
                });
            },
            {
                threshold,
                rootMargin: '0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [sectionId, duration, threshold]);

    return { isActivating, elementRef };
}

/**
 * CSS class for neon pulse effect
 * Apply to element when isActivating is true
 */
export const NEON_PULSE_CLASS = 'activation-neon-pulse';

/**
 * CSS class for scanline flash effect
 */
export const SCANLINE_FLASH_CLASS = 'activation-scanline-flash';

/**
 * CSS class for geometry snap effect
 */
export const GEOMETRY_SNAP_CLASS = 'activation-geometry-snap';

/**
 * CSS class for glow effect
 */
export const GLOW_CLASS = 'activation-glow';

/**
 * Reset activation tracking (useful for development/testing)
 */
export function resetActivations() {
    activatedSections.clear();
}
