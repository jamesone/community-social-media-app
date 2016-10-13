import { combineReducers } from 'redux'
import { RESET_LOCATION, SET_LOCATION, SET_TYPE} from '../../constants/ActionTypes'

const initialState = {
  'address': "",
  'longitude': '',
  'latitude': "",
  'mapsUrl': "",
  'suburb': "",
  'postType': "",

};


export default function form(state = initialState, action) {
  switch (action.type) {

     case RESET_LOCATION:
      const initialLocation = {
        address: "",
        longitude: "",
        latitude: "",
        suburb: "",
        mapsUrl: "",
      };

      return Object.assign({}, state, newLocation);

    case SET_LOCATION:
      const newLocation = {
        address: action.location.address,
        longitude: action.location.longitude,
        latitude: action.location.latitude,
        suburb: action.location.suburb,
        mapsUrl: action.location.mapsUrl,
      };

      return Object.assign({}, state, newLocation);

    case SET_TYPE:
      return {
        ...state,
      ...action.postType,
      }


    default:
      return state
  }
};
