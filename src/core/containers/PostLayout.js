'use strict'
import React from 'react';
import { Alert, ScrollView, View, Text, TextInput, } from 'react-native';
// import React, {Alert, Text, Component, View, TextInput, ScrollView,} from 'react-native';

import * as PostActions from '../redux/actions/PostActions';
import * as CommentActions from '../redux/actions/CommentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@components/Button/Button';
import PostComponent from '@components/Post/PostComponent';
import styles from './styles';
import poststyles from './post';
import {Actions,} from 'react-native-router-flux'
import CommentListView from '@components/Comment/CommentListView';
import {backgroundGrey, featureGrey,} from '@components/StyleConstants';

class MakePostLayout extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showCommentBox: false,
      comment: '',
    }
  }

  componentWillMount () {
    const {CommentActions, post,} = this.props;
    CommentActions.fetchComments ('NORMAL', post.postId);
  }

  componentWillUnmount () {
    const {CommentActions,} = this.props;
    CommentActions.clearComments();
    clearInterval(this.state.timer);
  }

  handleTimerCall(){
    const {comment, CommentActions, post} = this.props;
    const {nextCommentUrl,} = comment;
    const isNext = nextCommentUrl ? 'NEXT_URL' : 'NORMAL';

    // console.log(nextCommentUrl);
    CommentActions.fetchComments(isNext, post.postId) //#TODO NOT WORKING, I THINK COS IT"S ONLY USING THE INITIAL NEXTCOMMENTURL
  }

  componentDidMount() {
    // Start the timer which will fetch comments every 5 sec
    this.state.timer = setInterval(this.handleTimerCall.bind(this), 5000);
  }

  _resetForm () {
    this.setState ({
      showCommentBox: false,
      comment: '',
    })
  }
  _cancelComment () {

    this._resetForm();
  }
  _submitComment () {
    const {CommentActions, post,} = this.props;
    const {comment,} = this.state;
    if (comment == '') {
      Alert.alert(
        'Please enter a comment',
        'You must enter a comment before submitting it!',
        [
          {text: 'OK'},
        ]
      )
      return;
    }
    CommentActions.saveComment (comment, post.postId);
    this._resetForm();

  }

  render() {
    const {post, PostActions, user,} = this.props;
    // Setup routes to parse down to postcomponent
    const annotations = [{
      longitude: post.longitude,
      latitude: post.latitude,
      title: user.name,
      subtitle: post.description,
      // image: config.apiImageUrl + post.photo,
    }];
    const region = {
      longitude: post.longitude,
      latitude: post.latitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };

    return (
      <View style={poststyles.wrapper}>

        { (this.state.showCommentBox) &&
          //#TODO move this into standalone component
          <View style={poststyles.inputWrapper}>
            <TextInput style={poststyles.textInput}
              multiline={true}
              placeholder="Enter a comment"
               onChangeText={(txt) => this.setState({comment: txt}) }
            />
            <View>
              <Button
              marginTop={5}
              marginBottom={0}
              color="#FFF"
              label="Submit"
              _onPress={ () => this._submitComment() }
            />
             <Button
              marginTop={0}
              marginBottom={0}
              color="#FFF"
              borderTopWidth={1}
              borderTopColor={featureGrey}
              label="Cancel"
              _onPress={ () => this._cancelComment() }
            />
            </View>
          </View>
        }
        <ScrollView
          scrollEnabled={!this.state.showCommentBox}
        >
          <PostComponent
            layout={this.props.feedType == 'home' ? 'feed' : 'userFeed'}
            region={region}
            annotations={annotations}
            post={ post }
            displayType="single"
            PostActions={PostActions}
            userId={this.props.user.userId}
            onLikePress={() => PostActions.likePost(post.postId) }
            onPress={()=> {
              // TODO, fix the below passing down of funcions...
              Actions.showPost({
                post: post, title: user.name,
                onMapPress: () => this._showMap (region, annotations) ,
                onLikePress: () => this._likePost(post.postId)
              })
            }}
            onMapPress={() =>  Actions.map(region, annotations) }
            key={ "single_post_"+post.postId }
          />
          <View style={{flex: 1, }}>
            <Button marginTop={0}
              marginBottom={5}
              color={backgroundGrey}
              label="Write Comment"
              _onPress={ () => this.setState({showCommentBox: !this.state.showCommentBox})}
            />
          </View>
          <View style={{flex: 1, paddingBottom: 80}}>
            <CommentListView comments={this.props.comment.comments}/>
          </View>
        </ScrollView>
      </View>
    );
  }
};


function mapStateToProps(state) {
  const { feed, filter, category, user, comment, /*notifications*/ } = state;

  return {
    feed,
    filter,
    category,
    user,
    comment,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PostActions: bindActionCreators(PostActions, dispatch),
    CommentActions: bindActionCreators(CommentActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakePostLayout);
