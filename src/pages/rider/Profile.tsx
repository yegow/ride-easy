import {
  IonAvatar, IonBadge, IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonPage,
} from '@ionic/react'
import { bicycle, mail, pin, logOut } from 'ionicons/icons'
import React from 'react'

import { upperCaseFirst } from '../../util/upperCaseFirst'
import { updateStatus, signOut } from '../../firebase'
import '../client/Profile.css'
import store from '../../store'
import { logout, setStatus, setError } from '../../store/actions'

const Profile: React.FC<any> = ({ user, history }) => {
  const setOffService = async () => {
    try {
      await updateStatus({
        userId: user.uid,
        status: 'off-service',
      })
      store.dispatch(setStatus('off-service'))
    } catch (e) {
      console.log('Status err', e)
      store.dispatch(setError(e.message))
    }
  }
  const setOnService = async () => {
    try {
      await updateStatus({
        userId: user.uid,
        status: 'on-service',
      })
      store.dispatch(setStatus('on-service'))
    } catch (e) {
      console.log('Status err', e)
      store.dispatch(setError(e.message))
    }
  }

  const leave = async () => {
    try {
      await signOut()
      store.dispatch(logout())
      history.push('/home')
    } catch (e) {
      store.dispatch(setError(e.message))
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding profile">
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton color="dark" onClick={leave}>
            <IonIcon color="light" icon={logOut} />
          </IonFabButton>
        </IonFab>
        {
          (user && user.uid) && <span>
            <IonAvatar>
              <img src="assets/avatar.jpg" alt="Rider" />
            </IonAvatar>
            <h3>{ upperCaseFirst(user.firstName) + ' ' + upperCaseFirst(user.lastName) }</h3>
            <section>
              <div>
                <IonIcon icon={mail} />
                { user.email }
              </div>
              <div>
                <IonIcon icon={pin} />
                { user.address }
              </div>
              {
                user.status === 'bikeNotRegistered' ?
                  <IonButton color="dark" routerLink="/rider/register-bike">
                    Register your bike
                  </IonButton> :
                  <span>
                    <div>
                      <IonIcon icon={bicycle} />
                      { user.bike && user.bike.licensePlate }
                      {
                        user.status === 'off-service' ?
                          <IonBadge color="danger">Off-service</IonBadge> :
                          <IonBadge color="success">On-service</IonBadge>
                      }
                    </div>
                    { 
                      user.status === 'on-service' &&
                        <IonButton color="dark"
                          onClick={setOffService}
                          className="status-btn">
                          Set Off-service
                        </IonButton>
                    }
                    {
                      user.status === 'off-service' &&
                        <IonButton color="dark"
                        onClick={setOnService}
                        className="status-btn">
                          Set On-service
                        </IonButton>
                    }
                  </span>
              }
            </section>
          </span>
        }
      </IonContent>
    </IonPage>
  );
};

export default Profile;
