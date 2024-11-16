import { useEffect, useState } from 'react'

const TEXT = ['PANIC360', 'CLICK ANYWHERE']
const FlickeringText = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % 2);
    }, 100)

    return () => clearInterval(interval);
  }, []);

  return (
    <h1>
      {TEXT[textIndex]}
    </h1>
  )
}

export default FlickeringText;