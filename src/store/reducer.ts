import { combineReducers } from 'redux'
import {
  LOGIN,
  LOGOUT,
  SET_ERROR,
  SET_SUCCESS,
  ADD_BIKE,
  SET_STATUS,
  UPDATE_USER_LOCATION,
  UPDATE_RIDES,
  UPDATE_RIDERS,
} from './actions'

const session = (state = { error: false }, action: any) => {
  switch(action.type) {
    case LOGIN:
      return { ...state, ...action.user }
    case LOGOUT:
      return null
    case ADD_BIKE:
      return { ...state, bike: action.bike }
    case SET_STATUS:
      return { ...state, status: action.status }
    case UPDATE_USER_LOCATION:
      return { ...state, currentLocation: action.location }
    default:
      return state
  }
}

const error = (state = null, action: any) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error
    default:
      return state
  }
}

const success = (state = null, action: any) => {
  switch (action.type) {
    case SET_SUCCESS:
      return action.success
    default:
      return state
  }
}

const rides = (state = [] as any, action: any) => {
  switch (action.type) {
    case UPDATE_RIDES:
      return [...action.rides]
    default:
      return state;
  }
}

const riders = (state = [] as any, action: any) => {
  switch (action.type) {
    case UPDATE_RIDERS:
      return [...action.riders]
    default:
      return state;
  }
}

const rideEasy = combineReducers({
  session,
  error,
  rides,
  riders,
  success,
})

export default rideEasy
