'use strict';
import React from 'react';
import { ListView, ActivityIndicatorIOS, TouchableOpacity, AlertIOS,  View, Text, } from 'react-native';

import {REFRESHING_FEED, NEXT_URL_FEED, NORMAL_FEED,NEXT_URL_USER,NORMAL_USER_FEED,} from '../../core/constants/ApiConstants';
import PostComponent from '../Post/PostComponent';
import {Actions} from 'react-native-router-flux'
import _ from 'lodash'
// import { AdMobBanner } from 'react-native-admob'

class FeedLayoutComponent extends React.Component {
  static PropTypes = {
    feedType: React.PropTypes.string,
    userId: React.PropTypes.string,
  };


  constructor(props){
      super(props)
      const {filter,} = this.props;

      this.state = {
        postComponents: [],
        isRefreshing: false,
        isTopToastVisible: true,
        shouldPrepend:false,
        hasRefreshedAlready: false,
        // Determines what feed actions to run
        next: '',
        normal: '',
        hasBeenAlerted: false, // Will be taken out when notification store implemented properly
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      }
  }

  // Move to parent
  componentDidUpdate(prevProps){
    const {filter, feed, FeedActions, user, routes,} = this.props;
    console.log(prevProps);
    console.log(this.props);
    var isEq = _.isEqual(prevProps, this.props);

    if (filter.chosenIds != prevProps.filter.chosenIds && !isEq) {
      if (this.props.feedType == 'home')  {
        if (filter.isGeo) {
          this._grabCoords();
          return;
        }
      }

      // Reset listview datasource
      this.setState ({
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        hasRefreshedAlready: !this.state.hasRefreshedAlready,
      });
      this._fetchFeed(this.state.normal);
    }
  }

  // Move to parent
  _fetchFeed (fetchType){
    const {FeedActions} = this.props;
    FeedActions.fetchFeed(fetchType);
  }

  // Move to parent
  componentWillMount() {
    const {FeedActions} = this.props;
    let normal;
    let next;
    if (this.props.feedType == 'home') {
      normal = NORMAL_FEED;
      next = NEXT_URL_FEED;
    } else {
      normal = NORMAL_USER_FEED;
      next = NEXT_URL_USER;

      // Grab posts from this userID ->
      FeedActions.setUserId (this.props.userId);
    }


    this.setState({
      normal: normal,
      next: next,
    });

    this._fetchFeed(normal);
  }

  // Move to parent
   _grabCoords (){
      console.log("\n\nIs finding location");
       navigator.geolocation.getCurrentPosition(
        (position) => {
          // Grab coords and parse to action
          const {coords} = position;
          const {longitude, latitude,} = coords;

          this.props.FilterActions.setCoords(longitude, latitude);
          this._fetchFeed('GEO_FEED');
        },
        (error) => alert(error.message, "Make sure you've enabled locations for our app in setting"),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
  }


  // Keep here
  componentWillReceiveProps (nextProps){
    if (this.props.feedType == 'user'){
      if (nextProps.feed.userPosts != this.props.feed.userPosts && nextProps.feed.userPosts ) {
        console.log("About to render user posts, length: ", nextProps.feed.userPosts.length)

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.feed.userPosts),
        });
      }
    } else {
      if (nextProps.feed.posts != this.props.feed.posts && nextProps.feed.posts ) {
        console.log("Number of posts about to be rendered: ", nextProps.feed.posts.length)

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.feed.posts),
        });
      }
    }

  }

  // Render listview rows
  _renderData (post) {
      const user = post.user ? post.user : post;

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

        <PostComponent
              layout={this.props.feedType == 'home' ? 'feed' : 'user_feed'}
              region={region}
              annotations={annotations}
              post={ post }
              PostActions={this.props.PostActions}
              // {...this.props.PostActions} // Trigger actions in component ->
              userId={this.props.user.userId}


              onLikePress={() => this.props.PostActions.likePost(post.postId) }

              onPress={()=> {
                // TODO, fix the below passing down of funcions...
                Actions.showPost({
                  post: post, title: user.name,
                  onMapPress: () => this._showMap (region, annotations) ,
                  onLikePress: () => this._likePost(post.postId)
                })
              }}
              onMapPress={() => this._showMap (region, annotations)} key={ "post_"+post.postId }
        />

      );
    }

  // Open map layout
  _showMap (region, annotations) {
    // Actions.showMap({region:region, annotations: annotations});
    Actions.map();
  }

  _likePost (postId) {
    this.props.PostActions.likePost(post.postId);
  }


  // Find posts AFTER latestId of last fetch
  _onRefresh (){
    this.setState({isRefreshing: true, shouldPrepend: true});
    this._fetchFeed(REFRESHING_FEED);
    this.setState({isRefreshing: false,});
  }

  hideTopToast() {
    this.setState({isTopToastVisible: false});
  }

  render() {
    const lengthOfPosts = this.props.feed.posts ? this.props.feed.posts.length : this.props.feed.userPosts.length;
    // If there are no posts & no component rendered then show indicator
    if(!this.state.dataSource){
      return <ActivityIndicatorIOS
        style={{alignItems: 'center', justifyContent: 'center',height: 80}}
        size="large"/>;
    }


    return (
          <ListView
            pageSize={10}
            dataSource={this.state.dataSource}
            renderRow={this._renderData.bind(this)}
            onEndReached={this.renderNewRows.bind(this)}
            enableEmptySections={true}
        />
      );
  }

  // Find the next 10 posts onEndReached
  renderNewRows () {
    this._fetchFeed(this.state.next);
  }
};



