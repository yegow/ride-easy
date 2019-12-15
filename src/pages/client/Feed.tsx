import {
  IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet
} from '@ionic/react'
import { happy, bicycle,time } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'
import React, { useEffect } from 'react'

import History from '../containers/client/History'
import Riders from '../containers/client/Riders'
import Profile from '../containers/client/Profile'
import Checkout from './Checkout'
import Review from './Review'
import store from '../../store'
import { login, logout, updateRides, updateRiders } from '../../store/actions'
import { watchSession, getAvailableRiders, getClientRides } from '../../firebase'


const Feed: React.FC<any> = ({ user }) => {
  useEffect(() => watchSession((user) => {
    if (user) {
      store.dispatch(login(user))
    } else {
      store.dispatch(logout())
    }
  }), []);

  useEffect(() => getAvailableRiders((riders) => {
    store.dispatch(updateRiders(riders))
  }), []);

  useEffect(() => {
    if (user && user.uid) {
      return getClientRides(user.uid, (rides) => {
        console.log('My rides?', rides)
        store.dispatch(updateRides(rides))
      })
    }
  }, [user]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/client" exact={true} render={() => <Redirect to="/client/riders" />} />
        <Route path="/client/riders" component={Riders} exact={true} />
        <Route path="/client/profile" component={Profile} exact={true} />
        <Route path="/client/history" component={History} exact={true} />
        <Route path="/client/checkout/:id" component={Checkout} />
        <Route path="/client/review/:id" component={Review} />
      </IonRouterOutlet>
      <IonTabBar color="dark" slot="bottom">
        <IonTabButton tab="riders" href="/client/riders">
          <IonIcon icon={bicycle} color="light" />
          <IonLabel color="light">Riders</IonLabel>
          <IonBadge>6</IonBadge>
        </IonTabButton>

        <IonTabButton tab="profile" href="/client/profile">
          <IonIcon icon={happy} color="light" />
          <IonLabel color="light">Profile</IonLabel>
        </IonTabButton>

        <IonTabButton tab="history" href="/client/history">
          <IonIcon icon={time} color="light" />
          <IonLabel color="light">My rides</IonLabel>
          <IonBadge>6</IonBadge>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Feed;
