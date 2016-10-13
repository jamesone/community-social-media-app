'use strict';
// import React, { Component, View, Text, TouchableOpacity, } from 'react-native';
import React from 'react';
import { TouchableOpacity, View, Text,} from 'react-native';
import styles from './styles';
var Icon = require('react-native-vector-icons/MaterialIcons');


class SliderComponent extends React.Component {
  static displayName = 'SliderComponent';
  static propTypes = {
    onPress: React.PropTypes.func,
    isChecked: React.PropTypes.bool,
  };

  constructor (props) {
    super (props);
    this.state = {
      isChecked: this.props.isChecked,
    }
  }

  render() {
    const {_onPress, id, label,} = this.props;
    console.log ("IS CHANGING, ", this.props.idArray)
    return (
      <View style={[styles.sliderOptionWrapper]}>
        <TouchableOpacity
          onPress={ () => {
            this.setState({
              isChecked: !this.state.isChecked,
            });
            _onPress ({id: id, label: label}); // Pass ID and label back up to parent
          }}
        >

          <View style={[
            styles.sliderCircle,
            this.state.isChecked ? styles.checked : null,
             ]}>
            {/*<Icon name={this.state.isChecked ? 'close' : 'check'} size={25} style={[styles.tick, this.state.isChecked ? styles.tickChecked : null]}  />*/}
            <Icon name={this.state.isChecked ? 'star' : 'star-border'} size={25} style={[styles.tick, this.state.isChecked ? styles.tickChecked : null]}  />
            {/*<Icon name={this.state.isChecked ? 'check-box' : 'check-box-outline-blank'} size={25} style={[styles.tick, this.state.isChecked ? styles.tickChecked : null]}  />*/}
          </View>

          <Text style={{textAlign: 'center'}}> {label.replace(' ', '\n')} </Text>

        </TouchableOpacity>
      </View>
    );
  }
};


export default SliderComponent;
