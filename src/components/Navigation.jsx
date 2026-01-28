import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';

function Navigation() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);

    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['home', 'about', 'projects', 'skills', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-effect-strong shadow-2xl border-b border-white/10' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="font-display font-bold text-xl sm:text-2xl gradient-text-blue-purple"
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {portfolioConfig.name.split(' ')[0]}
                    </motion.a>

                    {/* Navigation Links */}
                    <ul className="flex space-x-4 sm:space-x-8">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <motion.a
                                    href={`#${section.id}`}
                                    className={`relative text-sm md:text-base font-medium transition-all duration-300 ${activeSection === section.id
                                            ? 'text-neon-blue'
                                            : 'text-gray-400 hover:text-white'
                                        }`}
                                    whileHover={{ y: -2 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.getElementById(section.id);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {section.label}
                                    {activeSection === section.id && (
                                        <motion.div
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full"
                                            layoutId="activeSection"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            style={{
                                                boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
                                            }}
                                        />
                                    )}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navigation;
