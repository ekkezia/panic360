
import React, { ForwardedRef } from 'react';
import '../../App.css';
import { STATUS } from '../../config/config';
import IconButton from '../atoms/icon-button';
import { useStatusContext } from '../../contexts/status-context';

// type TVerificationContainer = { onBegin: () => void }

const VerificationInstruction = React.forwardRef<HTMLDivElement>(
  ({  }, ref: ForwardedRef<HTMLDivElement>) => {
    const { setStatus } = useStatusContext()

    const handleBegin = (event: React.MouseEvent) => {
      event.stopPropagation();
      setStatus(STATUS.START)
    }

    return (
      <div ref={ref}>
        <div className="title">
          <p>PANIC360</p>
          <h4>Before We Begin</h4>
        </div>
        <div className="verificationText">
              Click on any of the image that corresponds with the given prompt. It could be more than 1. If you're correct, then the CAPTCHA will verify itself and reveal PANIC LIBRARY for you.
              <br /><br />
              You can click again at the selected images to unselect them.
              <br /><br />
              If there's none that matches, make sure that none of the images are clicked and then click SKIP.
        </div>
        <div className="bottomBar">
          <div className="bottomBar-left">
            <a href="https://youtube.com/@paniclibrary?si=a-cbZBL6XFi7e0xl" target="_blank" rel="noreferrer">
              <IconButton id="music" iconSrc="/icons/audio.svg"
              iconAlt="music">Music</IconButton>
            </a>

              <IconButton id="info" iconSrc="/icons/info.svg"
              iconAlt="info">
                Photographer & Web Developer: <a href="https://instagram.com/ekezia" target="_blank">Elizabeth Kezia @ekezia</a>
                <br /><br />
                Featuring <a href="https://instagram.com/bby.diwata" target="_blank">Baby Diwata</a> from <a href="https://instagram.com/panic.library" target="_blank">PANIC LIBRARY</a>
                <br /><br />
                PANIC LIBRARY is an ART/RAVE PROJECT BY DJ DUO Loveless & Baby Diwata
              </IconButton>
          </div>

          <button id="btn-skip" onClick={handleBegin}>BEGIN</button>
        </div>
      </div>
    );
  }
);

export default VerificationInstruction;
