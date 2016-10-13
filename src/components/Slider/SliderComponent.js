'use strict';
// import React, { Component,View, Text, StyleSheet,ListView, } from 'react-native';
import React from 'react';
import { ListView, StyleSheet,View, Text,} from 'react-native';
import SliderItem from './SliderItem';
import styles from './styles';

class SliderComponent extends React.Component {
  static displayName = 'FilterPicker';
  static propTypes = {
    idArray: React.PropTypes.array, // Array of objects [{label: 'name', id: 3}]
    isSingle: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
  };
  static defaultProps = {
    idArray: [], // Array of objects [{label: 'name', id: 3}]
    isSingle: false,
    isDisabled: false,
  };

  constructor(props){
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      }
  }

  componentWillMount () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.data),
    });
  }

  // Render listview rows
  _renderData (data) {
    const {id, label,} = data;
    let idAlreadyExists;
    if (!this.props.isSingle){
      idAlreadyExists = this.props.idArray.indexOf(id) > -1;
    }
    else{
      idAlreadyExists = this.props.isChecked
    }
    console.log (idAlreadyExists, "<~~ Exists");

      // CHECK FOR ISCHECKED BY CHECKING FILTERIDS IN FILTER REDUCER LIKE DOING IN OTHER
      return (
         <SliderItem _onPress={ (data) => {
            if (this.props.isDisabled) return;
            this.props._onPress(data)
            // if (idArray.length > 0) {
            //   idArray = [];
            //   idArray.push(data.id);
            // }
          }}
          id={id} label={label} isChecked={idAlreadyExists ? true : false}
          // isDisabled={this.props.isDisabled}
          />
      );
  }

  render() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderData.bind(this)}
          horizontal={true}
          style={styles.slidePickerContainer}
      />
    );
  }
};







export default SliderComponent;
