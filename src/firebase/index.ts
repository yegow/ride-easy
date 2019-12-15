// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

import { config } from './config';
import Review from "../pages/client/Review";

// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: string;
  userType: string;
  password: string;
}

export const register = async (userDetails: User): Promise<any> => {
  try {
    const {
      firstName, lastName, email, age, address, userType, password
    } = userDetails;
    const { user } = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    let profileBody;

    if (userType === 'rider') {
      profileBody = {
        firstName,
        lastName,
        age,
        address,
        userType,
        status: 'bikeNotRegistered'
      };
    } else {
      profileBody = {
        firstName,
        lastName,
        age,
        address,
        userType,
      };
    }

    const profileRef = db.collection('profiles').doc(user!.uid)
    profileRef.set(profileBody);
    const profileDoc = await profileRef.get()
    return { ...user, ...profileDoc.data() }
  } catch (e) {
    console.log('Caught error', e)
    throw e;
  }
}

export const login = async (email: string, password: string): Promise<any> => {
  try {
    console.log('Attempting login in firebase', email, password)
    const { user } = await auth.signInWithEmailAndPassword(
      email,
      password,
    );
    const profileRef = db.collection('profiles').doc(user!.uid)
    const profileDoc = await profileRef.get()
    const profileData = profileDoc.data()

    if (profileData!.userType === 'rider' && profileData!.status !== 'bikeNotRegistered') {
      const bikeRef = db.collection('bikes').doc(user!.uid)
      const bikeDoc = await bikeRef.get()
      profileData!.bike = bikeDoc.data()
    }
    return { ...user, ...profileData }
  } catch (e) {
    console.log('Caught error', e)
    throw e;
  }
};

export const watchSession = (
  cb: (user: firebase.UserInfo | null) =>void
  ):  () => any =>
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const profileRef = db.collection('profiles').doc(user.uid);
      const profileDoc = await profileRef.get();
      const profileData = profileDoc.data()

      if (profileData!.userType === 'rider' && profileData!.status !== 'bikeNotRegistered') {
        const bikeRef = db.collection('bikes').doc(user!.uid)
        const bikeDoc = await bikeRef.get()
        profileData!.bike = bikeDoc.data()
      }

      cb({ ...user, ...profileData });
    } else {
      cb(null);
    }
});

export const signOut = async () => await auth.signOut()

interface Bike {
  licensePlate: string;
  licenseNumber: string;
  userId: string;
}

export const registerBike = async (bike: Bike) => {
  const { licensePlate, licenseNumber, userId } = bike
  const bikeRef = db.collection('bikes').doc(userId)
  await bikeRef.set({
    licenseNumber,
    licensePlate,
    rider: userId,
  })
  const userRef = db.collection('profiles').doc(userId)
  await userRef.update({
    status: 'off-service',
    booked: false,
  })
  const bikeDoc = await bikeRef.get()
  return bikeDoc.data()
}

export const updateStatus = async ({ userId, status }: any) => {
  try {
    const profileRef = db.collection('profiles').doc(userId)
    await profileRef.update({
      status,
    })
  } catch (e) {
    throw e;
  }
}

export const updateUserLocation = async ({ userId, latitude, longitude}: any):
  Promise<firebase.firestore.GeoPoint> => {
  const profileRef = db.collection('profiles').doc(userId)
  await profileRef.update({
    currentLocation: new firebase.firestore.GeoPoint(latitude, longitude),
  })
  const profileDoc = await profileRef.get()
  return profileDoc.data()!.currentLocation
}

export const getAvailableRiders = (cb: (riders: any[]) => void) => {
  const riderRef = db.collection('profiles').where('userType', '==', 'rider')
    .where('status', '==', 'on-service').where('booked', '==', false)
  return riderRef.onSnapshot(async (snapshot) => {
    if (snapshot.empty) {
      cb([])
    } else {
      const docs = snapshot.docs.map(async d => {
        const reviewsRef = db.collection('reviews').where('rider', '==', d.id)
        const reviewsDoc = await reviewsRef.get()
        if (reviewsDoc.empty) {
          return {
            id: d.id,
            ...d.data(),
          }
        }

        const reviewsData = reviewsDoc.docs.map(d => d.data())

        return {
          id: d.id,
          ...d.data(),
          reviews: reviewsData,
        }
      })
      cb(await Promise.all(docs))
    }
  })
}

