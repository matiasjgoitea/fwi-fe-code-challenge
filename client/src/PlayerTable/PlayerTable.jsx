import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import { COUNTRIES } from '../constants';
import { fetchPlayers, removePlayer, openModal } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class PlayerTable extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.oneOf(Object.keys(COUNTRIES)),
        winnings: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    removePlayer: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleOnCreatePlayer = this.handleOnCreatePlayer.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
  }

  handleOnCreatePlayer(e) {
    e.preventDefault();
    this.props.openModal();
  }

  render() {
    const { players, removePlayer, openModal } = this.props;
    return (
      <div
        id="player-table-grid"
        role="grid"
        aria-label="Poker Players"
        className="player-table"
      >
        <button className="player__button" onClick={this.handleOnCreatePlayer}>
          Create Player +
        </button>
        <TableHeader />
        <TableBody
          players={players}
          removePlayer={removePlayer}
          openModal={openModal}
        />
      </div>
    );
  }
}

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators(
    { fetchPlayers, removePlayer, openModal },
    dispatch
  );

  return (state, props) => {
    const players = state.playerIds.map(id => state.players[id]);

    const nextResult = { ...props, ...actions, players };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PlayerTable);
