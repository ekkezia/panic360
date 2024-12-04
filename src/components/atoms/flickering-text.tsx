import { useEffect, useState } from 'react'

const FlickeringText: React.FC<{ textArray: string[] }> = ({ textArray }) => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % textArray.length);
    }, 100)

    return () => clearInterval(interval);
  }, []);

  return (
    <h1>
      {textArray[textIndex]}
    </h1>
  )
}

export default FlickeringText;