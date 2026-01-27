import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Position of the actual mouse
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Spring physics for the outer ring to give it that "lagging" smooth effect
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            setMousePos({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('pointer-events-auto');

            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-neon-blue rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 212, 255, 0)',
                    borderColor: isHovering ? '#ff0080' : '#00d4ff', // Changes to neon pink on hover
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
            />

            {/* Center dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"
                style={{
                    x: mousePos.x,
                    y: mousePos.y,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
}

export default CustomCursor;
