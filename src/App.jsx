import { Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neon-blue text-xl">Loading Experience...</p>
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

// Check for WebGL support once
const isWebGLSupported = (() => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      // Clean up the context immediately
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
})();

function App() {
  if (!isWebGLSupported) {
    return <WebGLFallback />;
  }

  return (
    <div className="app">
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
