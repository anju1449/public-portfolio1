import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import CameraController from './CameraController';
import { usePerformanceMonitor } from '../utils/performanceMonitor';

function Scene3D({ children }) {
    const canvasRef = useRef();

    useEffect(() => {
        const handleContextLost = (event) => {
            event.preventDefault();
            console.log('WebGL context lost. Attempting to restore...');
        };

        const handleContextRestored = () => {
            console.log('WebGL context restored successfully.');
        };


        const canvas = canvasRef.current?.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('webglcontextlost', handleContextLost);
            canvas.addEventListener('webglcontextrestored', handleContextRestored);

            return () => {
                canvas.removeEventListener('webglcontextlost', handleContextLost);
                canvas.removeEventListener('webglcontextrestored', handleContextRestored);
            };
        }
    }, []);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{
                    preserveDrawingBuffer: false,
                    antialias: false,
                    // powerPreference: 'high-performance' - removed to save battery/stability
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#000000', 1);

                    // Save real canvas element for context lost handling
                    canvasRef.current = gl.domElement;

                    // Aggressive cleanup on unmount
                    return () => {
                        const extension = gl.getExtension('WEBGL_lose_context');
                        if (extension) extension.loseContext();
                        gl.dispose();
                    };
                }}
            >
                <SceneContent>{children}</SceneContent>
            </Canvas>
        </div>
    );
}

// Separate component to use hooks inside Canvas
function SceneContent({ children }) {
    const { disableReflections } = usePerformanceMonitor();

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
            {!disableReflections && <Environment preset="city" />}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
            <CameraController />
            {children}
        </>
    );
}

export default Scene3D;

