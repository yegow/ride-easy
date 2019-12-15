import { IonButton, IonContent, IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { watchSession } from '../firebase'
import { login, logout } from '../store/actions'
import store from '../store'
import './Home.css';

const Home: React.FC = () => {
  useEffect(() => watchSession((user) => {
    if (user) {
      store.dispatch(login(user))
    } else {
      store.dispatch(logout())
    }
  }), []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Ride <span>Easy</span></h1>
        <img src="assets/ride-easy.jpg" alt="Home" />
        <hr/>
        <IonButton color="light" expand="full"
          routerLink="/login">Login</IonButton>
        <IonButton color="dark" expand="full"
          routerLink="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
