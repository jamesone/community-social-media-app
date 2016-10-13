import {SEND_COMMENT, FETCH_COMMENTS,CLEAR_COMMENTS} from '../../constants/ActionTypes';
import {NORMAL, NEXT_URL,} from '../actions/CommentActions';
import {PLAIN_URL} from '../../../config';


const initialState = {
  "comments" : [],
  "isFetchingComments": false,
  'initialUrl': PLAIN_URL,
  'nextCommentUrl': null,

};


export default function comment(state=initialState, action) {
  switch(action.type){
    case SEND_COMMENT:
      let comment = state.comments.concat([action.comment]);
      return Object.assign({}, state, {
        comments: comment,
       });
    case FETCH_COMMENTS:
    // const oldComments = state.comments;
    // oldComments.concat([action.comment]);
    // console.log(action.comments);
      // let comments = state.comments.concat(action.comments);
      // console.log(...comments, "SNDJANJSNAJNSDJNASJDNJASND____");

      // let newCommentSet = state.comments.concat([action.comments]);;
      // console.log(newCommentSet);
      // newCommentSet
      // console.log(newCommentSet, ".............");
      // const newComments = state.comments.pop(...action.comments);
      // console.log("new comments...", newComments);
      // let comments = state.comments;
      // comments.push.apply(comments, ...action.comments);
      // console.log(comments, "?????")
      // if (action.type == NORMAL) {

      // }
      return {
        ...state,
        comments: action.fetchType == NORMAL ? action.comments : state.comments.concat(action.comments),
        nextCommentUrl: action.nextCommentUrl,
        isFetchingComments: false,
      }
      // return Object.assign({}, state, {
      //   // comments: comments,
      //   ...action.comments,
      //   nextCommentUrl: action.nextCommentUrl,
      //   isFetchingComments: false,
      // });
     // return {comments : action.comments};
    case CLEAR_COMMENTS:
      return {
         "comments" : [],
        "isFetchingComments": false,
        'initialUrl': PLAIN_URL,
        'nextCommentUrl': null,
      }
      // return {comments: []}

    default:
      return state;
  }
}
