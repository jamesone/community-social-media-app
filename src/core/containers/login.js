import {StyleSheet,} from 'react-native';

const mainStyles = {
  color: {
    main: "#F6F7F8",
    secondary: ""
  }
};

var styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    // width: 2000,
  },
  spinnerStyle: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introWrapper: {
    flex: 1,
    padding: 20
  }
});

export default styles;
