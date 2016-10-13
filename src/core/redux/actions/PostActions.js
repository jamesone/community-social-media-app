import * as types from '../../constants/ActionTypes';
import * as postApi from '../api/post';
import * as commentApi from '../api/comment';

// Make API call and get feed (to be added: comments like etc)
export function sendPost (location) {
	return (dispatch, getState) => {
		const {user,} = getState();

		postApi.sendPost(content => {
			dispatch(resetPostLocations());
		}, location, user.userId, user.chosenState, user.token); // TODO add custom arguments
	}
}

export function likePost (postId) {
	return (dispatch, getState) => {
		const {user, } = getState();

		postApi.togglePostLike(json => {
			// dispatch(addPost())
			console.log("User likedORdisliked post", json);
		}, postId, user.userId, user.token);
	}
}

export function sendComment(postData){
	return dispatch =>{
		commentApi.sendComment(comment => {
			dispatch(setMyComment(comment));
		}, postData);
	}
}

export function setMyComment(comment){
	console.log(comment, "commmentntntntntnntntntntntntntnt")
	return {
		type: types.MY_COMMENT,
		comment: comment,
	}
}

// Pass it obj w/ address, longitude, latitude
export function setPostLocations(location){
	// console.log(location);
	console.log("\n\nSetting locations...");
	return {
		type: types.SET_LOCATION,
		location: location,
	}
}

// Pass it obj w/ address, longitude, latitude
export function setPostType(type){
	console.log("\n\nSetting post type...", type);
	return {
		type: types.SET_TYPE,
		postType: type,
	}
}


export function resetPostLocations() {
	console.log("\n\nResetting locations...");
	return {
		type: types.RESET_LOCATION,
	}
}
