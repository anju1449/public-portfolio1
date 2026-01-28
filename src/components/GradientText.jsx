import { motion } from 'framer-motion';

function GradientText({
    children,
    className = '',
    variant = 'default',
    animate = true
}) {
    const variants = {
        default: 'gradient-text',
        'blue-purple': 'gradient-text-blue-purple',
        'pink-purple': 'gradient-text-pink-purple',
    };

    const gradientClass = variants[variant] || variants.default;

    if (animate) {
        return (
            <motion.span
                className={`${gradientClass} ${className}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {children}
            </motion.span>
        );
    }

    return (
        <span className={`${gradientClass} ${className}`}>
            {children}
        </span>
    );
}

export default GradientText;
