var staticUserId = 1;
var config = require('../../../config');

export function fetchCategories(cb, key) {
  // console.log("\n\nFetching categories: ", "http://"+ config.host +":"+config.port+"/api/v1/category/");
  // Using this until comments are linked up to location based photos
  return fetch(config.host+"api/v1/category/", {
          method: "GET",
          headers: {
            "x-access-token": key,
            "x-key":"swag",
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((json) => {
          //Not getting here for some reason...???? wont console log check actions n reducer
          console.log("\n\nCategories were fetched");
          cb(JSON.parse(json))
        })
        .catch((err) =>{
          console.log("ERROR: ", err);
        });
}

export function fetchCities(cb, key) {
    fetch(config.host+"api/v1/cities/", {
          method: "GET",
          headers: {
            "x-access-token": key,
            "x-key":"swag",
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((json) => {
          //Not getting here for some reason...???? wont console log check actions n reducer
          console.log("\n\nCities were fetched");
          cb(JSON.parse(json))
        })
        .catch((err) =>{
          console.log("ERROR: ", err);
        });
}
