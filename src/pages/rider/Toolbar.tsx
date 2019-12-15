import {
  IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet
} from '@ionic/react'
import { happy, time } from 'ionicons/icons'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Geolocation, Geoposition } from '@ionic-native/geolocation'
import { ConnectedProps } from 'react-redux'

import './Toolbar.css'
import { watchSession, updateUserLocation, getRiderRides } from '../../firebase'
import store from '../../store'
import { login, logout, setError, updateCurrentLocation, updateRides } from '../../store/actions'
import History from '../containers/rider/History'
import Profile from '../containers/rider/Profile'
import RegisterBike from '../containers/rider/RegisterBike'
import { toolbarConnect } from '../containers/rider/Toolbar'

type Props = ConnectedProps<typeof toolbarConnect>

const Toolbar: React.FC<Props> = ({ user, pendingRides }) => {
  useEffect(() => watchSession((user) => {
    if (user) {
      store.dispatch(login(user))
    } else {
      store.dispatch(logout())
    }
  }), [])

  useEffect(() => {
    if (user && user.uid) {
      return getRiderRides(user.uid, (rides) => {
        store.dispatch(updateRides(rides))
      })
    }
  }, [user])

  const getLocation = () => {
    if (!user || (!user.uid || user.status === 'off-service')) {
      return
    }
    const watchPos = Geolocation.watchPosition()
    const subscriber = async (data: Geoposition) => {
      if (data.coords) {
        try {
          const newCoords = await updateUserLocation({
            userId: user.uid,
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          })

          store.dispatch(updateCurrentLocation({
            latitude: newCoords.latitude,
            longitude: newCoords.longitude,
          }))
        } catch (e) {
          console.log('Update position error', e)
          store.dispatch(setError(e.message))
        }
      } else {
        console.log('Location query err', data)
        store.dispatch(setError('There was an error obtaining your location.'))
      }
    }

    watchPos.subscribe(subscriber)
  }

  useEffect(getLocation, [])

  const useMatchesProfile = (
    // path: string,
    isActiveOnlyWhenExact?: boolean,
  ) => useRouteMatch({
    path: '/rider/profile',
    exact: isActiveOnlyWhenExact,
  })

  const useMatchesHistory = (
    // path: string,
    isActiveOnlyWhenExact?: boolean,
  ) => useRouteMatch({
    path: '/rider/history',
    exact: isActiveOnlyWhenExact,
  });

  const mProfile = useMatchesProfile()
  const mHistory = useMatchesHistory()

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/rider" exact={true} render={() => <Redirect to="/rider/profile" />} />
        <Route path="/rider/history" component={History} exact={true} />
        <Route path="/rider/profile" component={Profile} exact={true} />
        <Route path="/rider/register-bike" component={RegisterBike} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="dark">
        <IonTabButton tab="profile" href="/rider/profile">
          <IonIcon icon={happy} color={mProfile ? "primary" : "light"} />
          <IonLabel color={mProfile ? "primary" : "light"}>Profile</IonLabel>
        </IonTabButton>

        {
          (user && user.status !== 'bikeNotRegistered') &&
          <IonTabButton tab="history" href="/rider/history">
            <IonIcon icon={time} color={mHistory ? "primary" : "light"} />
            <IonLabel color={mHistory ? "primary" : "light"}>My rides</IonLabel>
            <IonBadge color="danger">{ pendingRides }</IonBadge>
          </IonTabButton>
        }
      </IonTabBar>
    </IonTabs>
  );
};

export default Toolbar;
