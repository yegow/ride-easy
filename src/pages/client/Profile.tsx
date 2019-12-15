import {
  IonAvatar, IonContent, IonFab, IonFabButton, IonIcon,
  IonPage,
} from '@ionic/react'
import { logOut, mail, pin } from 'ionicons/icons'
import React from 'react'

import './Profile.css'

import { upperCaseFirst } from '../../util/upperCaseFirst'
import { signOut } from '../../firebase'
import store from '../../store'
import { logout, setError } from '../../store/actions'

const Profile: React.FC<any> = ({ user, history }) => {
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
            </section>
          </span>
        }
      </IonContent>
    </IonPage>
  )
}

export default Profile