export default FeedLayoutComponent;



// 'use strict';

// import React, { Component,ListView,View, ActivityIndicatorIOS, TouchableOpacity, AlertIOS, Text,} from 'react-native';

// import {REFRESHING_FEED, NEXT_URL_FEED, NORMAL_FEED,NEXT_URL_USER,NORMAL_USER_FEED,} from '../../core/constants/ApiConstants';
// import PostComponent from '../Post/PostComponent';
// import {Actions} from 'react-native-router-flux'
// import _ from 'lodash'
// // import { AdMobBanner } from 'react-native-admob'

// class FeedLayoutComponent extends React.Component {
//   static PropTypes = {
//     feedType: React.PropTypes.string,
//     userId: React.PropTypes.string,
//   };


//   constructor(props){
//       super(props)
//       const {filter,} = this.props;

//       this.state = {
//         postComponents: [],
//         isRefreshing: false,
//         isTopToastVisible: true,
//         shouldPrepend:false,
//         hasRefreshedAlready: false,
//         // Determines what feed actions to run
//         next: '',
//         normal: '',
//         hasBeenAlerted: false, // Will be taken out when notification store implemented properly
//         dataSource: new ListView.DataSource({
//           rowHasChanged: (row1, row2) => row1 !== row2,
//         }),
//       }
//   }

//   // Move to parent
//   componentDidUpdate(prevProps){
//     // const {filter, feed, FeedActions, user, routes,} = this.props;
//     // // console.log(prevProps);
//     // // console.log(this.props);
//     // var isEq = _.isEqual(prevProps, this.props);
//     // console.log(isEq, "is equal")

//     // console.log (filter.chosenIds);
//     // console.log (prevProps.filter.chosenIds);
//     // if (filter.chosenIds != prevProps.filter.chosenIds && !isEq) {
//     //   console.log ("\n\nHas changed route && filter");
//     //   if (this.props.feedType == 'home')  {
//     //     if (filter.isGeo) {
//     //       this._grabCoords();
//     //       return;
//     //     }
//     //   }

//     //   // Reset listview datasource
//     //   this.setState ({
//     //     dataSource: new ListView.DataSource({
//     //       rowHasChanged: (row1, row2) => row1 !== row2,
//     //     }),
//     //     hasRefreshedAlready: !this.state.hasRefreshedAlready,
//     //   });
//     //   console.info ("Inside didupdate about to fetch")
//     //   this._fetchFeed(this.state.normal);
//     // }
//     console.log("Has changed inside willupdate")
//   }

//   // // Move to parent
//   // _fetchFeed (fetchType){
//   //   const {FeedActions} = this.props;
//   //   FeedActions.fetchFeed(fetchType);
//   // }

//   // Move to parent
//   componentWillMount() {
//     // const {FeedActions} = this.props;
//     // let normal;
//     // let next;
//     // if (this.props.feedType == 'home') {
//     //   normal = NORMAL_FEED;
//     //   next = NEXT_URL_FEED;
//     // } else {
//     //   normal = NORMAL_USER_FEED;
//     //   next = NEXT_URL_USER;

//     //   // Grab posts from this userID ->
//     //   FeedActions.setUserId (this.props.userId);
//     // }


//     // this.setState({
//     //   normal: normal,
//     //   next: next,
//     // });

