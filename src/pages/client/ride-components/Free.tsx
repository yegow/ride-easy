import { IonButton, IonIcon } from '@ionic/react'
import { pin } from 'ionicons/icons'
import React, { useState, useEffect, useCallback } from 'react'

import Ratings from './Ratings'
import { getLocation } from '../../../util/getLocation'
import { fullName } from '../../../util/fullName'

const Free: React.FC<any> = ({ rider, callAction }) => {
  const [riderLocation, setRiderLocation] = useState({
    latitude: null,
    longitude: null,
    addressName: '',
  })

  const getRiderLocation = useCallback(async () => {
    const { addressName, latitude, longitude } = riderLocation
    if (addressName && latitude === rider.currentLocation.latitude &&
      longitude === rider.currentLocation.longitude) {
      return addressName
    }
    const { display_name } = await getLocation(
      rider.currentLocation.latitude,
      rider.currentLocation.longitude
    )
    const address = display_name.split(',')[0]
    setRiderLocation({
      ...rider,
      addressName: address,
      latitude: rider.currentLocation.latitude,
      longitude: rider.currentLocation.longitude,
    })
    return riderLocation.addressName
  }, [riderLocation, rider])

  useEffect(() => {
    getRiderLocation()
  }, [getRiderLocation])

  return(
    <article>
      <div className="ride-top">
        <div className="header">
          <img src="assets/avatar.jpg" alt="Rider" />
          <h3>{ fullName(rider) }</h3>
        </div>
        {
          rider.reviews &&
            <Ratings reviews={rider.reviews} />
        }
      </div>
      <div className="ride-bottom">
        <div className="far-away">
          <IonIcon icon={pin} />
          <h4>Now in { riderLocation.addressName }</h4>
        </div>
        <div className="action-btn">
          <IonButton color="dark"
            size="small"
            onClick={callAction}>Call</IonButton>
        </div>
      </div>
    </article>
  )
}

export default Free
