import {PLAIN_URL} from '../../config';
// const {API_BASE} = config;

export function constructPostFeedUrl(CITY, TYPE_IDS, SPECIAL){

  // Returns something like URL/post/1/?types=x,x,x,
  return`${PLAIN_URL}post/${CITY}/?${[
     `types=${encodeURI(TYPE_IDS)}`,
     `filter=${encodeURI(SPECIAL[0])}`
    ].join('&')}`;
}


export function constructUserFeedUrl (userId, filter) {
	return`${PLAIN_URL}post/user/?${[
     `userId=${userId}`,
     `filter=${encodeURI(filter)}`
    ].join('&')}`;
}
