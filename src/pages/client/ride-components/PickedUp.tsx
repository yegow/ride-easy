import { IonButton, IonIcon } from '@ionic/react'
import { rocket } from 'ionicons/icons'
import React from 'react'
import { fullName } from '../../../util/fullName'

const PickedUp: React.FC<any> = ({ ride }) => {
  return(
    <article>
      <div className="ride-top">
        <div className="header">
          <img src="assets/avatar.jpg" alt="Rider" />
          <h3>{ fullName(ride.rider) }</h3>
        </div>
      </div>
      <div className="ride-bottom ride-bottom-picked-up">
        <div className="route-icon">
          <IonIcon icon={rocket} />
          <h4>Picked up</h4>
        </div>
        <div className="action-btn">
          <IonButton color="success"
            size="small"
            routerLink={'/client/checkout/' + ride.id}>
            I'm here
          </IonButton>
        </div>
      </div>
    </article>
  )
}

export default PickedUp