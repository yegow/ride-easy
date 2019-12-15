import React, { useEffect } from 'react'

import './Overlay.css'

const Overlay: React.FC<any> = ({ onClose, children }) => {
  const closeModal = () => {
    const timer = setTimeout(() => onClose(), 5000)
    return () => clearTimeout(timer)
  }
  useEffect(closeModal)

  return (
    <section className="overlay">
      { children }
    </section>
  )
}

export default Overlay
