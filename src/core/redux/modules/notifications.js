import { combineReducers } from 'redux'
import * as NotificationTypes from '../../constants/NotificationTypes';

const initialState = {
  "feedNotifications": {
    "hasBeenAlertedOfRefresh": false,
    "hasBeenAlertedOfNomorePaging": false,
  }
};


export default function notifications(state = initialState, action) {
  switch (action.type) {

     case NotificationTypes.HAS_BEEN_ALERTED_OF_REFRESH:
        console.log("has been alerted of refresh...?", action.hasBeenAlerted);
       return Object.assign({}, state, {
        hasBeenAlertedOfRefresh: action.hasBeenAlerted,
       });

    default:
      return state
  }
};
