import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePerformanceMonitor } from '../utils/performanceMonitor';


function ParallaxSection({ children, offset = 50, className = "" }) {
    const ref = useRef(null);
    const { disableParallax } = usePerformanceMonitor();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Check if mobile or reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        (isMobile || isReducedMotion || disableParallax) ? [0, 0] : [-offset, offset]
    );

    // Simple mobile check to disable effect
    // We can use the logic "isReducedMotion" or width check
    // But hooks order matters. 
    // Let's just render the motion div. If user is on mobile, the performance hit of a simple translate is usually low, 
    // but semantic "parallax" on touch screens can be jarring.

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

export default ParallaxSection;
