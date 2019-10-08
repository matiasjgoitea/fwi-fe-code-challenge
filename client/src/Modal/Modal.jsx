import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal, updatePlayer, createPlayer } from '../appState/actions';
import { isModalOpen, isPlayerSelected } from '../appState/selectors';
import PlayerForm from '../PlayerForm/PlayerForm';
import './Modal.scss';

const Modal = ({ actions, isOpen, selectedPlayer }) => {
  if (!isOpen) {
    document.body.style.overflow = 'visible';
    return <div />;
  } else {
    document.body.style.overflow = 'hidden';
    return (
      <div className="modal">
        <div className="modal__background" />
        <div className="modal__content">
          <h1 className="modal__title">
            {selectedPlayer ? 'Edit Player' : 'Create Player'}
          </h1>
          <PlayerForm actions={actions} selectedPlayer={selectedPlayer} />
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedPlayer: PropTypes.any,
  actions: PropTypes.shape({
    createPlayer: PropTypes.func,
    updatePlayer: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  isOpen: isModalOpen(state),
  selectedPlayer: isPlayerSelected(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { closeModal, updatePlayer, createPlayer },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
