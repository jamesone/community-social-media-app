var staticUserId = 1;
var config = require('../../../config');
// console.log(config.isIphone ? config.internalIp : 'localhost')

export function sendComment(cb, user, postId, comment) {

  // Using this until comments are linked up to location based photos
	return fetch(config.BASE_API+"comments/", {
          method: "POST",
          headers: {
            "x-access-token": user.token,
            "x-key":"swag",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: postId,
            userId: user.userId,
            comment: comment,
          })
        })
        .then((response) => response.json())
        .then((json) => {
          console.log("\n\nSending comment in api to postId: " + postId);
          cb(JSON.parse(json))
        })
    .done();
}

export function fetchComments(cb, url, key) {
  console.log("\n\nFetching comment: ", url);

  // Using this until comments are linked up to location based photos || config.host +":"+config.port+"/api/v1/comments/"+postId
  return fetch(url, {
          method: "GET",
          headers: {
            "x-access-token": key,
            "x-key": "swag",
            'Accept': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((json) => {
          console.log("\n\nComment has been sent inside fetchComments API");
          cb(JSON.parse(json))
        }).catch((err) => {
          console.log(err);
        })
    .done();
}


// export function fetchComments() {
//   return dispatch => {
//     fetch("/api/comments")
//       .then((comments) => {
//         dispatch(recieveComments(comments.data));
//       }).catch((error) => {
//         console.error(error);
//       });
//   };
// }
