// import React, { Component, Alert, Platform, View, PropTypes, TouchableOpacity, Text, ActivityIndicatorIOS,} from 'react-native';
import React from 'react';
import { Alert, Platform, TouchableOpacity, Text, ActivityIndicatorIOS, View, } from 'react-native';

import FBSK, {
  LoginManager,
  AccessToken,
  LoginButton,
} from 'react-native-fbsdk';
import * as UserActions from '../redux/actions/UserActions';
import {Actions,} from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './login';

class LoginLayout extends React.Component {

  _handleLogin () {
    const {UserActions,} = this.props;

    AccessToken.getCurrentAccessToken().then((tokenData) => {
      console.log(tokenData, "About to login on server  ")
      const {userID, accessToken, permissions, applicationID,} = tokenData;

      // Dispatch login to my server, then save data to redux!
      UserActions.loginUser (userID, accessToken, permissions, applicationID);
    }).catch ( (err) => {
      console.log(err, "No access token found");
      // Dispatch not logged in fail
      // Show alert etc...
      this._handleCancelled ("Something went wrong", "Try again!")
    });
    // Call user action here and log them in on our server ~>

  }

  _handleLogout () {
    alert("Are you sure you want to logout?");
  }

  componentWillMount () {
    console.log (this.props);
  }

  _handleCancelled (title, message) {
    Alert.alert(
        title,
        message,
        [
          {text: 'OK'},
        ]
    )
  }

  componentWillReceiveProps (nextProps){
    const {user, UserActions,} = nextProps;
    if (user.loginSuccess && user.hasOwnProperty('token')) {
      // Actions.feed ({type: 'reset'});
      Actions.tabbar ({type: 'reset'});

    } else if (user.loginError) {
      alert ("Something went wrong! Please try again")
    }
  }

  render() {
    // if (this.props.user.isLoggingIn && !this.props.user.loginError) {
    //   return (
    //     <View style={{top: 64}}>
    //     {(Platform.OS === 'ios') &&
    //       <ActivityIndicatorIOS
    //         style={styles.spinnerStyle}
    //         size="large"
    //       />
    //     }
    //     {(Platform.OS === 'android') &&
    //       <Text>Logging in</Text>
    //     }
    //     </View>
    //   )
    // }

    return (
      <View style={{top: 64}}>
        <View style={styles.introWrapper}>
          <Text>
            Welcome to Community, {"\n\n"}
            Here you can come to find out what's going on around you at any point in time. {"\n\n"}
            Let the wider community know what's going on around you! You'll have the ability to
            post updates to inform other users about what's going on.
            {"\n\n"}
            You'll also have the ability to search for posts around you using your Location!
          </Text>
        </View>
        <View style={styles.loginContainer}>
          <LoginButton
            // publishPermissions={["publish_actions"]} // Implement somehwere else
            readPermissions={["email", 'public_profile',]}
            onLoginFinished={
              (error, result) => {

                if (error) {
                  this._handleCancelled("Try again", `Something went wrong when loggin in, try again!`);
                } else if (result.isCancelled) {
                  this._handleCancelled("Cancelled login", `To use the app you must login with Facebook!
We don't share anything to Facebook without your permission.`);
                } else {
                  this._handleLogin ();
                }
              }
            }
            onLogoutFinished={() => {
              this._handleLogout();
            }} />
          </View>
      </View>
    )
  }

}

// Add inUserActions here
function mapStateToProps(state) {
  const { user, } = state;

  return {
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(UserActions, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLayout);
