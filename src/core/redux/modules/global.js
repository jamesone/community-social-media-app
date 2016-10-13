import {Actions} from 'react-native-router-flux';

export default function global(state = {}, action) {
  switch (action.type) {
       case Actions.BEFORE_ROUTE:
       case Actions.AFTER_ROUTE:
       case Actions.AFTER_POP:
       case Actions.BEFORE_POP:
       case Actions.AFTER_DISMISS:
       case Actions.BEFORE_DISMISS:
           if (action.name == state.currentRoute) {
            return {
              ...state
            }
           }
           console.log("Current route is: ", action.name);
           return {
             ...state,
             currentRoute: action.name,
           }
       default:
           return state;
   }
}
