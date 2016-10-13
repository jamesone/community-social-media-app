import {SET_COORDS} from '../../constants/ActionTypes';


export function setCoords(coords) {
  console.log("\n\nSetting coords for map");
  return {
    type: SET_COORDS,
    coords
  };
}
