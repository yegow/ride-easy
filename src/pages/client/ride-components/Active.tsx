import { IonButton, IonIcon, IonModal } from '@ionic/react'
import { navigate } from 'ionicons/icons'
import React, { useState } from 'react'

import CancelRideModal from '../modals/CancelRide'
import { fullName } from '../../../util/fullName'

const Active: React.FC<any> = ({ ride }) => {
  const [showModal, setShowModal] = useState(false)

  return(
    <article>
      <div className="ride-top">
        <div className="header">
          <img src="assets/avatar.jpg" alt="Rider" />
          <h3>{ fullName(ride.rider) }</h3>
        </div>
      </div>
      <div className="ride-bottom ride-bottom-on-route">
        <div className="route-icon">
          <IonIcon icon={navigate} />
          <h4>On route</h4>
        </div>
        <div className="action-btn">
          <IonButton color="danger"
            size="small"
            onClick={() => setShowModal(true)}>Cancel</IonButton>
        </div>
      </div>
      {
        showModal &&
          <IonModal isOpen={showModal}>
            <CancelRideModal ride={ride} onClose={() => setShowModal(false)} />
          </IonModal>
      }
    </article>
  )
}

export default Active
