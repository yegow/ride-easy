import {
  IonContent, IonPage,
} from '@ionic/react'
import React from 'react'

import RiderList from './RiderList'

const Riders: React.FC<any> = ({ riders, user }) => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <RiderList riders={riders} user={user} />
      </IonContent>
    </IonPage>
  )
}

export default Riders
