import * as userApi from '../api/user';
export const LOGIN_DONE = 'LOGIN_DONE';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
// Make API call
export function loginUser(userId, token, permissions, applicationID) {
		return (dispatch) => {
        dispatch(loggingIn(true));

        userApi.login(json => {
  			if (json.hasOwnProperty('fb_error')) {
          dispatch(loginError('server_error'))
  				console.log ("\n\nFacebook token was invalid, please try loggin in again");
  				return;
  			} else if (json.hasOwnProperty('error')) {
          dispatch(loginError('server_error'))
          console.log ("\n\nSomething went wrong on our end, try again!");
          return;
        }

        const {user, token,} = json;
        dispatch(userLoggedIn(user, token));
  		}, userId, token, permissions, applicationID);
    };
}

// Save user to redux
export function userLoggedIn (user, token) {
  console.log ("Success, user has been logged in.", user);
  console.log (token);

  return {
    type: LOGIN_DONE,
    user,
    token,
  }
}

export function loginError (type){
  return {
    type: LOGIN_ERROR,
    errorType: type,
  }
}

export function loggingIn (bool){
  return {
    type: LOGGING_IN,
    bool,
  }
}
