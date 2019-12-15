import { IonIcon } from '@ionic/react'
import { heart } from 'ionicons/icons'
import React from 'react'

const Ratings: React.FC<any> = ({ reviews }) => {
  const ratings = reviews.map((r: any) => r.rating)
  const ratingsTotal = ratings.reduce((acc: number, v: number) => acc += v, 0)
  const ratingsAverage: number[] = Array(ratingsTotal / ratings.length).fill(0)
  let count = 0

  return(
    <div className="rating-bar">
      {
        ratingsAverage.map((r: number) => <IonIcon icon={heart} key={count++} />)
      }
    </div>
  )
}

export default Ratings