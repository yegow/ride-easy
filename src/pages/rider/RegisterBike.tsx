import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSpinner } from '@ionic/react'
import React, { useState } from 'react'

import './RegisterBike.css'

import { registerBike } from '../../firebase'
import store from '../../store'
import { setError, addBike, setSuccess } from '../../store/actions'

const RegisterBike: React.FC<any> = ({ user, history }) => {
  const [bikeDetails, setBikeDetails] = useState({
    licensePlate: '',
    licenseNumber: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event: any) => {
    const target = event.target
    const { name, value } = target
    setBikeDetails({
      ...bikeDetails,
      ...{ [name]: value }
    })
  }

  const addNewBike = async () => {
    setLoading(true)
    try {
      const bike = await registerBike({
        ...bikeDetails,
        userId: user.uid,
      })
      setLoading(false)
      store.dispatch(addBike(bike))
      store.dispatch(setSuccess('Bike has been registered successfully'))
      history.push('/rider/profile')
    } catch (e) {
      setLoading(false)
      console.log('Register bike error', e)
      store.dispatch(setError(e.message))
    }
  }

  return(
    <IonPage>
      <IonContent className="ion-padding register-bike">
        <p>
          All we need is your license number 
          <span role="img" aria-label="paper-emoji">📃</span> and plate number
        </p>
        <section>
          <IonItem>
            <IonLabel position="floating">License number</IonLabel>
            <IonInput name="licenseNumber" type="text" required
              value={bikeDetails.licenseNumber}
              onIonChange={handleChange} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">License plate number</IonLabel>
            <IonInput name="licensePlate" type="text" required
              autoCapitalize="on"
              value={bikeDetails.licensePlate}
              onIonChange={handleChange} />
          </IonItem>
          <div className="btn-cont">
            <IonButton color="dark"
              disabled={loading}
              onClick={addNewBike}>
              { loading && <IonSpinner name="crescent" /> }
              Submit
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  )
}

export default RegisterBike