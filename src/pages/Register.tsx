import {
  IonButton, IonCol, IonContent, IonGrid,
  IonInput, IonItem, IonLabel, IonList, IonListHeader,
  IonPage, IonRadio, IonRadioGroup, IonRow, IonSpinner, 
} from '@ionic/react';
import React, { useState } from 'react';

import './Login.css'

import { register } from '../firebase'
import { setError } from '../store/actions'
import store from '../store'

const Register: React.FC<any> = ({ history }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    address: '',
    password: '',
    userType: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('Changing', name, value)
    setUser({
      ...user,
      ...{ [name]: value },
    });
  }

  const registerUser = async () => {
    setLoading(true)
    try {
      const { userType } = await register(user as any)
      setLoading(false)
      if (userType === 'rider') {
        return history.push('/rider')
      }
      history.push('/client')
    } catch (e) {
      setLoading(false)
      console.log('Registration error', e)
      store.dispatch(setError(e.message))
    }
  }
  
  return (
    <IonPage>
      <IonContent className="ion-padding auth-form register">
        <h3>Register</h3>
        <section>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">First name</IonLabel>
                  <IonInput name="firstName" type="text" minlength={2}
                   value={user.firstName}
                   onIonChange={handleChange} required />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Last name</IonLabel>
                  <IonInput name="lastName" type="text" minlength={2} required
                    value={user.lastName}
                    onIonChange={handleChange} />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput name="email" type="email" required
                value={user.email}
                onIonChange={handleChange} />
            </IonItem>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Age</IonLabel>
                  <IonInput name="age" type="number" minlength={0} required
                    value={user.age}
                    onIonChange={handleChange} />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Address</IonLabel>
                  <IonInput name="address" type="text" minlength={2}
                    value={user.address}
                    onIonChange={handleChange} />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput name="password" type="password" minlength={6} required
                value={user.password}
                onIonChange={handleChange} />
            </IonItem>

            <IonList>
              <IonRadioGroup name="userType" onIonChange={handleChange}>
                <IonListHeader>
                  <IonLabel>Register as</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Client</IonLabel>
                  <IonRadio slot="start" value="client"/>
                </IonItem>

                <IonItem>
                  <IonLabel>Rider</IonLabel>
                  <IonRadio slot="start" value="rider" />
                </IonItem>
              </IonRadioGroup>
            </IonList>

            <div className="btn-cont">
              <IonButton onClick={registerUser} disabled={loading}
              color="dark">
                { loading && <IonSpinner name="crescent" /> }&nbsp;
                Register
              </IonButton>
            </div>
          </IonGrid>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Register;
