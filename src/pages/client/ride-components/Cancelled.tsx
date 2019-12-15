import { IonIcon } from '@ionic/react'
import { close } from 'ionicons/icons'
import React from 'react'
import { fullName } from '../../../util/fullName'

const Cancelled: React.FC<any> = ({ ride }) => {
  return(
    <article>
      <div className="ride-top">
        <div className="header">
          <img src="assets/avatar.jpg" alt="Rider" />
          <h3>{ fullName(ride.rider) }</h3>
        </div>
      </div>
      <div className="ride-bottom ride-bottom-cancelled">
        <div>
          <IonIcon icon={close}></IonIcon>
          <h4>Cancelled</h4>
        </div>
      </div>
    </article>
  )
}

export default Cancelled