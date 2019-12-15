import { IonButton, IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import React, { useEffect, useState, useCallback } from 'react'

import Ratings from './Ratings'
import { getLocation } from '../../../util/getLocation'
import { fullName } from '../../../util/fullName'

const Delivered: React.FC<any> = ({ ride }) => {
  let [fromAddress, setFromAddress] = useState('')
  let [toAddress, setToAddress] = useState('')

  const getFromLocation = useCallback(async (lat: any, lng: any) => {
    if (fromAddress) {
      return fromAddress
    }
    try {
      const { display_name } = await getLocation(lat, lng)
      const address = display_name.split(',')[0]
      setFromAddress(address)
    } catch (e) {
      console.log('LocationIQ err', e)
    }
  }, [fromAddress])

  const getToLocation = useCallback(async (lat: any, lng: any) => {
    console.log('Getting location called')
    if (toAddress) {
      return toAddress
    }
    try {
      const { display_name } = await getLocation(lat, lng)
      const address = display_name.split(',')[0]
      setToAddress(address)
    } catch (e) {
      console.log('LocationIQ err', e)
    }
  }, [toAddress])

  useEffect(() => {
    getFromLocation(ride.from.latitude, ride.from.longitude)
    getToLocation(ride.to.latitude, ride.to.longitude)
  }, [getToLocation, getFromLocation, ride])

  return (
    <article>
      <div className="ride-top">
        <div className="header">
          <img src="assets/avatar.jpg" alt="Rider" />
          <h3>{ fullName(ride.rider) }</h3>
        </div>
        {
          ride.review ?
            <Ratings reviews={[ride.review]} /> :
            <IonButton color="dark" routerLink={"/client/review/" + ride.id}>+ Review</IonButton>
        }
      </div>
      <div className="ride-bottom ride-bottom-delivered">
        <h4>
          { fromAddress }
          &nbsp; <span>to</span>
          &nbsp; { toAddress }
        </h4>
        <div>
          <IonIcon icon={checkmark}></IonIcon>
          <h4>Delivered</h4>
        </div>
      </div>
    </article>
  )
}

export default Delivered
