import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';
import SciFiCard from './SciFiCard';
import { useSectionActivation, NEON_PULSE_CLASS } from '../utils/activationEvents';

function Hero() {
    const { scrollY } = useScroll();
    const { isActivating, elementRef } = useSectionActivation('hero');

    // Animation: "Holographic Materialization"
    // Cards start deep in space, tilted back, and fly forward while straightening up
    const rotateX = useTransform(scrollY, [0, 400], [60, 0]); // Starts tilted 60deg back
    const z = useTransform(scrollY, [0, 400], [-1000, 0]); // Starts far away
    const opacity = useTransform(scrollY, [0, 300], [0, 1]); // Fades in
    const scale = useTransform(scrollY, [0, 400], [0.5, 1]); // Grows

    return (
        <section
            ref={elementRef}
            id="home"
            className="relative min-h-screen flex flex-col justify-end items-center pb-32 overflow-hidden perspective-1000"
        >
            {/* 3D Background - Moved to Global App.jsx */}
            <div className="absolute inset-0 z-0">
                {/* 3D Scene is now global */}
            </div>

            {/* Scroll-Triggered Sci-Fi Cards */}
            <motion.div
                className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-5xl mx-auto w-full ${isActivating ? NEON_PULSE_CLASS : ''}`}
                style={{
                    rotateX,
                    z,
                    opacity,
                    scale,
                    transformStyle: 'preserve-3d',
                }}
            >
                <SciFiCard title="Identity" delay={0}>
                    <p className="text-lg font-bold text-white mb-2">{portfolioConfig.role}</p>
                    <p className="text-xs text-neon-blue">class: CREATIVE_DEV</p>
                </SciFiCard>

                <SciFiCard title="Mission" delay={0.2}>
                    <p className="text-lg font-bold text-white mb-2">Immersive Experiences</p>
                    <p className="text-xs text-neon-purple">status: ONLINE</p>
                </SciFiCard>
            </motion.div>

            {/* Scroll Indicator - Fades out as cards appear */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
                    <motion.div
                        className="w-1 h-2 bg-neon-blue rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;
