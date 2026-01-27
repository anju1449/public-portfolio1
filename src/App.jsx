import { Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function LoadingFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: '#00d4ff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="animate-spin" style={{
          width: '64px',
          height: '64px',
          border: '4px solid #00d4ff',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          margin: '0 auto 16px'
        }} />
        <p style={{ fontSize: '1.25rem' }}>Loading Experience...</p>
      </div>
    </div>
  );
}

function WebGLFallback() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-neon-pink">WebGL Not Supported</h1>
        <p className="text-gray-300 mb-6">
          Your browser doesn't support WebGL or it's disabled.
          Please enable WebGL or use a modern browser to experience the full 3D portfolio.
        </p>
        <p className="text-sm text-gray-400">
          Supported browsers: Chrome, Firefox, Safari, Edge
        </p>
      </div>
    </div>
  );
}

function App() {
  // Check for WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    return <WebGLFallback />;
  }

  return (
    <div className="app bg-black min-h-screen">
      <CustomCursor />
      <Navigation />

      <Suspense fallback={<LoadingFallback />}>
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </Suspense>

      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with React, Three.js, and Tailwind CSS
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} - Open Source Portfolio Template
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
