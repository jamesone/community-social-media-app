import styles from './styles';
// import React, {Text, Component, Dimensions, View, Image, TouchableOpacity, } from 'react-native'
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View, Text,} from 'react-native';

let {height, width} = Dimensions.get('window');


class ImageC extends React.Component {
  static displayName = 'ImageC';
  static propTypes = {
    'src': React.PropTypes.string,
  };
  static defaultProps = {
   'src': null,
  }

  render () {
    const {src,} = this.props;

    return (
      <View>
       <Image
          // resizeMode='cover',
          style={[styles.image], {width: width, height: height/2}}
          source={{uri: src}} />
      </View>
    )
  }
}

export default ImageC;
