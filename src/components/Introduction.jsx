import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Introduction({ onComplete }) {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const loadingText = [
        "Initializing Core Systems...",
        "Loading 3D Environment...",
        "Calibrating Neura-Link...",
        "Establishing Connection..."
    ];

    useEffect(() => {
        // Progress bar simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 5; // Random increments
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => setStep(1), 500); // Wait a bit before showing "Enter"
        }
    }, [progress]);

    // Text changing effect
    useEffect(() => {
        if (step === 0 && progress < 100) {
            const textInterval = setInterval(() => {
                setStep(prev => (prev + 1) % loadingText.length);
            }, 800);
            return () => clearInterval(textInterval);
        }
    }, [step, progress]);


    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            <AnimatePresence mode="wait">
                {progress < 100 ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md px-8"
                    >
                        {/* Glitch Text Effect */}
                        <div className="mb-8 text-neon-cyan text-sm md:text-base h-6">
                            &gt; {loadingText[Math.floor(progress / 25) % loadingText.length]}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                            >_</motion.span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-gray-900 w-full overflow-hidden rounded relative">
                            <motion.div
                                className="h-full bg-neon-cyan shadow-[0_0_10px_2px_rgba(0,212,255,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>SYSTEM_BOOT</span>
                            <span>{Math.min(100, Math.floor(progress))}%</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="enter"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                        whileTap={{ scale: 0.95 }}
                        className="text-2xl md:text-4xl text-neon-cyan font-display font-bold tracking-widest uppercase border border-neon-cyan/30 px-12 py-4 rounded-sm hover:bg-neon-cyan/10 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 group relative overflow-hidden"
                        onClick={onComplete}
                    >
                        <span className="relative z-10">Initialize Experience</span>

                        {/* Scanning line effect */}
                        <motion.div
                            className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 blur-[2px]"
                            animate={{ left: ["0%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Background Grid - subtle */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
        </motion.div>
    );
}

export default Introduction;
