'use strict';
// import React, { Component,View, Text, Image, StyleSheet,TouchableHighlight,TouchableOpacity, } from 'react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Image, View, Text, } from 'react-native';

import {timeDifference}  from '@core/utils/dates';
import * as config from '../../config';
// import * as router from '../../routes';
import {Actions} from 'react-native-router-flux'
// import {stylesheet, featureGrey, featureRed,} from '../styles';
import styles from './styles'
import LikeBar from '../LikeBar/LikeBar'
import ImageC from '@components/Image/Image';
var Icon = require('react-native-vector-icons/MaterialIcons');



class PostComponent extends React.Component {
  static displayName = 'PostComponent';
  static propTypes = {
    'post': React.PropTypes.object,
    'layout': React.PropTypes.string,
    'region': React.PropTypes.object,
    'annotations': React.PropTypes.array,
    'post': React.PropTypes.object,
    'userId': React.PropTypes.number,
    'displayType': React.PropTypes.string,
    // 'onPress': React.PropTypes.func ,
    // 'onMapPress': React.PropTypes.func,
    // 'onLikePress': React.PropTypes.func,
  };

  static defaultProps = {
    'post': {},
    'displayType': 'home',
  };


  constructor(props) {
    super(props)
    let numLikes;
    let hasLiked;
    try {
      numLikes = this.props.post.no_likes ? this.props.post.no_likes : 0;
      hasLiked = this.props.post.user_has_liked > 0 ? true : false;
    } catch (err) {
      numLikes = null;
      hasLiked = false;
    }


    this.state = {
      postLiked: this.props.post.hasLiked ? this.props.post.hasLiked : false,
      numLikes: numLikes,
      hasLiked: hasLiked,
      // CAUSING PRBLEMS WITH GEO ^^
    }

  }

  _handleLikeState () {
    let {numLikes, hasLiked, } = this.state;
    if (!hasLiked) numLikes++;
    else numLikes--;

    this.setState({
      postLiked: !this.state.postLiked,
      hasLiked: !hasLiked,
      numLikes: numLikes,
    });
  }

  _showMap () {
    const {region, annotations,} = this.props;
    const markers = [{
      longitude: region.longitude,
      latitude: region.latitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      title: "Post",
      description: "Descr"
    }];
    // Actions.showMap({region:region, annotations: annotations});
    Actions.map({region: region, annotations: annotations, markers: annotations});
  }

  _likePost () {
    let {numLikes, hasLiked, } = this.state;
    if (!hasLiked) numLikes++;
    else numLikes--;

    this.setState({
      postLiked: !this.state.postLiked,
      hasLiked: !hasLiked,
      numLikes: numLikes,
    });


    const postId = this.props.post.postId;
    this.props.PostActions.likePost(postId);
  }

  render() {
    const {userId, post, displayType, sceneKey,} = this.props;
    const {numLikes, hasLiked,} = this.state;
    // const {description, photo, location_address as location, distance, createdAt, postId, user,} = post;
    const {no_comments,} = post;

    const user = post.user ? post.user : post; // If user is merges with post then just use post
    const description = post.description;

    const poster = user.name;
    const distance = post.distance ? post.distance.toFixed(2) : false;
    const photo = post.photo;
    const location = post.location_address;
    const postedOn = timeDifference(new Date(post.createdAt), new Date());
    const postId = post.postId;
    const apiImageUrl = config.cloudfront;
    const profilePic = user.profilePic;
    const coverPic = user.coverPic;
    const photoUrl = apiImageUrl + photo;


    return (
      <View style={styles.wrapper}>
       <View style={styles.header}>
          <TouchableOpacity
            onPress={ () => {
              // Open user layout
              // Actions.feed({feedType: "user", feedUser: user});
              if (sceneKey == 'feed')
                Actions.userFeed({feedType: "user", feedUser: user, title: user.name});
            }}
          >
            <Image
               style={styles.profilePic}
               source={{uri: profilePic}}
            />
          </TouchableOpacity>
             <Text style={styles.postedOn}>{ postedOn }</Text>
             <View style={styles.headerData}>
                <Text>{ poster }</Text>
                <TouchableOpacity onPress={this._showMap.bind(this)}>
                   {
                      (distance) &&
                        <Text style={{fontSize: 12}}>{ distance }km away</Text>
                    }
                  <Text numberOfLines={1} style={{fontSize: 12, flex: 1, flexDirection: 'row'}}>
                    <Icon name="gps-fixed" size={25} style={{top: 0}} style={styles.iconDefault}  /><Text>{ location }</Text>
                  </Text>

                </TouchableOpacity>
            </View>
          </View>
      <View style={styles.container}>

        <View style={styles.body}>
          <Text style={styles.description}>{ description }</Text>
        </View>
      </View>
      {
          (photo != "") &&
          <View style={styles.imageContainer}>
            { (displayType == 'home') &&
              <TouchableOpacity
              onPress={ () => {
                Actions.showPost({...this.props});
              }}>
              <ImageC src={photoUrl} />
              </TouchableOpacity>
            }
            { (displayType == 'single') &&
              <ImageC src={photoUrl} />
            }
          </View>

        }

       { (displayType == 'home') &&
            <TouchableOpacity
            onPress={ () => {
              Actions.showPost({type: 'push', ...this.props});
            }}>
        <LikeBar _likePost={this._likePost.bind(this)} hasLiked={this.state.hasLiked}
                        numLikes={numLikes} no_comments={no_comments} />
            </TouchableOpacity>}
      </View>
    )
  }
};

export default PostComponent;
