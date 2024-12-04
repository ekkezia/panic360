import ModelCanvas from './components/molecules/model-canvas';
import VerificationContainer from './components/molecules/verification-container';
import { IMAGES } from './config/paths';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import FlickeringText from './components/atoms/flickering-text';
import { QUESTIONS, STATUS, TEXT } from './config/config';

function App() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [verified, setVerified] = useState(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const verificationRef = useRef<HTMLDivElement | null>(null);

  // Show verification container on click
  useEffect(() => {
    const handleClickScreen = (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;

        if (verificationRef.current && !verificationRef.current.contains(event.target as Node)) {
          verificationRef.current.style.visibility = "visible";
          verificationRef.current.style.top = `${y}px`;
          verificationRef.current.style.left = `${x}px`;
        }

        // Only set the status to START after moving the container
        setStatus(STATUS.START);
      }

    document.body.addEventListener('click', handleClickScreen);

    return () => {
      document.body.removeEventListener('click', handleClickScreen);
    };
  }, [status]);

  useEffect(() => {
    if (verified) {
      if (curtainRef.current && canvasRef.current) {
        curtainRef.current.classList.add('hide');
      }
      if (canvasRef.current) {
        canvasRef.current.classList.remove('hide');
      }

      if (verificationRef.current) {
        verificationRef.current.classList.add('hide');
      }
    }
  }, [verified])

  const handleValid = () => {
    setStatus(STATUS.FINISH);
    setVerified(true);
  }

  return (
    <div className="App">
      <ModelCanvas ref={canvasRef} />

      <div className="curtain" ref={curtainRef}>
        <p></p>
        <FlickeringText textArray={TEXT} /> 
        <p>built by @ekezia</p>
      </div>

     {!verified && 
        <VerificationContainer 
          questions={QUESTIONS} 
          images={IMAGES} 
          status={status} 
          onValid={handleValid} 
          ref={verificationRef} 
        />
      }
    </div>
  );
}

export default App;
