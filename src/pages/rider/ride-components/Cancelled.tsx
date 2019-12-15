import { IonBadge } from '@ionic/react'
import React from 'react'
import { fullName } from '../../../util/fullName'

const Cancelled: React.FC<any> = ({ ride }) => {
  return(
    <article>
      <div className="ride-top">
        <div className="header">
          <img src="assets/avatar.jpg" alt="Rider" />
          <h3>{ fullName(ride.client) }</h3>
        </div>
      </div>
      <div className="ride-bottom">
        <div className="far-away">
          
        </div>
        <div className="action-btn">
          <IonBadge color="danger">Cancelled</IonBadge>
        </div>
      </div>
    </article>
  )
}

export default Cancelled