export const getClientRides = (userId: any, cb: (rides: any[]) => void) => {
  const rideRef = db.collection('rides').where('client', '==', userId)
    .orderBy('timestamp', 'desc')
  return rideRef.onSnapshot(async (snapshot) => {
    if (snapshot.empty) {
      cb([])
    } else {
      const docs = snapshot.docs.map(async d => {
        const riderRef = db.collection('profiles').doc(d!.data()!.rider)
        const riderDoc = await riderRef.get()
        const riderData = riderDoc!.data()
        const rider = {
          id: riderDoc.id,
          firstName: riderData!.lastName,
          lastName: riderData!.firstName,
        }

        const reviewRef = db.collection('reviews').doc(d.id)
        const reviewDoc = await reviewRef.get()
        if (!reviewDoc.exists) {
          return {
            id: d.id,
            ...d.data(),
            rider,
          }
        }

        const reviewData = reviewDoc.data()
        return {
          id: d.id,
          ...d.data(),
          review: reviewData,
          rider,
        }
      })

      cb(await Promise.all(docs))
    }
  })
}

export const getRiderRides = (userId: any, cb: (rides: any[]) => void) => {
  const rideRef = db.collection('rides').where('rider', '==', userId)
    .orderBy('timestamp', 'desc')
  return rideRef.onSnapshot(async (snapshot) => {
    if (snapshot.empty) {
      cb([])
    } else {
      const docs = snapshot.docs.map(async d => {
        const rideData = d.data()
        const clientRef = db.collection('profiles').doc(rideData.client)
        const reviewRef = db.collection('reviews').doc(d.id)
        const clientDoc = await clientRef.get()
        const reviewDoc = await reviewRef.get()
        const clientData = clientDoc.data()
        const reviewData = reviewDoc.data()
        return {
          id: d.id,
          ...d.data(),
          client: {
            id: clientDoc.id,
            firstName: clientData!.firstName,
            lastName: clientData!.lastName,
            currentLocation: {
              latitude: clientData!.currentLocation.latitude,
              longitude: clientData!.currentLocation.longitude,
            }
          },
          review: reviewData || null
        }
      })
      cb(await Promise.all(docs))
    }
  })
}

export const bookRide = async ({rider, client}: any) => {
  const rideRef = db.collection('rides')
  const riderRef = db.collection('profiles').doc(rider)
  await rideRef.add({
    client,
    rider,
    status: 'pending',
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  })
  return await riderRef.update({
    booked: true,
  })
}

export const updateClientLocation = async (id: any, location: any) => {
  try {
    await db.collection('profiles').doc(id).update({
      currentLocation: new firebase.firestore.GeoPoint(
        location.latitude,
        location.longitude,
      )
    })
  } catch (e) {
    throw e
  }
}

export const acceptRideRequest = async (rideId: any) => {
  const rideRef = db.collection('rides').doc(rideId)
  try {
    await rideRef.update({
      status: 'active',
    })
  } catch (e) {
    throw e
  }
}

export const cancelRide = async (rideId: any) => {
  const rideRef = db.collection('rides').doc(rideId)
  const rideDoc = await rideRef.get()
  const rideData = rideDoc.data()
  const riderRef = db.collection('profiles').doc(rideData!.rider)
  await rideRef.update({
    status: 'cancelled',
  })
  return await riderRef.update({
    booked: false,
  })
}

export const pickUpClient = async (rideId: any, location: any) => {
  const rideRef = db.collection('rides').doc(rideId)
  return await rideRef.update({
    status: 'picked-up',
    from: new firebase.firestore.GeoPoint(location.latitude, location.longitude),
  })
}

interface Arrival {
  rideId: any
  location: {
    latitude: any,
    longitude: any,
  }
  payment?: {
    chargeId: string,
    amount: any,
  }
}

export const reportArrival = async ({rideId, location, payment}: Arrival) => {
  const rideRef = db.collection('rides').doc(rideId)
  const rideDoc = await rideRef.get()
  if (rideDoc.exists) {
    const riderRef = db.collection('profiles').doc(rideDoc!.data()!.rider)
    await rideRef.update({
      status: 'delivered',
      to: new firebase.firestore.GeoPoint(location.latitude, location.longitude),
    })
    return await riderRef.update({
      booked: false,
    })
  } else {
    throw new Error('No ride by that identifier')
  }
}

interface Review {
  rideId: any,
  review: {
    comment: string,
    rating: number,
  }
}

export const postReview = async ({ rideId, review }: Review) => {
  const rideRef = db.collection('rides').doc(rideId)
  const rideDoc = await rideRef.get()
  if (!rideDoc.exists) {
    throw new Error('No ride found by that identifier')
  }

  const rideData = rideDoc.data()
  const reviewRef = db.collection('reviews').doc(rideId)
  try {
    await reviewRef.set({
      ...review,
      rider: rideData!.rider,
    })
  } catch (e) {
    throw e
  }
}
