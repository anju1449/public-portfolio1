import { motion } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';
import TiltCard from './TiltCard';
import { useSectionActivation, GEOMETRY_SNAP_CLASS } from '../utils/activationEvents';

function SkillCategory({ title, skills, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <TiltCard className="glass-effect p-6 rounded-xl h-full">
                <h3 className={`text-2xl font-bold mb-4 text-${color}`}>
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <motion.span
                            key={index}
                            className={`px-4 py-2 bg-${color}/10 text-${color} border border-${color}/30 rounded-full text-sm hover:bg-${color}/20 transition-all cursor-default`}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
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
                    className="text-4xl md:text-5xl font-bold mb-12 text-center text-glow text-neon-green"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Skills & Technologies
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
