import { IonButton, IonIcon } from '@ionic/react'
import { pin } from 'ionicons/icons'
import React, { useState, useEffect } from 'react'

import { getLocation } from '../../../util/getLocation'
import { acceptRideRequest, cancelRide } from '../../../firebase'
import store from '../../../store'
import { setError, setSuccess } from '../../../store/actions'
import { fullName } from '../../../util/fullName'

const Pending: React.FC<any> = ({ ride, user, acceptAction, cancelAction }) => {
  const [clientLocation, setClientLocation] = useState({
    latitude: null,
    longitude: null,
    addressName: '',
  })

  const getClientLocation = async () => {
    const { addressName } = clientLocation
    const { client: { currentLocation } } = ride
    if (addressName) {
      return addressName
    }
    try {
      const { display_name } = await getLocation(
        currentLocation.latitude,
        currentLocation.longitude
      )
      const address = display_name.split(',')[0]
      setClientLocation({
        ...clientLocation,
        addressName: address,
      })
    } catch (e) {
      console.log('LocationIQ error', e)
    }
  }

  useEffect(() => {
    getClientLocation()
  })

  const acceptRequest = async () => {
    try {
      await acceptRideRequest(ride.id)
      store.dispatch(setSuccess('Go pick up your client'))
    } catch (e) {
      console.log('Accept ride request err', e)
      store.dispatch(setError(e.message))
    }
  }

  const cancelRequest = async () => {
    try {
      await cancelRide(ride.id)
    } catch (e) {
      console.log('Cancel ride request err', e)
      store.dispatch(setError(e.message))
    }
  }

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
          <IonIcon icon={pin} />
          <h4>Now in { clientLocation.addressName }</h4>
        </div>
        <div className="action-btns">
          <IonButton color="danger"
            size="small"
            onClick={cancelRequest}>Cancel</IonButton>
          <IonButton color="dark"
            size="small"
            onClick={acceptRequest}>Accept</IonButton>
        </div>
      </div>
    </article>
  )
}

export default Pending
