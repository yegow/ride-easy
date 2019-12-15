import {
  IonButton, IonContent, IonInput, IonItem,
  IonLabel, IonPage, IonSpinner,
} from '@ionic/react'
import React, { useState } from 'react'

import './Login.css'

import { login } from '../firebase'
import { setError } from '../store/actions'
import store from '../store'

const Login: React.FC<any> = ({ history }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUser({
      ...user,
      ...{ [name]: value },
    });
  }

  const loginUser = async () => {
    setLoading(true)
    try {
      const { userType } = await login(user.email, user.password)
      setLoading(false)
      if (userType === 'rider') {
        return history.push('/rider')
      }
      history.push('/client')
    } catch (e) {
      setLoading(false)
      console.log('Login error', e)
      store.dispatch(setError(e.message))
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding auth-form">
        <h3>Login</h3>
        <section>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput name="email" type="email" required
              value={user.email}
              onIonChange={handleChange} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput name="password" type="password" minlength={6} required
              value={user.password}
              onIonChange={handleChange} />
          </IonItem>

          <div className="btn-cont">
            <IonButton onClick={loginUser}
              disabled={loading}
              color="dark">
                { loading && <IonSpinner name="crescent" color="light" /> }
                Login
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;
