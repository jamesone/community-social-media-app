// import styles from './styles';
// import React, {Text, Component,View, TouchableOpacity, } from 'react-native'
import React from 'react';
import { TouchableOpacity, View, Text,} from 'react-native';
import Button from '@components/Button/Button'
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var Icon = require('react-native-vector-icons/MaterialIcons');


class ImagePicker extends React.Component {
  static displayName = 'PostComponent';
  static propTypes = {
    '_triggerImagePicker': React.PropTypes.func,
    'label': React.PropTypes.string,
    'marginTop': React.PropTypes.number,
    'color': React.PropTypes.string,
  };
  static defaultProps = {
    '_triggerImagePicker': null,
    'label': 'Upload Image',
    'marginTop': 5,
    'color': '#E9EAED',
  }

  _openImagePicker (){
     var options = {
      title: 'Select Photo', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      maxWidth: 400, // photos only
      maxHeight: 400, // photos only
      aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.75, // photos only
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };

    UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
      }
      else {
        // Send base64 in API call.
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // Post source back up to parent
        this.props._triggerImagePicker (source);
      }
    });
  }

  render () {
    const {label, marginTop} = this.props;
    const showLabel = this.props.label == 'Change Image' ? true : false;

    return (
      <View>
        <Button _onPress={ () => this._openImagePicker() }
          marginTop={marginTop}
          iconType='add-a-photo'
          showLabel={showLabel}
          color={this.props.color}
          label={label} />
      </View>
    )
  }
}

export default ImagePicker;
