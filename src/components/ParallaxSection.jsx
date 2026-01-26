import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


function ParallaxSection({ children, offset = 50, className = "" }) {
    const ref = useRef(null);
    // Disable on mobile to prevent performance issues and layout jumps
    // We can use a simple media query check or hook. 
    // Since we don't have react-responsive installed by default in the list (I checked package.json earlier, it wasn't there),
    // I will use window.matchMedia inside a useEffect or just let CSS handles/simple check.
    // Ideally, we shouldn't introduce new dependencies if not needed.
    // Framer motion is already there.

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Check if mobile (simple width check) or reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        (isMobile || isReducedMotion) ? [0, 0] : [-offset, offset]
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
