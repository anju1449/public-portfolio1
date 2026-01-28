import { motion } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';
import GradientText from './GradientText';

function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 relative">
            {/* Background gradient */}
            {/* Background gradient removed for global 3D visibility */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black pointer-events-none" /> */}

            <motion.div
                className="max-w-4xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-display font-bold mb-8 text-center"
                    variants={itemVariants}
                >
                    <GradientText variant="blue-purple" className="text-glow">
                        {portfolioConfig.about.title}
                    </GradientText>
                </motion.h2>

                <motion.div
                    className="glass-effect-strong p-8 md:p-10 rounded-2xl card-shine border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-500"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <p className="text-lg text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                        {portfolioConfig.about.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {portfolioConfig.about.highlights.map((highlight, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start space-x-3 group"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r from-neon-green to-neon-blue"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        boxShadow: [
                                            '0 0 5px rgba(0, 255, 159, 0.5)',
                                            '0 0 15px rgba(0, 255, 159, 0.8)',
                                            '0 0 5px rgba(0, 255, 159, 0.5)',
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                />
                                <p className="text-gray-300 group-hover:text-white transition-colors">{highlight}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
