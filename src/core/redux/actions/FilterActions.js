import * as types from '../../constants/ActionTypes';

// Make API call and get feed (to be added: comments like etc)
export function setFilterPostType(values) {
	return {
		type: types.POST_TYPE_FILTER,
		filterPostType: values,
	}
}
export function setCoords(long, lati) {
	console.log("setting shit", long)
	return {
		type: types.SET_COORDS,
		longitude: long,
		latitude: lati,
	}
}

// Accepts an array of orders ['chron...', 'likes', 'etc...']
export function setOrder (orderBy){
	return {
		type: types.SET_ORDERBY,
		orderBy,
	}
}

export function shouldReload(bool){
	return {
		type: types.RELOAD_FEED,
		shouldReload: bool,
	}
}


// // Add typeId (catId) to array so we can parse to API
// export function addChosenId(ids){
// 	return{
// 		type: types.ADD_TYPE,
// 		ids
// 	}
// }
export function setChosenIds(chosenIds){
  return{
    type: types.ADD_TYPE,
    chosenIds
  }
}

// Set geo location setting to true, we now find posts nearby
export function setGeo(isGeo, radius){
	console.log("inside geo", isGeo)
	return {
		type: types.SET_GEO,
		isGeo: isGeo,
		radius: radius,
	}
}
