/*
 * action types
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_ERROR = 'SET_ERROR'
export const SET_SUCCESS = 'SET_SUCCESS'
export const ADD_BIKE = 'ADD_BIKE'
export const SET_STATUS = 'SET_STATUS'
export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION'
export const UPDATE_RIDES = 'UPDATE_RIDES'
export const UPDATE_RIDERS = 'UPDATE_RIDERS'

/*
 * action creators
 */

export function login(user: any) {
  return { type: LOGIN, user }
}

export function logout() {
  return { type: LOGOUT }
}

export function setError(error: string | null = null) {
  return { type: SET_ERROR, error }
}

export function setSuccess(success: string | null = null) {
  return { type: SET_SUCCESS, success }
}

export function addBike(bike: any) {
  return { type: ADD_BIKE, bike }
}

export function setStatus(status: string) {
  return { type: SET_STATUS, status }
}

export function updateCurrentLocation(location: any) {
  return { type: UPDATE_USER_LOCATION, location }
}

export function updateRides(rides: any[]) {
  return { type: UPDATE_RIDES, rides }
}

export function updateRiders(riders: any[]) {
  return { type: UPDATE_RIDERS, riders }
}