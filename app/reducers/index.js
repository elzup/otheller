// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import board from './board';
import game from './game';

const rootReducer = combineReducers({
  counter,
  board,
  game,
  router,
});

export default rootReducer;