//     console.log ("\nInside willmount feedcomponent");
//     // this._fetchFeed(normal);
//   }

//   // // Move to parent
//   //  _grabCoords (){
//   //     console.log("\n\nIs finding location");
//   //      navigator.geolocation.getCurrentPosition(
//   //       (position) => {
//   //         // Grab coords and parse to action
//   //         const {coords} = position;
//   //         const {longitude, latitude,} = coords;

//   //         this.props.FilterActions.setCoords(longitude, latitude);
//   //         this._fetchFeed('GEO_FEED');
//   //       },
//   //       (error) => alert(error.message, "Make sure you've enabled locations for our app in setting"),
//   //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//   //     );
//   // }


//   // Keep here
//   componentWillReceiveProps (nextProps){
//     console.log("Has changed props");

//      this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(nextProps.feed.posts),
//       });
//     // if (this.props.feedType == 'user'){
//     //   if (nextProps.feed.userPosts != this.props.feed.userPosts && nextProps.feed.userPosts ) {
//     //     console.log("About to render user posts, length: ", nextProps.feed.userPosts.length)

//     //     this.setState({
//     //       dataSource: this.state.dataSource.cloneWithRows(nextProps.feed.userPosts),
//     //     });
//     //   }
//     // } else {
//     //   if (nextProps.feed.posts != this.props.feed.posts && nextProps.feed.posts ) {
//     //     console.log("Number of posts about to be rendered: ", nextProps.feed.posts.length)

//     //     this.setState({
//     //       dataSource: this.state.dataSource.cloneWithRows(nextProps.feed.posts),
//     //     });
//     //   }
//     // }

//   }

//   // Render listview rows
//   _renderData (post) {
//       const user = post.user ? post.user : post;

//       // Setup routes to parse down to postcomponent
//       const annotations = [{
//         longitude: post.longitude,
//         latitude: post.latitude,
//         title: user.name,
//         subtitle: post.description,
//         // image: config.apiImageUrl + post.photo,
//       }];
//       const region = {
//         longitude: post.longitude,
//         latitude: post.latitude,
//         latitudeDelta: 0.3,
//         longitudeDelta: 0.3,
//       };

//       return (

//         <PostComponent
//               layout={this.props.feedType == 'home' ? 'feed' : 'user_feed'}
//               region={region}
//               annotations={annotations}
//               post={ post }
//               PostActions={this.props.PostActions}
//               // {...this.props.PostActions} // Trigger actions in component ->
//               userId={this.props.user.userId}


//               onLikePress={() => this.props.PostActions.likePost(post.postId) }

//               onPress={()=> {
//                 // TODO, fix the below passing down of funcions...
//                 Actions.showPost({
//                   post: post, title: user.name,
//                   onMapPress: () => this._showMap (region, annotations) ,
//                   onLikePress: () => this._likePost(post.postId)
//                 })
//               }}
//               onMapPress={() => this._showMap (region, annotations)} key={ "post_"+post.postId }
//         />

//       );
//     }

//   // Open map layout
//   _showMap (region, annotations) {
//     // Actions.showMap({region:region, annotations: annotations});
//     Actions.map();
//   }

//   _likePost (postId) {
//     this.props.PostActions.likePost(post.postId);
//   }


//   // Find posts AFTER latestId of last fetch
//   _onRefresh (){
//     this.setState({isRefreshing: true, shouldPrepend: true});
//     // this._fetchFeed(REFRESHING_FEED);
//     this.setState({isRefreshing: false,});
//   }

//   hideTopToast() {
//     this.setState({isTopToastVisible: false});
//   }

//   render() {
//     const lengthOfPosts = this.props.feed.posts ? this.props.feed.posts.length : this.props.feed.userPosts.length;
//     // If there are no posts & no component rendered then show indicator
//     if(!this.state.dataSource){
//       return <ActivityIndicatorIOS
//         style={{alignItems: 'center', justifyContent: 'center',height: 80}}
//         size="large"/>;
//     }


//     return (
//           <ListView
//             pageSize={10}
//             dataSource={this.state.dataSource}
//             renderRow={this._renderData.bind(this)}
//             onEndReached={this.renderNewRows.bind(this)}
//         />
//       );
//   }

//   // Find the next 10 posts onEndReached
//   renderNewRows () {
//     const {_fetchFeed, } = this.props;
//     console.log ("Inside rendernewrows - nexturl")
//     _fetchFeed();
//   }
// };



// export default FeedLayoutComponent;
