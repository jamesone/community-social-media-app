import { RECIEVED_FEED,FEED_UP_TO_DATE,NO_MORE_RESULTS, REQUEST_FEED,
      RECIEVED_FEED_PAGING,RECIEVED_FEED_REFRESH, RECIEVED_NEW_FEED,
      FETCHING_NEW,IS_FETCHING_FEED, SET_FILTER, IS_FETCHING,
      SET_NEXTURL,SET_QUERY, RECIEVED_USER_FEED_PAGE, RECIEVED_USER_FEED, SET_USER_ID,} from '../../constants/ActionTypes'

import {URL} from '../../../config';
import {SET_PAGE_TYPE,} from '../actions/FeedActions'
const initialState = {
  'feed': [], // Use to hold posts...
  'posts': [],
  'userPosts': [],
  'userNextUrl': null,
  'nextUrl': null,
  'userRefreshUrl': null,
  'initialUrl': URL,
  'refreshUrl': URL,
  'query': '',
  'fetchingNew': false,
  'isFetching': false,
  'isFetchingFeed': false,
  'feedUpToDate': false,
  'isRefreshing': false,
  'userId': null,
  'feedType': 'home',
};

// 1 = most recent, 2 = nearby, 3 = idk yet...

export default function feed(state = initialState, action) {
  switch (action.type) {

    // When user is initially sending
    case RECIEVED_FEED:
      // console.log(action.posts[0]);
      // const nextUrl = action.nextUrl ? action.nextUrl : state.nextUrl; // Fallback incase something goes wrong..default to current nexturl
      return Object.assign({}, state, {
        posts: action.posts,
        nextUrl: action.nextUrl,
        refreshUrl: action.refreshUrl,
        isFetchingFeed: false,
        fetchingNew: false,
        isRefreshing: false,
        userId: null,
        latestId: action.latestId,
      });


    // When user is paging
    case RECIEVED_FEED_PAGING:
      let posts = state.posts.concat(action.posts);
      // console.log("is paging, ", posts);

      return Object.assign({}, state, {
        posts: posts,
        nextUrl: action.nextUrl,
        isFetchingFeed: false,
        isRefreshing: false,
      });

    // When user is refreshing feed
    case RECIEVED_FEED_REFRESH:
      let post = state.posts.concat(action.posts);
      return Object.assign({}, state, {
        posts: post,
        refreshUrl: action.refreshUrl,
        isFetchingFeed: false,
        latestId: action.latestId,
        isRefreshing: true,
      });

    // Feed is up to date, no more results were found where postId > latestId
    case FEED_UP_TO_DATE:
      return Object.assign({}, state, {
        feedUpToDate: action.upToDate,
      });

    // No more results when paging...No posts were found in the api
    case NO_MORE_RESULTS:
      return Object.assign({}, state, {
        noMorePaging: action.bool,
      });

     // API call is in progress...
    case IS_FETCHING_FEED:
      return Object.assign({}, state, {
        isFetchingFeed: true,
      });

    // // user sstuff below:
    case RECIEVED_USER_FEED_PAGE:
      let userPosts = state.userPosts.concat(action.posts);
      console.log ("INSIDE USER PAGE");
      return {
        ...state,
        userPosts: userPosts,
        userNextUrl: action.nextUrl,
        isFetchingFeed: false,
        isRefreshing: false,
      }

    case RECIEVED_USER_FEED:
      return {
        ...state,
        userPosts: action.posts,
        userNextUrl: action.nextUrl,
        userRefreshUrl: action.refreshUrl,
        isFetchingFeed: false,
        isRefreshing: false,
        fetchingNew: false,
        userLatestId: action.latestId,
      }

    // Will be used to grab * posts from userId
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId,
      }

    case SET_PAGE_TYPE:
      console.log("ABOUT 2 SET FWWD RTPW", action.type)
      return {
        ...state,
        feedType: action.feedType,
      }



    // When user refreshes the feed
    // case RECIEVED_NEW_FEED:
    //   return Object.assign({}, state, {
    //     posts: actions.posts.posts,
    //     refreshUrl: action.refreshUrl,
    //   });

    // Is currently fetching for feed
    // case REQUEST_FEED:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     nextUrl: null,
    //   });


    case SET_QUERY:
      return {
        ...state,
        ...action.query,
      };

    case FETCHING_NEW:
      return {
        ...state,
        fetchingNew: action.bool,
      };


    // case SET_NEXTURL:
    //   console.log(action.nextUrl);
    //   return {
    //     ...state,
    //      ...action.nextUrl
    //   };

    default:
      return state
  }
};
