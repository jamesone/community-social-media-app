import { StyleSheet } from 'react-native';
import {featureLightGrey,} from '@components/StyleConstants';
export const navyBlue = '#1C4E6C';
const featureWhite = '#FEFEFE';


var styles=  StyleSheet.create({
  navStyle: {
    // backgroundColor: navyBlue,
    // backgroundColor: featureWhite,
    backgroundColor: featureLightGrey,
    borderBottomWidth: 0,
  },
  mapNavStyle: {
    // backgroundColor: 'rgba(28, 78, 108, 0.4)',
    backgroundColor: 'rgba(255,255,255, 0.4)',
    borderBottomWidth: 0,
  },
  mapTitleStyle: {
    color: navyBlue,
  },
  tabbarStyle: {
    backgroundColor: featureLightGrey,
    height: 40,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopColor: featureLightGrey,
    overflow: 'hidden',
    // flex: 1,
  },
  titleStyle: {
    // color:'#FEFEFE',
    color: navyBlue,

  },
  iconWrapper: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    // marginTop: -10,
    // marginBottom: 5,
    // position: 'absolute'

  },
  feedSceneStyle: {
    backgroundColor: featureWhite,
    top: 64,
    flex: 1,
  }
});

export default styles;
