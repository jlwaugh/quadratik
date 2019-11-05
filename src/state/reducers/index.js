import {
    combineReducers,
  } from 'redux';
  
  import myDataReducer from './myData';
  import uiStateReducer from './uiState';
  import userStateReducer from './userState';
  import spacesReducer from './spaces';
  
  export default combineReducers({
    myData: myDataReducer,
    uiState: uiStateReducer,
    userState: userStateReducer,
    spaces: spacesReducer,
  });