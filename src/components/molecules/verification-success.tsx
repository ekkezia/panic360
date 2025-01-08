
import React, { ForwardedRef } from 'react';
import '../../App.css';
import { STATUS } from '../../config/config';
import IconButton from '../atoms/icon-button';
import { useStatusContext } from '../../contexts/status-context';


const VerificationSuccess = React.forwardRef<HTMLDivElement>(
  ({  }, ref: ForwardedRef<HTMLDivElement>) => {
    const { setStatus } = useStatusContext()

    const handleClose = () => {
      setStatus(STATUS.HIDE)
    }

    return (
      <div ref={ref}>
        <div className="title">
          <p>PANIC360</p>
          <h4>Congratulations!</h4>
        </div>
        <div className="verificationText">
          The Panic Library studio will be revealed unto you. Please close this window for optimum viewing experience.
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
                Featuring <a href="https://instagram.com/bby.diwata" target="_blank">Baby Diwata @bby.diwata</a> from <a href="https://instagram.com/panic.library" target="_blank">PANIC LIBRARY @panic.library</a>
                <br /><br />
                PANIC LIBRARY is an ART/RAVE PROJECT BY DJ DUO Loveless & Baby Diwata
              </IconButton>
          </div>

          <button id="btn-skip" onClick={handleClose}>CLOSE</button>
        </div>
      </div>
    );
  }
);

export default VerificationSuccess;
