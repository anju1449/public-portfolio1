// Portfolio Configuration
// Edit this file to customize the portfolio content

export const portfolioConfig = {
    // Personal Information
    name: "Dravin Gupta ",
    role: "Full Stack Developer & Creative Coder",
    tagline: "Building immersive digital experiences",

    // About Section
    about: {
        title: "About Me",
        description: `I'm a passionate developer who loves creating beautiful and functional web experiences. 
    With expertise in modern web technologies, I specialize in bringing ideas to life through code. 
    My goal is to craft digital solutions that not only meet requirements but exceed expectations.`,
        highlights: [
            "5+ years of experience in web development",
            "Passionate about 3D web experiences",
            "Open source contributor",
            "Always learning new technologies"
        ]
    },

    // Projects
    projects: [
        {
            id: 1,
            title: "3D Portfolio Website",
            description: "An immersive 3D portfolio experience built with React Three Fiber and Framer Motion",
            tech: ["React", "Three.js", "Tailwind CSS", "Vite"],
            github: "https://github.com/yourusername/3d-portfolio",
            demo: "https://your-portfolio.vercel.app",
            featured: true
        },
        {
            id: 2,
            title: "E-Commerce Platform",
            description: "A modern e-commerce solution with real-time inventory management",
            tech: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
            github: "https://github.com/yourusername/ecommerce",
            demo: "https://your-store.vercel.app",
            featured: true
        },
        {
            id: 3,
            title: "AI Chat Application",
            description: "Real-time chat application with AI-powered responses",
            tech: ["React", "Node.js", "OpenAI API", "WebSockets"],
            github: "https://github.com/yourusername/ai-chat",
            demo: "https://your-chat.vercel.app",
            featured: false
        },
        {
            id: 4,
            title: "Task Management Tool",
            description: "Collaborative task management with drag-and-drop functionality",
            tech: ["Vue.js", "Firebase", "Tailwind CSS"],
            github: "https://github.com/yourusername/task-manager",
            demo: "https://your-tasks.vercel.app",
            featured: false
        }
    ],

    // Skills
    skills: {
        frontend: [
            "React", "Vue.js", "Next.js", "TypeScript",
            "Three.js", "Tailwind CSS", "Framer Motion"
        ],
        backend: [
            "Node.js", "Express", "MongoDB", "PostgreSQL",
            "REST APIs", "GraphQL"
        ],
        tools: [
            "Git", "Docker", "Webpack", "Vite",
            "Figma", "VS Code"
        ],
        other: [
            "WebGL", "GLSL", "3D Modeling", "Animation",
            "Responsive Design", "Performance Optimization"
        ]
    },

    // Social Links
    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        email: "your.email@example.com"
    },

    // Theme Colors (used for 3D effects and accents)
    theme: {
        primary: "#00d4ff",      // Neon blue
        secondary: "#b794f4",    // Neon purple
        accent: "#ff0080",       // Neon pink
        success: "#00ff9f",      // Neon green
        background: "#0a0a0a",   // Dark background
        text: "#ffffff"          // White text
    },


};

export default portfolioConfig;
