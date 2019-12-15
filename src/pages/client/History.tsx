import {
  IonContent, IonPage,
} from '@ionic/react'
import React from 'react'

import RideList from './RideList'

const History: React.FC<any> = ({ rides }) => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <RideList rides={rides} />
      </IonContent>
    </IonPage>
  )
}

export default History