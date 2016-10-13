import {SET_COORDS,CLEAR_COORDS} from '../../constants/ActionTypes';
const initialState = {
  "coords" : []
};


export default function comment(state=initialState, action) {
  switch(action.type){
    case SET_COORDS:
      let coords = state.comments.concat([action.coords]);
      return {coords : coords};
    case CLEAR_COORDS:
      return {coords: []}

    default:
      return state;
  }
}
