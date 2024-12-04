import React from 'react';
import { TImage } from '../../types/types';

const VerificationImages: React.FC<{ images: TImage, onSelect: (id: string) => void }> = ({ images, onSelect }) => {
  return (
    <>
    {Object.entries(images).map(([id, image]) => (
      <div
              key={id}
              className={`aspect-square w-8 h-8 hover:border-2 imgContainer ${image.selected ? 'selected' : ''}`}
              onClick={() => onSelect(id)}
            >
              <img src={image.src} className="aspect-square w-8 h-8" alt={image.alt} />
      </div>
    ))}
    </>
  )
}

export default VerificationImages;