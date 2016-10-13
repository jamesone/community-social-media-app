const staticUserId = 1;
import {AsyncStorage} from 'react-native';
const config = require('../../../config');

export function login(cb, userId, token, permissions, applicationID) {
  // console.log("\n\nTrying to login", config.host +":"+config.port+"/user/login");

    // Using this until comments are linked up to location based photos
	return fetch(config.host+"user/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fb_token: token,
            userId: userId,
            permissions: permissions,
            applicationID: applicationID,
          })
        })
        .then((response) => response.json())
        .then((json) => {
          console.log("\n\nUser has been logged in/registered");
          const j = JSON.parse(json);

          cb(j);
        }).catch((err) => {
          console.log("\n\nError: ", err);
        })
    .done();
}
