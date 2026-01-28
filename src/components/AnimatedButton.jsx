import { motion } from 'framer-motion';
import { useState } from 'react';

function AnimatedButton({
    children,
    onClick,
    href,
    variant = 'primary',
    icon,
    className = '',
    disabled = false,
    loading = false,
}) {
    const [ripples, setRipples] = useState([]);

    const variants = {
        primary: 'bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue-light hover:to-neon-purple-light',
        secondary: 'bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink-light hover:to-neon-purple-light',
        outline: 'border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10',
        ghost: 'text-neon-blue hover:bg-neon-blue/10',
    };

    const handleClick = (e) => {
        // Create ripple effect
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            x,
            y,
            id: Date.now(),
        };

        setRipples([...ripples, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        if (onClick) onClick(e);
    };

    const buttonClasses = `
        relative overflow-hidden
        px-6 py-3 rounded-lg
        font-semibold text-white
        transition-all duration-300
        transform hover:scale-105 hover:shadow-neon-blue
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variants[variant]}
        ${className}
    `;

    const content = (
        <>
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ping"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 10,
                        height: 10,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
            <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : icon}
                {children}
            </span>
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={buttonClasses}
                onClick={handleClick}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            {content}
        </motion.button>
    );
}

export default AnimatedButton;
