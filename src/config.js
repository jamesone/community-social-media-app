// var pjson = require('../../package.json');


// export const internal = "192.168.15.59";
// export const internal = "192.168.0.12"
export const internal = "localhost:80/";
// export const internal = "community.ap-southeast-2.elasticbeanstalk.com/";

// export const local = "localhost";
// export const internal = process.env.npm_package_config_host; //"192.168.0.12";
export const host = "http://"+internal;
// export const host = "http://community-dev.ap-southeast-2.elasticbeanstalk.com/"
// export const host = "http://192.168.15.80/"


// going to use local machine for now:
// Images will be loaded from this link:
// export const cloudfront="http://d1cd1r1k1o6v59.cloudfront.net/"; // User postes images here e.g /filename.jpeg
// export const cloudfront="http://192.168.15.80/photos/"; // User postes images here e.g /filename.jpeg
export const cloudfront=host+"photos/"; // User postes images here e.g /filename.jpeg

// export const cloudfront="http://192.168.0.12/photos/"; // User postes images here e.g /filename.jpeg
// export const cloudfront="http://localhost/photos/"; // User postes images here e.g /filename.jpeg

// export const host = "http://192.168.0.12/"
// export const host = "http://localhost/"
// export const URL = host+":"+port+"/api/v1/post/1/";
export const BASE_API = host+"api/v1/";
export const PLAIN_URL = host+"api/v1/";
export const URL = host+"api/v1/post/1/";
export const apiImageUrl = host+"images/";
// export const host = "http://192.168.1.116";

// export const port = process.env.npm_package_config_port;//'3000';
export const port = "3000";
export const LOGIN_KEY = "nopointtryingtohackthisyoubastard!lol!&*@#&^!@#@@_+(#@Q$Y(&#Q$BD@@";
export const STATE_KEY = "haveyouchosenastateyet??!?!!ashdjfbaskjhfbu3472&^@&^$!@#Y&@(!@#&@#"
// export const host = process.env.npm_package_config_host;
// export const port = process.env.npm_package_config_port;

export const storage_key = "@%$usertoken*(&1xxx728&&&umadbrahgh";
// export const URL = host+":"+port+"/api/v1/post/1/";
// export const BASE_API = host+":"+port+"/api/v1/";
// export const PLAIN_URL = host+":"+port+"/api/v1/";
// export const apiImageUrl = host+":"+port+"/images/";
export const featureGrey = '#bfbfbf';
export const mainStyles = {
  color: {
    main: "#F6F7F8",
    secondary: ""
  }
};

// export const apiImageUrl = "http://10.0.0.103:3000/images/";
// export const URL = "http://10.0.0.103:3000/api/v1/post/Melbourne/";
