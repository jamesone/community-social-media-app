'use strict'
import React from 'react';
import { Alert, TextInput, View, } from 'react-native';
// import React, {Alert, Component, View, TextInput,} from 'react-native';

import * as PostActions from '../redux/actions/PostActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoogleAutoComplete from '@components/GoogleAutoComplete/GoogleAutoComplete';
import Button from '@components/Button/Button';
import ImagePicker from '@components/ImagePicker/ImagePicker';
import styles from './styles'
import {Actions,} from 'react-native-router-flux'
import SliderComponent from '@components/Slider/SliderComponent';
import {featureButtonGrey, featureLightGrey,} from '@components/StyleConstants';

class MakePostLayout extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      googleLocation: null,
      description: null,
      postTypeLabel: 'Post Type: *',
      imagePickerLabel: 'Choose Image',
      photo: null,
      data: [],
      postTypeId: null,
      postType: null,
    }
  }

  componentWillMount () {
    const {category,} = this.props;

    const data = category.categories.map ( (cat) => {
      return {
        id: cat.typeId,
        label: cat.name,
      }
    });
    this.setState ({data: data});
  }

  _alertMessage(title, message) {
    Alert.alert(
        title,
        message,
        [
          {text: 'OK'},
        ]
    )
  }

  _validatePostData () {
    const {googleLocation, description, postType,} = this.state;
    let msg = "";
    let title = "";
    if (googleLocation == null) {
      title = 'You must choose location!';
      msg = `If your post isn\'t location specific, choose any area.
Your post will show up on our map display, so try and make it accurate!`;
    } else if (description == null) {
      title = "Enter a description!";
      msg = "Try put in as much detail as possible";
    } else if (postType == null) {
      title = "You must choose a post type!";
      msg = "E.g if your post is about a traffic jam, choose the Traffic Jam post type";
    } else {
      return true;
    }

    this._alertMessage (title, msg);
    return false;
  }

  _submitPost (){
    const {description, googleLocation, photo, postType,} = this.state;
    const {PostActions,} = this.props;
    if (!this._validatePostData()) {
      return;
    }


    const data = {
      address: googleLocation.address,
      longitude: googleLocation.longitude,
      latitude: googleLocation.latitude,
      description: description,
      photo: photo,
      postType: postType.id, //Temp until posttype slider
    };

    PostActions.sendPost(data);
    Actions.pop({shouldRefresh: true,});

  }
  setSliderId (data) {
    this.setState ({postType: data, postTypeLabel: data.label, postTypeId: data.id, });
  }

  render() {
    const {description, category, postType, } = this.props
    const {postTypeLabel, imagePickerLabel, data,} = this.state;

    return (
        <View>
          <View>
            <GoogleAutoComplete
              _onAutoCompleteChange={ (location) => this.setState ({ googleLocation: location })}
              backgroundColor={featureLightGrey}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter a post description"
            placeholderTextColor="grey"
            onChangeText={
              (text) => this.setState({description: text})
            }
            multiline={true}
            value={description} />

            <View style={{flex: 1, flexDirection: 'row',}}>
            <View style={{flex: 1,alignItems: 'stretch',}}>
              <ImagePicker
              _triggerImagePicker={(src) => {
                this.setState({
                  photo: src,
                  imagePickerLabel: 'Change Image'
                })
              }}
              label={imagePickerLabel}
              marginTop={0}
              color={featureLightGrey}
              />
            </View>
              <Button label={postTypeLabel}
                color={featureButtonGrey}
                marginTop={0}
                _onPress={ () => console.log ("\n\nPressed")}
              />
            </View>
            <SliderComponent
              data={data}
              isSingle={false}
              idArray={[this.state.postTypeId]}
              _onPress={ (id) => this.setSliderId(id) }
              />
            <Button label="Post"
                color={featureButtonGrey}
                _onPress={ () => this._submitPost(this) }
            />
        </View>
    );
  }
};


// Redux stuff below (all of this will be parsed down to feedcomponent):
function mapStateToProps(state) {
  const { feed, filter, category, user, /*notifications*/ } = state;

  return {
    feed,
    filter,
    category,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PostActions: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakePostLayout);
