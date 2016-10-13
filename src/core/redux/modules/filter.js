import { combineReducers } from 'redux'
import { POST_TYPE_FILTER,SET_COORDS,SET_ORDERBY, SET_GEO,RELOAD_FEED, SET_LOCATION, SET_TYPE,ADD_TYPE} from '../../constants/ActionTypes'

const initialState = {
  'shouldReload': false,
  'chosenIds': [],
  'orderBy': [],
  'isGeo': false,
  'radius': 10,
  'longitude': null,
  'latitude': null,
};

export default function filter(state = initialState, action) {
  switch (action.type) {

    // ? #tODO can remove?
    case RELOAD_FEED:
      return {
        ...state,
        ...action.shouldReload,
      }

    // Set coordinates for GEO search
    case SET_COORDS:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
      }

    // Set array of postTypeIds
    case ADD_TYPE:
      return {
          ...state,
          chosenIds: action.chosenIds,
      };

    // Set orderby array
    case SET_ORDERBY:
      return {
        ...state,
        orderBy: action.orderBy,
      }

    // Set geo location to true
    case SET_GEO:
      return Object.assign({}, state, {
        isGeo: action.isGeo,
        radius: action.radius,
      });

    default:
      return state
  }
};
