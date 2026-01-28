import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

function ImmersiveCursor() {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for trailing effect
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            // Check if element is interactive (button, link, input)
            if (e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.classList.contains('interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Cursor Dot */}
            <motion.div
                className="absolute w-3 h-3 bg-neon-cyan rounded-full mix-blend-screen"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />

            {/* Glowing Trailer */}
            <motion.div
                className="absolute w-8 h-8 border border-neon-cyan/50 rounded-full mix-blend-screen"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    borderColor: isHovering
                        ? 'rgba(0, 212, 255, 0.8)' // Neon cyan
                        : 'rgba(0, 212, 255, 0.3)',
                    backgroundColor: isHovering
                        ? 'rgba(0, 212, 255, 0.1)'
                        : 'transparent'
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer Glow */}
            <motion.div
                className="absolute w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </div>
    );
}

export default ImmersiveCursor;
