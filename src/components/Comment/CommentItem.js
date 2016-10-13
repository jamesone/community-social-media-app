import styles from './itemstyles';
import React from 'react';
import { TouchableOpacity, Image, View, Text, } from 'react-native';

import SliderComponent from '@components/Slider/SliderComponent'
import Button from '@components/Button/Button'
import {cloudfront} from '../../config';
import {timeDifference} from '@core/utils/dates';

class CommentItem extends React.Component {
  static displayName = 'FilterMenuComponent';
  static propTypes = {
    'comment': React.PropTypes.object,

  };
  static defaultProps = {
    'comment': {}
  };

  componentWillMount () {

  }

  render () {
    // #TODO - Fixup this
    const {comment,} = this.props;
    const {user, createdAt} = comment;
    const {name, profilePic,} = user;
    const postedOn = timeDifference(new Date(createdAt), new Date());

    return (
      <View style={styles.container}>
          <Image
            style={styles.profilePic}
            source={{uri: profilePic}} />
          <View style={styles.header}>
              <Text>{name}</Text>
              <Text style={styles.postedOn}>{postedOn}</Text>
            <Text>{"\n"}{comment.comment}</Text>

          </View>

      </View>
    )
  }
}

export default CommentItem;
