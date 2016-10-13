import { StyleSheet } from 'react-native';
import {featureRed, featureGrey, borderColor,} from '../StyleConstants';


var styles=  StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
  },
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  postedOn: {
    right: 0,
    top: 0,
    position: 'absolute'
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
   profilePic: {
    height: 30,
    width: 30,
    left: 0,
    borderRadius: 10,
    backgroundColor: '#ffd'
  },

});

export default styles;
