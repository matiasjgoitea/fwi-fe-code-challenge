import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import api from '../api-client';
import {
  CLOSE_MODAL,
  CREATE_PLAYER,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAILED,
  FETCH_PLAYERS,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILED,
  UPDATE_PLAYER,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAILED,
  REMOVE_PLAYER,
  REMOVE_PLAYER_SUCCESS,
  REMOVE_PLAYER_FAILED,
} from './constants';

function* fetchPlayers() {
  try {
    const response = yield call(api.get, 'players');
    yield put({ type: FETCH_PLAYERS_SUCCESS, payload: { data: response } });
  } catch {
    yield put({ type: FETCH_PLAYERS_FAILED });
  }
}

function* createPlayer(action) {
  try {
    yield call(api.post, 'players', action.payload);
    yield put({ type: CREATE_PLAYER_SUCCESS });
    yield put({ type: CLOSE_MODAL });
    yield put({ type: FETCH_PLAYERS });
  } catch {
    yield put({ type: CREATE_PLAYER_FAILED });
    yield put({ type: CLOSE_MODAL });
  }
}

function* updatePlayer({ payload }) {
  try {
    yield call(api.put, 'players/' + payload.id, {
      winnings: parseInt(payload.winnings, 10),
      country: payload.country,
      name: payload.name,
    });
    yield put({ type: UPDATE_PLAYER_SUCCESS });
    yield put({ type: CLOSE_MODAL });
    yield put({ type: FETCH_PLAYERS });
  } catch {
    yield put({ type: UPDATE_PLAYER_FAILED });
    yield put({ type: CLOSE_MODAL });
  }
}

function* removePlayer({ payload }) {
  try {
    yield call(api.delete, `players/${payload.id}`);
    yield put({ type: REMOVE_PLAYER_SUCCESS });
    yield put({ type: FETCH_PLAYERS });
  } catch {
    yield put({ type: REMOVE_PLAYER_FAILED });
  }
}

export function* playersSaga() {
  yield takeEvery(FETCH_PLAYERS, fetchPlayers);
  yield takeEvery(CREATE_PLAYER, createPlayer);
  yield takeEvery(UPDATE_PLAYER, updatePlayer);
  yield takeLeading(REMOVE_PLAYER, removePlayer);
}

export default playersSaga;
