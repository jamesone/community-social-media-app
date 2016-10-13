import {StyleSheet,} from 'react-native';
import {featureLightGrey,} from '@components/StyleConstants';

const mainStyles = {
  color: {
    main: "#F6F7F8",
    secondary: ""
  }
};

var feedstyles = StyleSheet.create({
  menuContainer: {
    flex: 0,
    // height: 100,
    // width: 2000,
  },
  feedMenuWrapper: {
    backgroundColor: featureLightGrey,
  }
});

export default feedstyles;
