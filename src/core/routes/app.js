import React from 'react';
import {Text} from 'react-native'
import FeedLayout from '@core/containers/FeedLayout';
import MapLayout from '@core/containers/MapLayout';
import MakePostLayout from '@core/containers/MakePostLayout';
import PostLayout from '@core/containers/PostLayout';
import LoginLayout from '@core/containers/LoginLayout';
import FBSK, { AccessToken, } from 'react-native-fbsdk';
import { Actions, Scene, Modal, } from 'react-native-router-flux';
import styles, {navyBlue} from './styles';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
var Icon = require('react-native-vector-icons/MaterialIcons')
const RouterWithRedux = connect()(Router);

class TabIcon extends React.Component {
    render(){
      var icon;
      switch (this.props.title) {
        case 'Feed':
          icon = 'home';
          break;
        case 'Me':
          icon = 'face';
          break;
        case 'Settings':
          icon = 'settings';
          break;
        default:
          icon = 'home';
          break;
      }
        return (
            <Text style={{color: this.props.selected ? navyBlue : 'black'}, [styles.iconWrapper]}>
              <Icon name={icon} size={25} style={{marginTop: 10}} />
            </Text>
        );
    }
}

class Routes extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        showFeed: false,
        backIcon: null,
      };
    }
    render(){
        return (
          <RouterWithRedux>
            <Scene key="root"  >
              <Scene key="user"  component={LoginLayout} title="Login"  />

              <Scene key="tabbar"  tabs={true} tabBarStyle={styles.tabbarStyle}>
                  <Scene key="setting_tab"  title="Settings" icon={TabIcon}>
                    <Scene key="setting"
                        sceneStyle={styles.feedSceneStyle}
                        component={FeedLayout} title="Setting"
                        navigationBarStyle={styles.navStyle}
                        titleStyle={styles.titleStyle}
                        leftButtonTextStyle={styles.titleStyle}
                        rightButtonTextStyle={styles.titleStyle}
                      />
                  </Scene>
                  <Scene key="feed_tab"  title="Feed" icon={TabIcon} initial={true}>
                      <Scene key="feed"
                        sceneStyle={styles.feedSceneStyle}
                        component={FeedLayout} title="Feed" rightTitle="Post"
                        onRight={()=> Actions.post()}
                        leftTitle="Map" onLeft={ () => Actions.map({all: true,})}
                        navigationBarStyle={styles.navStyle}
                        titleStyle={styles.titleStyle}
                        leftButtonTextStyle={styles.titleStyle}
                        rightButtonTextStyle={styles.titleStyle}
                      />

                  </Scene>
                  <Scene key="profile_tab"  title="Me" icon={TabIcon}>
                    <Scene key="profile"
                        sceneStyle={styles.feedSceneStyle}
                        component={FeedLayout} title="Profile"
                        navigationBarStyle={styles.navStyle}
                        titleStyle={styles.titleStyle}
                        leftButtonTextStyle={styles.titleStyle}
                        rightButtonTextStyle={styles.titleStyle}
                      />
                  </Scene>
                 {/* <Scene key="userFeed"
                  icon={TabIcon}
                    sceneStyle={styles.feedSceneStyle}
                    component={FeedLayout} title="User"
                    navigationBarStyle={styles.navStyle}
                    titleStyle={styles.titleStyle}
                    leftButtonTextStyle={styles.titleStyle}
                    rightButtonTextStyle={styles.titleStyle}
                />*/}
                {/*<Scene key="map" component={MapLayout} title="Map"
                icon={TabIcon}
                  navigationBarStyle={styles.mapNavStyle}
                  titleStyle={styles.mapTitleStyle}
                 />*/}
                {/*<Scene key="post" component={MakePostLayout} title="Post"
                icon={TabIcon}
                  backButtonTextStyle={{color: '#1C4E6C'}}
                  navigationBarStyle={styles.navStyle}
                  titleStyle={styles.titleStyle}
                  sceneStyle={styles.feedSceneStyle}
                  leftButtonTextStyle={styles.titleStyle}
                  rightButtonTextStyle={styles.titleStyle}
                />*/}

                {/*<Scene key="showPost" component={PostLayout} title="Post"
                icon={TabIcon}
                  navigationBarStyle={styles.navStyle}
                  titleStyle={styles.titleStyle}
                  sceneStyle={styles.feedSceneStyle}
                  leftButtonTextStyle={styles.titleStyle}
                  rightButtonTextStyle={styles.titleStyle}
                />*/}
              </Scene>
               <Scene key="map" component={MapLayout} title="Map"
                  navigationBarStyle={styles.mapNavStyle}
                  titleStyle={styles.mapTitleStyle}
                />
              <Scene key="post" component={MakePostLayout} title="Post"
                  backButtonTextStyle={{color: '#1C4E6C'}}
                  navigationBarStyle={styles.navStyle}
                  titleStyle={styles.titleStyle}
                  sceneStyle={styles.feedSceneStyle}
                  leftButtonTextStyle={styles.titleStyle}
                  rightButtonTextStyle={styles.titleStyle}
              />
              <Scene key="showPost" component={PostLayout} title="Post"
                icon={TabIcon}
                  navigationBarStyle={styles.navStyle}
                  titleStyle={styles.titleStyle}
                  sceneStyle={styles.feedSceneStyle}
                  leftButtonTextStyle={styles.titleStyle}
                  rightButtonTextStyle={styles.titleStyle}
                />
                <Scene key="userFeed"
                    sceneStyle={styles.feedSceneStyle}
                    component={FeedLayout} title="User"
                    navigationBarStyle={styles.navStyle}
                    titleStyle={styles.titleStyle}
                    leftButtonTextStyle={styles.titleStyle}
                    rightButtonTextStyle={styles.titleStyle}
                />
                {/*<Scene key="feed_single"
                    sceneStyle={styles.feedSceneStyle}

                    component={FeedLayout} title="Feed" rightTitle="Post"
                    onRight={()=> Actions.post()}
                    leftTitle="Map" onLeft={ () => Actions.map({all: true,})}
                    navigationBarStyle={styles.navStyle}
                    titleStyle={styles.titleStyle}
                    leftButtonTextStyle={styles.titleStyle}
                    rightButtonTextStyle={styles.titleStyle}
                />
                <Scene key="userFeed"
                    sceneStyle={styles.feedSceneStyle}
                    component={FeedLayout} title="User"
                    navigationBarStyle={styles.navStyle}
                    titleStyle={styles.titleStyle}
                    leftButtonTextStyle={styles.titleStyle}
                    rightButtonTextStyle={styles.titleStyle}
                />
                <Scene key="map" component={MapLayout} title="Map"
                  navigationBarStyle={styles.mapNavStyle}
                  titleStyle={styles.mapTitleStyle}
                 />
                <Scene key="post" component={MakePostLayout} title="Post"
                  backButtonTextStyle={{color: '#1C4E6C'}}
                  navigationBarStyle={styles.navStyle}
                  titleStyle={styles.titleStyle}
                  sceneStyle={styles.feedSceneStyle}
                  leftButtonTextStyle={styles.titleStyle}
                  rightButtonTextStyle={styles.titleStyle}
                />

                <Scene key="showPost" component={PostLayout} title="Post"
                  navigationBarStyle={styles.navStyle}
                  titleStyle={styles.titleStyle}
                  sceneStyle={styles.feedSceneStyle}
                  leftButtonTextStyle={styles.titleStyle}
                  rightButtonTextStyle={styles.titleStyle}
                />*/}
            </Scene>
          </RouterWithRedux>
        );
    }
}

// Add inUserActions here
function mapStateToProps(state) {
  const { user, } = state;

  return {
    user,
  }
}

export default connect(mapStateToProps, null)(Routes);
