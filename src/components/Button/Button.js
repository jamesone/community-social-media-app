import styles from './styles';
import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
// import React, {Text, Component,View, TouchableOpacity, } from 'react-native'

var Icon = require('react-native-vector-icons/MaterialIcons');

class LikeBar extends React.Component {
  static displayName = 'PostComponent';
  static propTypes = {
    'buttonLength': React.PropTypes.string,
    'color': React.PropTypes.string, // hex or rgba
    '_onPress': React.PropTypes.func,
    'label': React.PropTypes.string,
    marginTop: React.PropTypes.number,
    marginBottom: React.PropTypes.number,
    marginLeft: React.PropTypes.number,
    marginRight: React.PropTypes.number,
    borderBottom: React.PropTypes.string,
    borderTopWidth: React.PropTypes.number,
    borderTopColor: React.PropTypes.string,
    iconType: React.PropTypes.string,
    showLabel: React.PropTypes.bool,
  };
  static defaultProps = {
    'buttonLength': 'full',
    'color': '#fff', // hex or rgba
    '_onPress': null,
    'label': 'submit',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: '#fff',
    borderTopWidth: 0,
    borderTopColor: '#fff',
    iconType: null,
    showLabel: true,
  }

  render () {
    const {_onPress, label, color,
              borderColor, marginTop,
              marginBottom, marginRight,
              borderTopWidth, borderTopColor,
          marginLeft,} = this.props;

    return (
    <View>
      <View style={[styles.buttonWrapper],
          {
            backgroundColor: color,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
            marginRight: marginRight,
            borderTopWidth: borderTopWidth,
            borderTopColor: borderTopColor,
          }
      }>
        <TouchableOpacity
          onPress={ () => _onPress()}>

          <Text style={[styles.text],
            {fontSize: 16, padding: 10, textAlign: 'center',fontWeight: '500'
          }}>
            {(this.props.iconType != null && !this.props.showLabel) &&
                <Icon name={this.props.iconType} size={20} style={{textAlign: 'left', alignSelf: 'flex-start'}} />
            }
            {(this.props.showLabel) &&
                label
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

export default LikeBar;
