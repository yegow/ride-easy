import { IonButton, IonSpinner } from '@ionic/react'
import React, { useState } from 'react'

import Overlay from './Overlay'
import { cancelRide } from '../../../firebase'

const CancelRide: React.FC<any> = ({ ride, onClose }) => {
  const [loading, setLoading] = useState(false)
  
  const cancelActiveRide = async () => {
    setLoading(true)
    await cancelRide(ride.id)
    setLoading(false)
    onClose()
  };

  return(
    <Overlay>
      <article className="modal-container">
        <svg width="136" height="138" viewBox="0 0 136 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="68" cy="68.68" rx="68" ry="68.68" fill="#F41919" fillOpacity="0.85"/>
          <path d="M37 106C60.8203 82.9877 74.1793 83.6816 98 106" stroke="#FEEFEF" strokeWidth="10" strokeLinecap="round"/>
          <line x1="43.5" y1="43.5" x2="43.5" y2="54.5" stroke="#FEEFEF" strokeWidth="15" strokeLinecap="round"/>
          <line x1="7.5" y1="-7.5" x2="18.5" y2="-7.5" transform="matrix(4.37114e-08 1 1 -4.37114e-08 99 36)" stroke="#FEEFEF" strokeWidth="15" strokeLinecap="round"/>
        </svg>
        <h3>Not cool</h3>
        <div className="modal-btns">
          <IonButton color="danger" onClick={cancelActiveRide}
            disabled={loading}>
            { loading && <IonSpinner name="crescent" color="light" /> }
             Confirm
          </IonButton>
          <IonButton color="light" onClick={onClose}>Be Cool</IonButton>
        </div>
      </article>
    </Overlay>
  )
}

export default CancelRide