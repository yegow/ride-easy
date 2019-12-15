import {
  IonButton, IonContent, IonItem, IonLabel, IonPage, IonSpinner, IonTextarea
} from '@ionic/react'
import React, { useState } from 'react'
import Rater from 'react-rater'

import Star from './Star'
import './Review.css'
import { useParams } from 'react-router'
import { postReview } from '../../firebase'
import store from '../../store'
import { setError } from '../../store/actions'

const Review: React.FC<any> = ({ history }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const handleChange = (event: any) => {
    setComment(event.target.value)
  }

  const handleSubmit = async (event: any) => {
    setLoading(true)
    try {
      await postReview({
        rideId: id,
        review: {
          comment,
          rating,
        }
      })
      setLoading(false)
      history.push('/client/history')
    } catch (e) {
      console.log('Post review error', e)
      setLoading(false)
      store.dispatch(setError(e.message))
    }
  }

  return(
    <IonPage>
      <IonContent className="ion-padding review">
        <h2 className="review-header">Did you enjoy your ride?</h2>
        <section>
          <div className="review-rating">
            <Rater rating={rating} onRate={({ rating }) => {
                setRating(rating)
              }}>
              <Star />
            </Rater>
          </div>
          <div className="review-comment">
            <IonItem>
              <IonLabel position="floating">Say something nice</IonLabel>
              <IonTextarea value={comment} onIonChange={handleChange}></IonTextarea>
            </IonItem>
          </div>
          <div className="review-btn">
            <IonButton color="dark"
              onClick={handleSubmit}
              disabled={loading}>
              { loading && <IonSpinner name="crescent" color="light" /> }
              Submit
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  )
}

export default Review
