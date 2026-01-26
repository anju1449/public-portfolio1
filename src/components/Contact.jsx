import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { portfolioConfig } from '../config/portfolioConfig';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error');
            setLoading(false);
            return;
        }

        try {
            // If EmailJS is configured
            if (portfolioConfig.emailJS.serviceId !== 'YOUR_SERVICE_ID') {
                await emailjs.send(
                    portfolioConfig.emailJS.serviceId,
                    portfolioConfig.emailJS.templateId,
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        message: formData.message,
                    },
                    portfolioConfig.emailJS.publicKey
                );
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                // Fallback to mailto
                window.location.href = `mailto:${portfolioConfig.social.email}?subject=Message from ${formData.name}&body=${formData.message}`;
                setStatus('success');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }

        setLoading(false);
    };

    return (
        <section id="contact" className="min-h-screen py-20 px-4 relative">
            {/* Background gradient removed for global 3D visibility */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/10 to-black pointer-events-none" /> */}

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center text-glow text-neon-pink"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        className="glass-effect p-8 rounded-xl"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/50 border border-neon-blue/30 rounded-lg focus:outline-none focus:border-neon-blue transition-colors text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/50 border border-neon-blue/30 rounded-lg focus:outline-none focus:border-neon-blue transition-colors text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 bg-black/50 border border-neon-blue/30 rounded-lg focus:outline-none focus:border-neon-blue transition-colors text-white resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <p className="text-neon-green text-center">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-neon-pink text-center">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="glass-effect p-8 rounded-xl flex flex-col justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-white">Connect With Me</h3>

                        <div className="space-y-4">
                            <a
                                href={portfolioConfig.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg hover:bg-neon-blue/10 hover:border-neon-blue border border-transparent transition-all group"
                            >
                                <svg className="w-6 h-6 text-neon-blue group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="text-white">GitHub</span>
                            </a>

                            <a
                                href={portfolioConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg hover:bg-neon-purple/10 hover:border-neon-purple border border-transparent transition-all group"
                            >
                                <svg className="w-6 h-6 text-neon-purple group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="text-white">LinkedIn</span>
                            </a>

                            <a
                                href={portfolioConfig.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg hover:bg-neon-green/10 hover:border-neon-green border border-transparent transition-all group"
                            >
                                <svg className="w-6 h-6 text-neon-green group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                <span className="text-white">Twitter</span>
                            </a>

                            <a
                                href={`mailto:${portfolioConfig.social.email}`}
                                className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg hover:bg-neon-pink/10 hover:border-neon-pink border border-transparent transition-all group"
                            >
                                <svg className="w-6 h-6 text-neon-pink group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-white">Email</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
