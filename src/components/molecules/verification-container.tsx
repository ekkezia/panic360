
import React, { ForwardedRef } from 'react';
import { TImage } from '../../types/types';
import '../../App.css';

type TVerificationContainer = { images: TImage, currentCategory: string, onShuffle: () => void, onSelect: React.Dispatch<React.SetStateAction<TImage>>, onSkip: () => void }

const VerificationContainer = React.forwardRef<HTMLDivElement, TVerificationContainer>(
  ({ currentCategory, images, onShuffle, onSelect, onSkip }, ref: ForwardedRef<HTMLDivElement>) => {
    const handleClick = (id: string) => {
      onSelect((prevSelectedImages) => ({
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
          {Object.entries(images).map(([id, image]) => (
            <div
              key={id}
              className={`aspect-square w-8 h-8 hover:border-2 imgContainer ${image.selected ? 'selected' : ''}`}
              onClick={() => handleClick(id)}
            >
              <img src={image.src} className="aspect-square w-8 h-8" alt={image.alt} />
            </div>
          ))}
        </div>
        <div className="bottomBar">
          <div className="bottomBar-left">
            <div className="popup" id="restart" onClick={onShuffle}>↪️
              <span className="popuptext" id="myPopup">Panicking much? Reshuffle the question & images</span>
            </div>
            <div className="popup" id="music">🎧
              <a href="https://youtube.com/@paniclibrary?si=a-cbZBL6XFi7e0xl" target="_blank">
                <span className="popuptext" id="myPopup">Music</span>
              </a>
            </div>
            <div className="popup" id="info">ℹ️
              <span className="popuptext" id="myPopup">Click on any of the image that corresponds with the given prompt. It could be more than 1. If there's none that matches, make sure that none of the images are clicked and then click SKIP. </span>
            </div>
          </div>

          <button id="btn-skip" onClick={onSkip}>SKIP</button>
        </div>
      </div>
    );
  }
);

export default VerificationContainer;
