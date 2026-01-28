import { motion } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';
import TiltCard from './TiltCard';
import GradientText from './GradientText';
import { useSectionActivation, GEOMETRY_SNAP_CLASS } from '../utils/activationEvents';

function SkillCategory({ title, skills, color }) {
    const colorMap = {
        'neon-blue': { from: 'from-neon-blue/10', to: 'to-neon-blue/5', text: 'text-neon-blue', border: 'border-neon-blue/30' },
        'neon-purple': { from: 'from-neon-purple/10', to: 'to-neon-purple/5', text: 'text-neon-purple', border: 'border-neon-purple/30' },
        'neon-pink': { from: 'from-neon-pink/10', to: 'to-neon-pink/5', text: 'text-neon-pink', border: 'border-neon-pink/30' },
        'neon-green': { from: 'from-neon-green/10', to: 'to-neon-green/5', text: 'text-neon-green', border: 'border-neon-green/30' },
    };

    const colors = colorMap[color] || colorMap['neon-blue'];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <TiltCard className={`glass-effect-strong p-6 rounded-xl h-full border ${colors.border} hover:border-opacity-60 transition-all duration-500 card-shine`}>
                <h3 className={`text-2xl font-display font-bold mb-4 ${colors.text}`}>
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <motion.span
                            key={index}
                            className={`px-4 py-2 bg-gradient-to-r ${colors.from} ${colors.to} ${colors.text} border ${colors.border} rounded-full text-sm hover:scale-105 transition-all cursor-default`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{
                                y: -3,
                                boxShadow: `0 5px 15px ${color === 'neon-blue' ? 'rgba(0, 212, 255, 0.3)' :
                                    color === 'neon-purple' ? 'rgba(183, 148, 244, 0.3)' :
                                        color === 'neon-pink' ? 'rgba(255, 0, 128, 0.3)' :
                                            'rgba(0, 255, 159, 0.3)'}`
                            }}
                            style={{ transform: "translateZ(30px)" }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </TiltCard>
        </motion.div>
    );
}

function Skills() {
    const { isActivating, elementRef } = useSectionActivation('skills');

    return (
        <section
            ref={elementRef}
            id="skills"
            className={`min-h-screen py-20 px-4 relative ${isActivating ? GEOMETRY_SNAP_CLASS : ''}`}
        >
            {/* Background gradient removed for global 3D visibility */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/10 to-black pointer-events-none" /> */}

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <GradientText className="text-glow">
                        Skills & Technologies
                    </GradientText>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkillCategory
                        title="Frontend"
                        skills={portfolioConfig.skills.frontend}
                        color="neon-blue"
                    />
                    <SkillCategory
                        title="Backend"
                        skills={portfolioConfig.skills.backend}
                        color="neon-purple"
                    />
                    <SkillCategory
                        title="Tools & Workflow"
                        skills={portfolioConfig.skills.tools}
                        color="neon-pink"
                    />
                    <SkillCategory
                        title="Other"
                        skills={portfolioConfig.skills.other}
                        color="neon-green"
                    />
                </div>
            </div>
        </section>
    );
}

export default Skills;
