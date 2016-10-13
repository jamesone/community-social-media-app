import * as commentApi from '../api/comment';
import {BASE_API} from '../../../config';
import {SEND_COMMENT, FETCH_COMMENTS,CLEAR_COMMENTS} from '../../constants/ActionTypes';
export const NORMAL = 'NORMAL';
export const NEXT_URL = 'NEXT_URL';

export function submitComment(comment) {
  return {
    type: SEND_COMMENT,
    comment
  };
}

export function recieveComments(comments, nextCommentUrl, type) {
  console.log(comments)
  return {
    type: FETCH_COMMENTS,
    comments,
    nextCommentUrl,
    fetchType: type,

  };
}


export function fetchComments(type, postId) {

  return (dispatch, getState) => {
      // Feed is fetching, set to true
      // dispatch(isFetchingFeed(true));
      let apiUrl;

      // Construct URL
      const {comment, user} = getState();
      if (type == NEXT_URL){
          apiUrl = comment.nextCommentUrl;
          console.log ("next")
      } else if(type == NORMAL){
        apiUrl = `${BASE_API}comments/?postId=${postId}`
      }

      commentApi.fetchComments(json => {
        console.log (json, "FETCHED COMMENTS");
        if(json.hasOwnProperty('no_comments')) {
          // dispatch no comments found here... #TODO
          return;
        } else if(json.hasOwnProperty('up_to_date')) {
          //dispatch post up to date with latest comments #TODO
          return;
        }

        dispatch(recieveComments(json.comments, json.nextCommentUrl, type));
      }, apiUrl, user.token);
  }
}

  // return (dispatch) => {
  //   // Add isFetchingComments here...
  //   commentApi.fetchComments(json => {
  //     // #TODO
  //     if(json.hasOwnProperty('no_comments')) {
  //       // dispatch no comments found here...
  //       return;
  //     } else if(json.hasOwnProperty('up_to_date')) {
  //       //dispatch post up to date with latest comments
  //       return;
  //     }
  //     const nextCommentUrl = json.nextCommentUrl;
  //     console.log(nextCommentUrl);


  //     dispatch(recieveComments(json, nextCommentUrl));
  //   }, postId);
  // }
// }

export function saveComment(comment, postId,) {
    return (dispatch, getState) => {
      const {user,} = getState();

      commentApi.sendComment(comments => {
        console.log("\n\nInserted comment into " + comment.postId);
      }, user, postId, comment);
    }
}

export function clearComments(){
  return {
    type: CLEAR_COMMENTS
  }
}

