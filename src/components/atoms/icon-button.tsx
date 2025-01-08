import React from 'react'

const IconButton: React.FC<{ id: string; children: React.ReactNode; iconSrc: string; iconAlt: string; onClick?: () => void, className?: string }> = ({ id, children, iconSrc, iconAlt, onClick, className }) => {
  return (
    <div className={`popup ${className}`} id={id} onClick={onClick}>
      <img src={iconSrc} alt={iconAlt} className="icon" />

      <span className="popuptext" id="myPopup">{children}</span>
    </div>

  )
}

export default IconButton