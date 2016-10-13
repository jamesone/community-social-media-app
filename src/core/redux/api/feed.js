export function fetchFeed(cb, url, token) {

	return fetch(url, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-access-token": token,
            "x-key":"swag",
          },
        })
        .then((response) => response.json())
        .then((json) => {
          console.log("\n\nFeed has been fetched");
           cb(JSON.parse(json))
        }).catch( (error) => console.log(error) )
        .done();
}
