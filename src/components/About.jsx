import { motion } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';

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
                    className="text-4xl md:text-5xl font-bold mb-8 text-center text-glow text-neon-blue"
                    variants={itemVariants}
                >
                    {portfolioConfig.about.title}
                </motion.h2>

                <motion.div
                    className="glass-effect p-8 rounded-2xl"
                    variants={itemVariants}
                >
                    <p className="text-lg text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                        {portfolioConfig.about.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {portfolioConfig.about.highlights.map((highlight, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start space-x-3"
                                variants={itemVariants}
                            >
                                <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                                <p className="text-gray-300">{highlight}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
