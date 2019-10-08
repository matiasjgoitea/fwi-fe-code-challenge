import { combineReducers } from 'redux';

import playerIds from './playerIds';
import players from './players';
import modal from './modal';

export default combineReducers({
  modal,
  playerIds,
  players,
});
