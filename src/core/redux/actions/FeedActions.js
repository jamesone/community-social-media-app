import * as types from '../../constants/ActionTypes';
import * as feedApi from '../api/feed';
import {removeParam} from '../../utils/createNext';
import {grabParamValue} from '../../utils/urls';
import {constructPostFeedUrl, constructUserFeedUrl,} from '../../utils/UrlFormatting';
import {REFRESHING_FEED, NEXT_URL_FEED, NORMAL_FEED, NORMAL_USER_FEED, NEXT_URL_USER} from '../../constants/ApiConstants';
export const SET_PAGE_TYPE = 'SET_PAGE_TYPE';

const config = require('../../../config');

// Make API call and get feed (to be added: comments like etc)
// export function fetchFeed(url, isPaging, isRefreshing) {
export function fetchFeed(callType) {
	let apiUrl = null;

	return (dispatch, getState) => {
		// Feed is fetching, set to true
		const {user, filter, feed, routes,} = getState();
    const {sceneKey,} = routes.scene;
    const {feedType,} = feed;
    console.log (feed.userId, "USER ID LOL")
    const isHome = feed.userId ==null ? true : false;
    console.log (feedType, "<~ feed type")
    console.log ("IN  FEED ACTIONS SCENE KEY ==>>>: ", sceneKey);


    switch (callType) {
      case REFRESHING_FEED:
        dispatch(isFetchingFeed(true));
        apiUrl = feed.refreshUrl;
      break;
      case NEXT_URL_FEED:
        dispatch(isFetchingFeed(true));
        apiUrl = isHome
              ? feed.nextUrl
              : feed.userNextUrl;
      break;
      case NORMAL_FEED:
        dispatch(fetchingNew(true));
        apiUrl = isHome
            ? constructPostFeedUrl(user.chosenState, filter.chosenIds, filter.orderBy)
            : apiUrl = constructUserFeedUrl (feed.userId, 'likes');
      break;
      case 'GEO_FEED':
        dispatch(fetchingNew(true));
        apiUrl =
          constructPostFeedUrl(user.chosenState, filter.chosenIds) + `&${[
           `longitude=${encodeURI(filter.longitude)}`,
           `latitude=${encodeURI(filter.latitude)}`,
           `radius=${encodeURI(filter.radius)}`,
          ].join('&')}`;
      break;
      default:
        apiUrl = isHome
            ? constructPostFeedUrl(user.chosenState, filter.chosenIds, filter.orderBy)
            : apiUrl = constructUserFeedUrl (feed.userId, 'likes');
      break;
    }
    console.log (apiUrl, "<~~~~~~~~~")
		// if (callType == REFRESHING_FEED) {
  //     dispatch(isFetchingFeed(true));
		// 	apiUrl = feed.refreshUrl;
		// } else if (callType == NEXT_URL_FEED) {
  //     dispatch(isFetchingFeed(true));
		// 	apiUrl = (feedType == 'home')
  //             ? feed.nextUrl
  //             : feed.userNextUrl;
		// } else if(callType == NORMAL_FEED){
  //     dispatch(fetchingNew(true));
		// 	apiUrl = isHome
  //             ? constructPostFeedUrl(user.chosenState, filter.chosenIds, filter.orderBy.order)
  //             : apiUrl = constructUserFeedUrl (feed.userId, 'likes');

		// } else if (callType == 'GEO_FEED') {
  //     dispatch(fetchingNew(true));
		// 	apiUrl =
  //       constructPostFeedUrl(user.chosenState, filter.chosenIds) + `&${[
		//      `longitude=${encodeURI(filter.longitude)}`,
		// 		 `latitude=${encodeURI(filter.latitude)}`,
		// 		 `radius=${encodeURI(filter.radius)}`,
		//     ].join('&')}`;

		// }
  //   else if (callType == NORMAL_USER_FEED) {
		// 	apiUrl = constructUserFeedUrl (feed.userId, 'likes');
		// } else if (callType == NEXT_URL_USER) {
		// 	console.log ("Inside nextURL user", callType)
		// 	apiUrl = feed.userNextUrl;
		// }

		console.log ("\n\nMaking **" + callType + "** api call to: ", apiUrl);

		feedApi.fetchFeed(json => {
			if(json.hasOwnProperty('update_to_date')){
				dispatch(feedUpToDate(true));
				return;
			} else if(json.hasOwnProperty('no_more_paging')) {
				console.log("\nNO more results for callType: ", callType);
				dispatch(noMorePaging(true));
				return;
			}

			// #TODO, cleanup
			const is_geo = json.hasOwnProperty('is_geo');
				// Construct urls here
				const nextUrl = is_geo
							? json.nextUrl
							: removeParam('latestId', json.nextUrl);

				const refreshUrl = json.nextUrl
							? json.nextUrl
							: null;
				const latestId = !is_geo ? grabParamValue('latestId', json.nextUrl) : null;

			const posts = json.posts;

      switch (callType) {
        case REFRESHING_FEED:
          dispatch(feedUpToDate(false)); // Feed has new data...
          dispatch(recievedRefreshedFeed(posts, refreshUrl, latestId));
        break;
        case NEXT_URL_FEED:
          dispatch(noMorePaging(false));
          if (isHome){
            dispatch(receivedFeedPage(posts, nextUrl));
          } else {
            dispatch(recievedUserFeedPage (posts, nextUrl));
          }
        break;
        case NORMAL_FEED:
          if (isHome){
            dispatch(receivedFeed(posts, nextUrl, refreshUrl, latestId));
          } else {
            dispatch(recievedUserFeed(posts, nextUrl, refreshUrl, latestId));
          }
        break;
        case 'GEO_FEED':
          dispatch(receivedFeed(posts, nextUrl, refreshUrl, latestId));
        break;
        default:
          dispatch(feedUpToDate(false)); // Feed has new data...
          dispatch(recievedRefreshedFeed(posts, refreshUrl, latestId));
        break;
    }

			// // Dispatch the right action...
			// if(callType == NORMAL_FEED){
			// 	dispatch(receivedFeed(posts, nextUrl, refreshUrl, latestId));
			// } else if(callType == NEXT_URL_FEED) {
			// 	dispatch(noMorePaging(false));
			// 	dispatch(receivedFeedPage(posts, nextUrl));
			// } else if(callType == REFRESHING_FEED) {
			// 	dispatch(feedUpToDate(false)); // Feed has new data...
			// 	dispatch(recievedRefreshedFeed(posts, refreshUrl, latestId));
			// } else if(callType == 'GEO_FEED') {
			// 		dispatch(receivedFeed(posts, nextUrl, refreshUrl, latestId));
			// }  else if (callType == NEXT_URL_USER) {
			// 	dispatch(recievedUserFeedPage (posts, nextUrl));
			// } else if (callType == NORMAL_USER_FEED) {
			// 	dispatch(recievedUserFeed(posts, nextUrl, refreshUrl, latestId));
			// } else {
			// 	dispatch(feedUpToDate(false)); // Feed has new data...
			// 	dispatch(recievedRefreshedFeed(posts, refreshUrl, latestId));
			// }
		}, apiUrl, user.token);
	};
}

