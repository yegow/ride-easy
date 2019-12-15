import React from 'react'

import RideItem from './RideItem'

const RideList: React.FC<any> = ({ rides }) => {
  return (
    <div className="ride-list">
      {
        rides.map((r: any) =>
          <RideItem
            ride={r}
            key={r.id} />
        )
      }
    </div>
  )
}

export default RideList
