import {
  IonButton, IonContent, IonModal, IonPage,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { Geolocation, Geoposition } from '@ionic-native/geolocation'

import CheckoutModal from './modals/Checkout'
import './Checkout.css'
import { useParams } from 'react-router';
import { reportArrival } from '../../firebase'
import store from '../../store'
import { setError } from '../../store/actions'

// Create a Stripe client.
const stripe = window.Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
let card: any;

const Checkout: React.FC<any> = ({ history }) => {
  const cardRef = React.createRef()
  const [error, setCError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [cardMounted, setCardMounted] = useState(false)
  const { id } = useParams()

  const mountStripeForm = () => {
    if (cardMounted) {
      return
    }
    // Create an instance of Elements.
    const elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount(cardRef.current);
    setCardMounted(true)

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event: any) {
      if (event.error) {
        setCError(event.error.message)
      } else {
        setCError('')
      }
    });
  };
  useEffect(mountStripeForm, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const { token, error } = await stripe.createToken(card);
    if (error) {
      setCError(error.message)
    } else {
      console.log('Stripe token', token)
      let data: Geoposition
      try {
        data = await Geolocation.getCurrentPosition()
      } catch (e) {
        console.log(e)
        store.dispatch(setError('Could not obtain your location'))
        return;
      }

      try {
        await reportArrival({
          rideId: id,
          location: {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          }
        })
        setShowModal(true)
      } catch (e) {
        store.dispatch(setError(e.message))
      }

      history.push('/client/history')
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding checkout">
        <h3>Checkout</h3>
        <section className="stripe-form-container">
          <form action="/charge" method="post" id="payment-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                KES.150
              </div>
              <div className="form-row">
                <label htmlFor="card-element">
                  Credit or debit card
                </label>
                <div id="card-element" ref={cardRef as any}>
                  {/* A Stripe Element will be inserted here. */}
                </div>

                {/* Used to display form errors. */}
                <div id="card-errors" role="alert">
                  { error }
                </div>
              </div>

              <div>
                <IonButton color="dark" type="submit">Submit Payment</IonButton>
              </div>
            </div>
          </form>
        </section>
        {
          showModal &&
          <IonModal isOpen={showModal}>
            <CheckoutModal rideId={id} onClose={() => setShowModal(false)} />
          </IonModal>
        }
      </IonContent>
    </IonPage>
  )
}

export default Checkout
