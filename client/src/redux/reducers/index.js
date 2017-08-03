import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


// Reducers
import allGames from './allGames';
import activeGame from './activeGame';
import newGames from './newGames';
import autoSuggestions from './autoSuggestions';
import searchResults from './searchResults';
import priceAlertCreated from './priceAlertCreated';
import userInfo from './userInfo';
import errors from './errors';
import { loadingBarReducer } from 'react-redux-loading-bar';


const rootReducer = combineReducers({
    allGames,
    newGames,
    autoSuggestions,
    searchResults,
    activeGame,
    priceAlertCreated,
    userInfo,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});


export default rootReducer;
