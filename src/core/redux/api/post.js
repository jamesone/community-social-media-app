const staticUserId = 1;
const config = require('../../../config');

//#TODO fix all this
export function sendPost(cb, formData, userId, state, key) {
  console.log("\n\nTrying to send post");

    // Using this until comments are linked up to location based photos
	return fetch(config.host+"api/v1/post/", {
          method: "POST",
          headers: {
            "x-access-token": key,
            "x-key":"swag",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            description: formData.description,
            location: formData.address,
            longitude: formData.longitude,
            latitude: formData.latitude,
            suburb: formData.suburb,
            photo: formData.photo,
            postType: formData.postType,
            city: state, // Represents vic
            userId: userId,
          })
        })
        .then((response) => response.json())
        .then((json) => {
          console.log("\n\nPost has been sent");
          cb(JSON.parse(json))
        })
    .done();
}

export function togglePostLike(cb, postId, userId, key) {
    // Using this until comments are linked up to location based photos
  return fetch(config.host+"api/v1/post/like", {
          method: "POST",
          headers: {
            "x-access-token": key,
            "x-key":"swag",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            postId: postId,
          })
        })
        .then((response) => response.json())
        .then((json) => {
          cb(JSON.parse(json))
        })
    .done();
}
