import {
  CREATE_PLAYER,
  FETCH_PLAYERS,
  FETCH_PLAYERS_SUCCESS,
  UPDATE_PLAYER,
  REMOVE_PLAYER,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './constants';

export function fetchPlayers() {
  return { type: FETCH_PLAYERS };
}

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function createPlayer(payload) {
  return { type: CREATE_PLAYER, payload };
}

export function updatePlayer(payload) {
  return { type: UPDATE_PLAYER, payload };
}

export function removePlayer(payload) {
  return { type: REMOVE_PLAYER, payload };
}

export function openModal(payload = {}) {
  return { type: OPEN_MODAL, payload };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}
