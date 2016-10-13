import {StyleSheet,} from 'react-native';

const mainStyles = {
  color: {
    main: "#F6F7F8",
    secondary: ""
  }
};

var styles = StyleSheet.create({
  slidePickerContainer: {
    flex: 1,
    margin: 5,
  },
  disabled: {
    color: 'rgba(255,255,255,0.2)'
  },
  sliderCircle: {
    padding: 5,
    alignItems: 'center'
  },

  sliderOptionWrapper: {
    alignItems: 'center',
    margin: 5,
  },

  checked: {
    // backgroundColor: 'green',
  },
  tick: {
    color: 'grey'
  },
  tickChecked: {
    color: '#1C4E6C',
  }
});

export default styles;
