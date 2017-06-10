/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import styles from './Counter.css';
import type { boardStateType, Square } from '../reducers/board';
import type { gameStateType, PlayerType } from '../reducers/game';

const stoneStyle = {
  white: {
    width: 50,
    height: 50,
    background: 'white',
    borderRadius: 5,
  },
  black: {
    width: 50,
    height: 50,
    background: 'black',
    borderRadius: 5,
  },
  empty: {}
};

class Othello extends Component {
  props: {
    board: boardStateType,
    game: gameStateType,
    initializeBoard: Function,
    putStone: (x: number, y: number, hand: PlayerType) => void
  };

  componentDidMount() {
    this.props.initializeBoard();
  }

  render() {
    const { board, game } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
          <div>
            <p>
              <span>Hand: </span>
              <span>{game.hand}</span>
            </p>
          </div>
          <table style={{ borderStyle: 'solid' }}>
            { _.map(_.range(board.squares.length), (y) => (
              <tr>
                { _.map(_.range(board.squares[0].length), (x) => {
                  const square: Square = board.squares[y][x];
                  return (
                    <td
                      style={{ width: 50, height: 50, border: 'solid 1px' }}
                      onClick={() => {
                        console.log('put', y, x);
                        this.props.putStone(y, x);
                      }}
                    >
                      <div style={stoneStyle[square.owner]} />
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>

              <td />
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Othello;
