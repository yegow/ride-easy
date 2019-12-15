import { IonIcon } from '@ionic/react'
import { star, starOutline } from 'ionicons/icons'
import React from 'react'

const Star: React.FC<any> = ({ isActive }) => {
  return(
    <IonIcon icon={ isActive ? star : starOutline } />
  )
}

export default Star
