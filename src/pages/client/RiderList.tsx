import { IonModal } from '@ionic/react'
import React, { useState } from 'react'
import { Geolocation, Geoposition } from '@ionic-native/geolocation'

import RideItem from './RideItem'
import BookRideModal from './modals/BookRide'
import { bookRide, updateClientLocation } from '../../firebase'
import store from '../../store'
import { setError } from '../../store/actions'

const RiderList: React.FC<any> = ({ riders, user }) => {
  const [showModal, setShowModal] = useState(false)

  const bookRider = async (riderId: any) => {
    if (!user) {
      return
    }

    try {
      const data: Geoposition = await Geolocation.getCurrentPosition()
      await updateClientLocation(user.uid, {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      })
    } catch (e) {
      console.log('Booking geo error', e)
      store.dispatch(setError('There was a problem getting your current location.'))
      return
    }

    try {
      await bookRide({
        rider: riderId,
        client: user.uid,
      })
      setShowModal(true)
    } catch (e) {
      console.log('Booking firebase err', e)
      store.dispatch(setError(e.message))
    }
  }

  return (
    <div className="ride-list">
      {
        riders.map((rider: any) =>
          <RideItem
            rider={rider}
            callAction={() => {
              bookRider(rider.id)
            }}
            key={rider.id} />
        )
      }
      {
        showModal &&
        <IonModal isOpen={showModal}>
          <BookRideModal onClose={() => setShowModal(false)}/>
        </IonModal>
      }
    </div>
  )
}

export default RiderList
