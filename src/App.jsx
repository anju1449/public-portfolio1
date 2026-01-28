import { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import ImmersiveCursor from './components/ImmersiveCursor';

// Lazy load non-critical sections
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

import Scene3D from './components/Scene3D';
import GlobalGeometry from './components/GlobalGeometry';
import StarField from './components/StarField';
import ParallaxSection from './components/ParallaxSection';
import FloatingText from './components/FloatingText';
import { portfolioConfig } from './config/portfolioConfig';

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
  const [showIntro, setShowIntro] = useState(true);

  if (!isWebGLSupported) {
    return <WebGLFallback />;
  }

  return (
    <>
      <ImmersiveCursor />

      <AnimatePresence>
        {showIntro && (
          <Introduction onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="app relative text-gray-100 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          {/* Global 3D Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Scene3D>
              <StarField />
              <GlobalGeometry />
              <FloatingText text={portfolioConfig.name} position={[0, 0.5, 0]} />
            </Scene3D>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Navigation />

            <Suspense fallback={<LoadingFallback />}>
              <main>
                <Hero />

                <ParallaxSection offset={30}>
                  <About />
                </ParallaxSection>

                <ParallaxSection offset={-30}>
                  <Projects />
                </ParallaxSection>

                <ParallaxSection offset={50}>
                  <Skills />
                </ParallaxSection>

                <ParallaxSection offset={30}>
                  <Contact />
                </ParallaxSection>
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
        </div>
      )}
    </>
  );
}

export default App;
