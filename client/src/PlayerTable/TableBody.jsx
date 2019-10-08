/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';

import Avatar from '../Avatar';
import { COUNTRIES } from '../constants';

import removeIcon from '../assets/trash.svg';
import editIcon from '../assets/edit.svg';

const TableBody = ({ players, removePlayer, openModal }) => {
  const onRemove = e => {
    const id = e.target.getAttribute('value');
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) removePlayer({ id });
  };
  const onEdit = e => {
    const id = e.target.getAttribute('value');
    const selectedPlayer = players.filter(player => player.id === id);
    openModal(selectedPlayer[0]);
  };
  return (
    <table
      id="player-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
        {players.map(({ id, name, country, winnings, imageUrl }) => (
          <tr key={id} role="row" className="table__row">
            <td role="gridcell" className="table__avatar">
              <Avatar src={imageUrl} />
            </td>
            <td role="gridcell" className="table__player">
              {name}
            </td>
            <td role="gridcell" className="table__winnings">
              {winnings.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
            <td role="gridcell" className="table__native">
              <div className="country">
                <Avatar>
                  <Flags code={country} alt="" />
                </Avatar>
                {country}
              </div>
            </td>
            <td role="gridcell" className="table__actions">
              <div className="actions">
                <img
                  className="actions__edit"
                  value={id}
                  alt="edit"
                  src={editIcon}
                  onClick={onEdit}
                />
                <img
                  className="actions__remove"
                  value={id}
                  alt="remove"
                  src={removeIcon}
                  onClick={onRemove}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;
