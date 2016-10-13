import {LOGIN_REQUEST,SAVE_USER, LOGIN_FAILURE, LOGIN_SUCCESS, SAVE_STATE} from '../../constants/ActionTypes';
import {LOGIN_DONE, LOGGING_IN, LOGIN_ERROR,} from '../actions/UserActions';
// import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  isAuthenticated: false,
  chosenState: "1",
  token: {},
  user: {},
  isLoggingIn: false,
  loginSuccess: false,
  loginError: false,
}

export default function user(state = initialState, action) {
  switch(action.type) {
    case LOGIN_DONE:
      return {
        ...state,
        ...action.user,
        ...action.token,
        isLoggingIn: false,
        loginSuccess: true,
        loginError: false,
      }
    case LOGGING_IN:
      return {
        ...state,
        isLoggingIn: action.bool,
        loginError: false,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
        isLoggingIn: false,
      }

    // case LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     isLoggingIn: false,
    //     isAuthenticated: true, // Dismiss the login view.
    //     token: action.token, // Used in subsequent API requests.
    //     chosenState: action.chosenState,
    //     user: action.user,
    //     userId: "1", // TEMPORARY
    //   }
    default:
      return state
  }
}
