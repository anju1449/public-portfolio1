import { motion } from 'framer-motion';

function SciFiCard({ title, children, className = "", delay = 0 }) {
    return (
        <div className={`relative group ${className}`}>
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue rounded-br-sm" />

            {/* Main Content */}
            <div className="relative z-10 bg-blue-900/10 backdrop-blur-sm border border-neon-blue/20 p-8 clip-path-hud hover:bg-neon-blue/5 transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                <h3 className="text-neon-blue text-sm uppercase tracking-[0.3em] mb-4 font-bold flex items-center gap-3">
                    <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                    {title}
                </h3>
                <div className="text-gray-300 font-mono text-sm leading-relaxed">
                    {children}
                </div>
            </div>

            {/* Scanning Line Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
                <motion.div
                    className="w-full h-[2px] bg-neon-blue/30 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute' }}
                />
            </div>
        </div>
    );
}

export default SciFiCard;
