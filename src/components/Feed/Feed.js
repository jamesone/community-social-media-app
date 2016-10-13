import React from 'react';
import { ListView, Platform, ActivityIndicatorIOS,  View, Text,} from 'react-native';

import styles from './styles';
import SliderComponent from '@components/Slider/SliderComponent'
import Button from '@components/Button/Button'
import {Actions,} from 'react-native-router-flux';
import PostComponent from '@components/Post/PostComponent';
import {cloudfront} from '../../config';
import {timeDifference} from '@core/utils/dates';

class Feed extends React.Component {
  static displayName = 'Feed';
  static propTypes = {
    'posts': React.PropTypes.array,
    'PostActions': React.PropTypes.object,
    'user': React.PropTypes.object,

  };
  static defaultProps = {
    'posts': [],
    'PostActions': null,
    'user': {},
  };

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log ("\nRecieved props");
    this.setState ({dataSource: this.state.dataSource.cloneWithRows(nextProps.posts),});
  }

  componentWillMount () {
    console.log ("\nDid mount feed");
    this.setState ({dataSource: this.state.dataSource.cloneWithRows(this.props.posts),});
  }

  render () {
    const {_fetchNextSet, fetchingNew,} = this.props;
    if (this.props.posts.length == 0 || fetchingNew) {
      return (
        <View>
        {(Platform.OS === 'ios') &&
          <ActivityIndicatorIOS
            style={styles.spinnerStyle}
            size="large"
          />
        }
        {(Platform.OS === 'android') &&
          <Text>Loading</Text>
        }
        </View>
      )
    }
    return (
      <ListView
        // pageSize={10}
        dataSource={this.state.dataSource}
        renderRow={this._renderData.bind(this)}
        onEndReached={ () => _fetchNextSet()}
        enableEmptySections={true}
      />
    )
  }

  _renderData (post) {
    const user = post.user ? post.user : post;

      // Setup routes to parse down to postcomponent
      const annotations = [{
        longitude: post.longitude,
        latitude: post.latitude,
        title: user.name,
        description: post.description,
        // image: config.apiImageUrl + post.photo,
      }];
      const region = {
        longitude: post.longitude,
        latitude: post.latitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      };

      return (
      <View>
        <PostComponent
          layout={this.props.feedType == 'home' ? 'feed' : 'user_feed'}
          region={region}
          sceneKey={this.props.sceneKey}
          annotations={annotations}
          post={ post }
          PostActions={this.props.PostActions}
          // {...this.props.PostActions} // Trigger actions in component ->
          userId={this.props.user.userId}


          onLikePress={() => this.props.PostActions.likePost(post.postId) }
          onPress={()=> {
            // TODO, fix the below passing down of funcions...
            /*Actions.showPost({
              post: post, title: user.name,
              onMapPress: () => this._showMap (region, annotations) ,
              onLikePress: () => this._likePost(post.postId)
            })*/
          }}
          //onMapPress={() => this._showMap (region, annotations)} key={ "post_"+post.postId }
          onMapPress={() => Actions.map() } key={ "post_"+post.postId }
        />
        <View style={styles.seperator}></View>
      </View>
      )
  }

  _renderNewRows () {

  }
}

export default Feed;
