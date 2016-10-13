import styles from './styles';
import React from 'react';
import { TouchableOpacity,View, Text,} from 'react-native';
var Icon = require('react-native-vector-icons/MaterialIcons');

class LikeBar extends React.Component {
  static displayName = 'PostComponent';

  render () {
    const {props} = this;
    const {numLikes, no_comments, hasLiked,} = props;

    return (
      <View style={styles.likebar}>
        {
          (numLikes != null) &&
          <TouchableOpacity onPress={ () => props._likePost()}>
          <Icon name={hasLiked ? 'favorite' : 'favorite-border'} size={23} style={[styles.likeBarText, hasLiked ? styles.postLiked : styles.iconColor]} />
          </TouchableOpacity>
        }
          <Text style={[styles.likeBarText, props.hasLiked ? styles.postLiked : styles.iconColor]}>{numLikes}</Text>
        {
          (props.layout == 'feed') &&
              <Icon name="comment" size={25} style={[styles.likeBarText, styles.iconColor]}  />
        }
        {
          (props.layout != 'feed') &&
            <Icon name="comment" size={25} style={[styles.likeBarText, styles.iconColor]}  />
        }
        <Text style={[styles.likeBarText, styles.iconColor]}>{no_comments}</Text>

      </View>
    )
  }
}

export default LikeBar;