export function setUserId (userId){
	return {
		type: types.SET_USER_ID,
		userId,
	}
}

/**
  @params {string} page type, e.g 'user', 'home' - This is used to determine the api call
**/
export function setFeedType (type){
  return {
    type: SET_PAGE_TYPE,
    feedType: type,
  }
}

/*######################## SAVE POSTS TO REDUX SHIET ########################*/
// When user paginates or initially fetches feed:
function receivedFeed(posts, nextUrl, refreshUrl,latestId) {
  return {
    type: types.RECIEVED_FEED,
    posts,
    nextUrl,
    refreshUrl,
    latestId,
  }
}

// When user is paging, don't safe refresh url...just save nextUrl
function receivedFeedPage(posts, nextUrl) {
  return {
    type: types.RECIEVED_FEED_PAGING,
    posts,
    nextUrl,

  }
}

// When user is refreshing (pull to refresh)....Just save refresh url & posts
function recievedRefreshedFeed(posts, refreshUrl,latestId) {
	return {
	    type: types.RECIEVED_FEED_REFRESH,
	    posts,
	    refreshUrl,
	    latestId,
  }
}

function recievedUserFeedPage (posts, nextUrl) {
	return {
		type: types.RECIEVED_USER_FEED_PAGE,
		posts,
		nextUrl,
	}
}

function recievedUserFeed (posts, nextUrl, refreshUrl,latestId) {
	return {
	    type: types.RECIEVED_USER_FEED,
	    posts,
	    nextUrl,
	    refreshUrl,
	    latestId,
	 }
}
/*######################## SAVE POSTS TO REDUX SHIET ########################*/

/**
  @params {bool} tell app that the feed is up to date, no more posts exist
**/
function feedUpToDate(upToDate) {
	// takes a boolean
	return {
		type: types.FEED_UP_TO_DATE,
		upToDate,
	}
}

function noMorePaging(bool){
	return {
		type: types.NO_MORE_RESULTS,
		bool,
	}
}

function isFetchingFeed(isFetching){
	// isFetching = t/f
	 return {
	    type: types.IS_FETCHING_FEED,
	    isFetching: isFetching,
  	}
}


export function fetchingNew(bool){
	return {
		type: types.FETCHING_NEW,
		bool
	}
}























function setNextUrl(nextUrl){
	return {
		type: types.SET_NEXTURL,
		nextUrl: {nextUrl: nextUrl},
	}
}



export function setFilter(filterType){
	return {
		type: types.SET_FILTER,
		filterType: filterType,
	}
}
