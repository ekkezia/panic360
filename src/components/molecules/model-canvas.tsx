import { forwardRef, Suspense } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelLoader from '../atoms/model-loader';
import ModelEnv from '../atoms/model-env';
import IconButton from '../atoms/icon-button';
import { useStatusContext } from '../../contexts/status-context';
import { STATUS } from '../../config/config';

type ModelCanvasProps = Omit<CanvasProps, 'children'>;

const ModelCanvas = forwardRef<HTMLDivElement, ModelCanvasProps>((props, ref) => {
  const { setStatus } = useStatusContext()

  return (
    <div className="canvas hide" ref={ref}>
    <IconButton 
      className="iconBtn"
      id="info" 
      iconSrc="/icons/info.svg" 
      iconAlt="info"
      onClick={() => setStatus(STATUS.SUCCESS)}
    >
      What's up with this?! Panic!!
    </IconButton>

    <Canvas
      {...props}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
      className="fixed top-0 left-0 w-screen h-screen"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<ModelLoader />}>
          <ModelEnv rotation={[0, Math.PI / 2, 0]} texturePath={'/texture.jpg'} />
        </Suspense>
        <OrbitControls minDistance={1} maxDistance={4} />
      </Suspense>
    </Canvas>
    </div>
  );
});

export default ModelCanvas;
