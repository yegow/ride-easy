import { IonButton, IonIcon, IonSpinner } from '@ionic/react'
import { pin } from 'ionicons/icons'
import React, { useState, useEffect, useCallback } from 'react'
import { Geolocation, Geoposition } from '@ionic-native/geolocation'

import { getLocation } from '../../../util/getLocation'
import { pickUpClient } from '../../../firebase'
import store from '../../../store'
import { setError, setSuccess } from '../../../store/actions'
import { fullName } from '../../../util/fullName'

const ToPickup: React.FC<any> = ({ ride, user }) => {
  const [clientLocation, setClientLocation] = useState({
    latitude: null,
    longitude: null,
    addressName: '',
  })
  const [loading, setLoading] = useState(false)

  const getClientLocation = useCallback(async () => {
    const { addressName } = clientLocation
    const { client: { currentLocation } } = ride
    if (addressName) {
      return addressName
    }
    const { display_name } = await getLocation(
      currentLocation.latitude,
      currentLocation.longitude
    )
    const address = display_name.split(',')[0]
    setClientLocation({
      ...clientLocation,
      addressName: address,
    })
  }, [clientLocation, ride])

  useEffect(() => {
    getClientLocation()
  }, [getClientLocation])

  const pickUp = async () => {
    setLoading(true)
    let data: Geoposition
    try {
      data = await Geolocation.getCurrentPosition()
    } catch (e) {
      setLoading(false)
      console.log('Position err', e)
      return store.dispatch(setError('There was an error obtaining your location.'))
    }
    try {
      await pickUpClient(ride.id, {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      })
      setLoading(false)
      store.dispatch(setSuccess('Record updated successfully.'))
    } catch (e) {
      setLoading(false)
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
          <IonButton color="dark" disabled={loading} onClick={pickUp}
            size="small">
            
            { loading && <IonSpinner name="crescent" color="light" /> }
            Pick Up
          </IonButton>
        </div>
      </div>
    </article>
  )
}

export default ToPickup
