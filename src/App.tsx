import ModelCanvas from './components/molecules/model-canvas';
import VerificationContainer from './components/molecules/verification-container';
import { IMAGES } from './config/paths';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TImage } from './types/types';
import FlickeringText from './components/atoms/flickering-text';

const QUESTIONS = ['aisha', 'panic library', 'loveless', 'kezia']

const STATUS = {
    IDLE: 1,
  START: 2,
  FINISH: 3,
}
function App() {
  const [currentCategory, setCurrentCategory] = useState(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)])
  const [shuffledImages, setShuffledImages] = useState<TImage>(Object.fromEntries(Object.entries(IMAGES).slice(0, 9)));
  const [status, setStatus] = useState(STATUS.IDLE);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const verificationRef = useRef<HTMLDivElement | null>(null);

  const handleShuffle = useCallback(() => {
    const shuffled = Object.entries(IMAGES).sort(() => Math.random() - 0.5).slice(0, 9);
    
    const shuffledObject = Object.fromEntries(shuffled);

    setShuffledImages(shuffledObject);
    
    setCurrentCategory(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);

  }, [])

  const handleSkip = useCallback(() =>{
    const selectedImagesCategoryIsValid = Object.values(shuffledImages).every((img) => {
      if (img.category !== currentCategory && !img.selected) {
        return true
      } else {
        return false
      }
    });

    if (selectedImagesCategoryIsValid) {
      setStatus(STATUS.FINISH);
    }
  }, [currentCategory, shuffledImages])

  // Image selection validation
  useEffect(() => {
    // check that there is at least 1 image that has the same category as the one being asked in QUESTION
    const checkQuestionValidity = Object.values(shuffledImages).some((img) => {
      if (img.category === currentCategory) return true; // question is NOT asking for valid category, thus user has to answer with SKIP
      else return false; // question is asking for valid category 
    })
    
    const selectedImagesCategoryIsValid = Object.values(shuffledImages).every((img) => {
      if (img.category === currentCategory) {
        return img.selected;
      } else {
        return !img.selected;
      }
    });

    console.log('selected', selectedImagesCategoryIsValid, checkQuestionValidity, shuffledImages)
      if (selectedImagesCategoryIsValid && checkQuestionValidity && status !== STATUS.IDLE) {
        console.log('here')
        setStatus(STATUS.FINISH);
      }

  }, [shuffledImages, currentCategory, status])


  // Show verification container on click
useEffect(() => {
  console.log('status', status)
  if (status === STATUS.FINISH) {
    if (curtainRef.current) {
      curtainRef.current.classList.add('hide');
    }
    if (canvasRef.current) {
      canvasRef.current.classList.add('show');
    }

    if (verificationRef.current) {
      verificationRef.current.classList.add('hide');
    }
  }

  const handleClickScreen = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      if (verificationRef.current && !verificationRef.current.contains(event.target as Node)) {
        verificationRef.current.style.visibility = "visible";
        verificationRef.current.style.top = `${y}px`;
        verificationRef.current.style.left = `${x}px`;
        console.log('Position:', x, y);
      }

      // Only set the status to START after moving the container
      setStatus(STATUS.START);
    }

  document.body.addEventListener('click', handleClickScreen);

  return () => {
    document.body.removeEventListener('click', handleClickScreen);
  };
}, [status]);

  return (
    <div className="w-screen h-screen App">
      <ModelCanvas ref={canvasRef} />

      <div className="curtain" ref={curtainRef}>
        <p></p>
        <FlickeringText /> 
        <p>built by @ekezia {status}</p>
      </div>

     <VerificationContainer images={shuffledImages} currentCategory={currentCategory} onShuffle={handleShuffle} onSelect={setShuffledImages} onSkip={handleSkip} ref={verificationRef} />
    </div>
  );
}

export default App;