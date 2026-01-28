import { motion } from 'framer-motion';

function SciFiCard({ title, children, className = "", delay = 0 }) {
    return (
        <motion.div
            className={`relative group card-shine ${className}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
        >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

            {/* HUD Corners with glow */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue rounded-tl-sm group-hover:shadow-neon-blue transition-all duration-300" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-blue rounded-tr-sm group-hover:shadow-neon-blue transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-blue rounded-bl-sm group-hover:shadow-neon-blue transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-blue rounded-br-sm group-hover:shadow-neon-blue transition-all duration-300" />

            {/* Main Content */}
            <div className="relative z-10 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black backdrop-blur-md border border-neon-blue/30 p-8 clip-path-hud hover:bg-neon-blue/5 transition-all duration-500 shadow-[0_0_30px_rgba(0,212,255,0.15)] group-hover:shadow-[0_0_50px_rgba(0,212,255,0.3)]">
                <h3 className="text-neon-blue text-sm uppercase tracking-[0.3em] mb-4 font-bold flex items-center gap-3">
                    <motion.span
                        className="w-2 h-2 bg-neon-blue rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {title}
                </h3>
                <div className="text-gray-300 font-mono text-sm leading-relaxed">
                    {children}
                </div>
            </div>

            {/* Holographic shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
            </div>

            {/* Enhanced scanning line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
                <motion.div
                    className="w-full h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-[0_0_15px_rgba(0,212,255,0.7)]"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute' }}
                />
            </div>
        </motion.div>
    );
}

export default SciFiCard;
