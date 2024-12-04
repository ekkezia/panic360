import React from 'react'

const IconButton: React.FC<{ id: string; children: React.ReactNode; iconSrc: string; iconAlt: string; onClick?: () => void }> = ({ id, children, iconSrc, iconAlt, onClick }) => {
  return (
    <div className="popup" id={id} onClick={onClick}>
      <img src={iconSrc} alt={iconAlt} className="icon" />

      <span className="popuptext" id="myPopup">{children}</span>
    </div>

  )
}

export default IconButton