import {
  // FETCH_PLAYERS,
  // FETCH_PLAYERS_SUCCESS,
  // FETCH_PLAYERS_FAILED,
  // UPDATE_SIZE,
  // UPDATE_SORTING,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './constants';

const initialState = {
  isOpen: false,
  selectedPlayer: null,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      const newState = { ...state, isOpen: true };
      if (action.payload.id) newState.selectedPlayer = { ...action.payload };
      return newState;
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
