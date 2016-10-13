import { StyleSheet } from 'react-native';
import {featureRed, featureGrey, borderColor,} from '../StyleConstants';


var styles=  StyleSheet.create({
  spinnerStyle: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seperator: {
    flex: 1,
    backgroundColor: borderColor,
    height: 7,
  }
});

export default styles;
