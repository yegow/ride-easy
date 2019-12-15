import React from 'react'

import Cancelled from './ride-components/Cancelled'
import Delivered from './ride-components/Delivered'
import Pending from './ride-components/Pending'
import ToPickup from './ride-components/ToPickup'
import PickedUp from './ride-components/PickedUp'

import '../client/RideItem.css'

const RideItem: React.FC<any> = ({ ride }) => {
  if (ride.status === 'pending') {
    return(
      <Pending ride={ride} />
    )
  }
  if (ride.status === 'active') {
    return(
      <ToPickup ride={ride} />
    )
  }
  if (ride.status === 'picked-up') {
    return(
      <PickedUp ride={ride} />
    )
  }
  if (ride.status === 'delivered') {
    return(
      <Delivered ride={ride} />
    )
  }
  if (ride.status === 'cancelled') {
    return(
      <Cancelled ride={ride} />
    )
  }
  return null;
}

export default RideItem
