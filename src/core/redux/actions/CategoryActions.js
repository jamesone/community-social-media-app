import * as categoryApi from '../api/category';
import {FETCH_CATEGORIES, FETCHING_CITIES, SET_CATEGORIES, SET_CITIES,} from '../../constants/ActionTypes';


export function fetchCategories() {
  return (dispatch, getState) => {
      const {user,} = getState();

      categoryApi.fetchCategories(categories => {
        console.log("\n\nFetched categories ");
        dispatch(recieveCategories(categories));
      }, user.key);
  }
}

export function recieveCategories(categories) {
  console.log("\n\nCategories...:", categories)
  return {
    type: SET_CATEGORIES,
    categories
  };
}

export function fetchCities() {
  return (dispatch, getState) => {
    const {user,} = getState();
    dispatch(fetchingCities(true));

    categoryApi.fetchCities(cities => {
      console.log("\nFetched cities");
      dispatch(recievedCities(cities));
      dispatch(fetchingCities(false));
    }, user.token)
  }

}

function recievedCities (cities){
  return {
    type: SET_CITIES,
    cities,
  }
}

function fetchingCities (bool){
  return {
    type: FETCHING_CITIES,
    bool,
  }
}
