import React from 'react'

import Active from './ride-components/Active'
import Cancelled from './ride-components/Cancelled'
import Delivered from './ride-components/Delivered'
import Free from './ride-components/Free'
import PickedUp from './ride-components/PickedUp'

import './RideItem.css'

const RideItem: React.FC<any> = ({ rider, ride, callAction }) => {
  if (rider) {
    return(
      <Free rider={rider} callAction={callAction} />
    )
  }
  if (ride.status === 'active' || ride.status === 'pending') {
    return(
      <Active ride={ride} />
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
