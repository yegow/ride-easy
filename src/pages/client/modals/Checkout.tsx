import { IonButton } from '@ionic/react'
import React from 'react'

import Overlay from './Overlay'

const Checkout: React.FC<any> = ({ rideId }) => {
  return(
    <Overlay>
      <article className="modal-container">
        <svg width="136" height="138" viewBox="0 0 136 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="68" cy="68.68" rx="68" ry="68.68" fill="#0AB826" fillOpacity="0.72"/>
          <path d="M37 91C60.8203 114.012 74.1793 113.318 98 91" stroke="#FEEFEF" strokeWidth="10" strokeLinecap="round"/>
          <line x1="43.5" y1="43.5" x2="43.5" y2="54.5" stroke="#FEEFEF" strokeWidth="15" strokeLinecap="round"/>
          <line x1="7.5" y1="-7.5" x2="18.5" y2="-7.5" transform="matrix(4.37114e-08 1 1 -4.37114e-08 99 36)" stroke="#FEEFEF" strokeWidth="15" strokeLinecap="round"/>
        </svg>
        <h3>Awesome</h3>
        <p>Leave John a review</p>
        <div className="modal-btns">
          <IonButton color="dark" routerLink={'/client/review' + rideId}>Review</IonButton>
          <IonButton color="light" routerLink="/client/history">Skip</IonButton>
        </div>
      </article>
    </Overlay>
  )
}

export default Checkout