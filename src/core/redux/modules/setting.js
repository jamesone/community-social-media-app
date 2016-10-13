import { combineReducers } from 'redux'
import { SET_REGION } from '../../constants/ActionTypes'

const initialState = {
  'region': 1,
  // More settings to be added here...
};


export default function setting(state = initialState, action) {
  switch (action.type) {

    case SET_REGION:
      // This value will be used in all API calls
      return {
        ...state,
        ...action.region,
      };

    default:
      return state
  }
};
