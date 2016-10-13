import {SET_CATEGORIES,SET_CITIES, FETCHING_CITIES,} from '../../constants/ActionTypes';
const initialState = {
  "categories" : [
	  {"typeId":1,"name":"Traffic Jam","createdAt":"2016-05-02T23:06:47.000Z","updatedAt":"2016-05-02T23:06:47.000Z"},
    {"typeId":2,"name":"Terror Alert","createdAt":"2016-05-02T23:06:47.000Z","updatedAt":"2016-05-02T23:06:47.000Z"},
    {"typeId":3,"name":"Speed Camera","createdAt":"2016-05-02T23:06:47.000Z","updatedAt":"2016-05-02T23:06:47.000Z"},
    {"typeId":4,"name":"Medical Emergency","createdAt":"2016-05-02T23:06:47.000Z","updatedAt":"2016-05-02T23:06:47.000Z"},
    {"typeId":5,"name":"Cheap Fuel","createdAt":"2016-05-02T23:06:47.000Z","updatedAt":"2016-05-02T23:06:47.000Z"},
    {"typeId":6,"name":"Other","createdAt":"2016-05-02T23:06:47.000Z","updatedAt":"2016-05-02T23:06:47.000Z"}
  ],
  city: [],
  fetchingCities: false,
};

// TODO: Make sure the categories are set from the API call (api call is currently not working)
export default function category(state=initialState, action) {
  switch(action.type){
    case SET_CATEGORIES:
      // let categories = state.categories.concat([action.categories]);
      // return {categories : categories};
      return {
      	...state,
      	categories: action.categories
      }
      // return {categories : action.categories};

    case SET_CITIES:
    	return {
    		...state,
    		city: action.cities,
    		fetchingCities: false,
    	}

    case FETCHING_CITIES:
    console.log("\n\nIs fetching cities....")
    	return {
    		...state,
    		fetchingCities: true,
    	}

    default:
      return state;
  }
}
