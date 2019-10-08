import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';

import './PlayerForm.scss';

class PlayerForm extends Component {
  static propTypes = {
    selectedPlayer: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number,
      imageUrl: PropTypes.string,
    }),
    actions: PropTypes.shape({
      createPlayer: PropTypes.func,
      updatePlayer: PropTypes.func,
    }),
  };
  constructor(props) {
    super(props);
    if (props.selectedPlayer) {
      this.state = {
        ...props.selectedPlayer,
      };
    } else {
      this.state = {
        name: '',
        country: '',
        winnings: 0,
      };
    }
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnConfirm = this.handleOnConfirm.bind(this);
  }
  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleOnClose(e) {
    e.preventDefault();
    this.props.actions.closeModal();
  }
  handleOnConfirm(e) {
    e.preventDefault();
    const { actions, selectedPlayer } = this.props;
    const { name, country } = this.state;
    if (name === '' || country === '') return;
    if (selectedPlayer) actions.updatePlayer({ ...this.state });
    else actions.createPlayer({ ...this.state });
  }
  render() {
    const { name, country, winnings } = this.state;
    return (
      <form className="form">
        <label className="form__label">
          Name:
          <input
            className="form__input"
            name="name"
            type="text"
            value={name}
            onChange={this.handleOnInputChange}
          />
        </label>

        <label className="form__label">
          Country:
          <select
            className="form__input"
            name="country"
            value={country}
            onChange={this.handleOnInputChange}
          >
            <option key="code-0" value="">
              Select a Country
            </option>
            {Object.keys(COUNTRIES).map(key => (
              <option key={`code-${key}`} value={key}>
                {COUNTRIES[key]}
              </option>
            ))}
          </select>
        </label>

        <label className="form__label">
          Winnings:
          <input
            className="form__input"
            name="winnings"
            type="number"
            value={winnings}
            onChange={this.handleOnInputChange}
          />
        </label>
        <div className="form__action-buttons">
          <button
            className="form__button form__button-confirm"
            onClick={this.handleOnConfirm}
          >
            OK
          </button>
          <button
            className="form__button form__button-cancel"
            onClick={this.handleOnClose}
          >
            CANCEL
          </button>
        </div>
      </form>
    );
  }
}

export default PlayerForm;
