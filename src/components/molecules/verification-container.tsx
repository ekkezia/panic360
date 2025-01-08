
import React, { ForwardedRef, useCallback, useEffect, useState } from 'react';
import { TImage } from '../../types/types';
import '../../App.css';
import { QUESTIONS, STATUS } from '../../config/config';
import VerificationInstruction from './verification-instruction';
import { useStatusContext } from '../../contexts/status-context';
import VerificationStart from './verification-start';
import { IMAGES } from '../../config/paths';
import VerificationSuccess from './verification-success';


const VerificationContainer = React.forwardRef<HTMLDivElement>(
  ({ }, ref: ForwardedRef<HTMLDivElement>) => {
  const { status } = useStatusContext()

  if (status === STATUS.HIDE || status === STATUS.INITIALIZE) {
    return <></>
  }
    return (
      <div ref={ref} className="verificationContainer">
        {status === STATUS.INSTRUCTION && <VerificationInstruction />}
        {status === STATUS.START && <VerificationStart images={IMAGES} questions={QUESTIONS} />}
        {status === STATUS.SUCCESS && <VerificationSuccess />}
      </div>
    );

  }
);

export default VerificationContainer;
