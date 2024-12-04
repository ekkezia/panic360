
import React, { ForwardedRef, useCallback, useEffect, useState } from 'react';
import { TImage } from '../../types/types';
import '../../App.css';
import { STATUS } from '../../config/config';
import IconButton from '../atoms/icon-button';
import VerificationImages from '../atoms/verification-images';

type TVerificationContainer = { questions: string[], images: TImage, status: number, onValid: () => void }

const VerificationContainer = React.forwardRef<HTMLDivElement, TVerificationContainer>(
  ({ questions, images, status, onValid }, ref: ForwardedRef<HTMLDivElement>) => {
  const [currentCategory, setCurrentCategory] = useState(questions[Math.floor(Math.random() * questions.length)])
  const [shuffledImages, setShuffledImages] = useState<TImage>(Object.fromEntries(Object.entries(images).slice(0, 9)));

  // Shuffle image order
  const handleShuffle = useCallback(() => {
    const shuffled = Object.entries(images).sort(() => Math.random() - 0.5).slice(0, 9);
    
    const shuffledObject = Object.fromEntries(shuffled);

    setShuffledImages(shuffledObject);
    
    setCurrentCategory(questions[Math.floor(Math.random() * questions.length)]);

  }, [images, questions])

  // Skip verification (and submit answer) if there's no image that matches prompt
  const handleSkip = useCallback(() =>{
    const selectedImagesCategoryIsValid = Object.values(shuffledImages).every((img) => {
      if (img.category !== currentCategory && !img.selected) {
        return true
      } else {
        return false
      }
    });

    if (selectedImagesCategoryIsValid) {
      onValid();
    }
  }, [currentCategory, shuffledImages, onValid])

  // Image selection validation
  useEffect(() => {
    // check that there is at least 1 image that has the same category as the one being asked in QUESTION
  const checkQuestionValidity = Object.values(shuffledImages).some((img) => img.category === currentCategory);
    
    const selectedImagesCategoryIsValid = Object.values(shuffledImages).every((img) => {
      if (img.category === currentCategory) {
        return img.selected;
      } else {
        return !img.selected;
      }
    });

    if (checkQuestionValidity) {
    if (selectedImagesCategoryIsValid && checkQuestionValidity && status === STATUS.START) {
        onValid();
      }
    }

  }, [shuffledImages, currentCategory, status, onValid])

    // Select image
    const handleSelect = (id: string) => {
      setShuffledImages((prevSelectedImages) => ({
        ...prevSelectedImages,
        [id]: {
          ...prevSelectedImages[id],
          selected: !prevSelectedImages[id].selected, // toggle selected
        },
      }));
    };

    return (
      <div ref={ref} className="verificationContainer">
        <div className="title">
          <p>Select all squares with</p>
          <h4>{currentCategory}</h4>
          <p>If there are none, click skip</p>
        </div>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <VerificationImages 
            images={shuffledImages} 
            onSelect={handleSelect} 
          />
        </div>
        <div className="bottomBar">
          <div className="bottomBar-left">
            <IconButton id="restart" iconSrc="/icons/restart.svg"
            iconAlt="restart" onClick={handleShuffle}>
              Panicking much? Reshuffle the question & images
            </IconButton>

            <a href="https://youtube.com/@paniclibrary?si=a-cbZBL6XFi7e0xl" target="_blank" rel="noreferrer">
              <IconButton id="music" iconSrc="/icons/audio.svg"
              iconAlt="music">Music</IconButton>
            </a>

              <IconButton id="info" iconSrc="/icons/info.svg"
              iconAlt="info">
                Click on any of the image that corresponds with the given prompt. It could be more than 1. If you're correct, then the CAPTCHA will verify itself and reveal PANIC LIBRARY for you.
                <br /><br />
                You can click again at the selected images to unselect them.
                <br /><br />
                If there's none that matches, make sure that none of the images are clicked and then click SKIP.
              </IconButton>
          </div>

          <button id="btn-skip" onClick={handleSkip}>SKIP</button>
        </div>
      </div>
    );
  }
);

export default VerificationContainer;
