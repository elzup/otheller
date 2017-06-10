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
    borderRadius: '50%',
  },
  black: {
    width: 50,
    height: 50,
    background: 'black',
    borderRadius: '50%',
  },
  empty: {}
};

const enableStyle = {
  borderRadius: '50%',
  margin: 3,
  width: 40,
  height: 40,
  border: 'dotted #aaa 2px'
};

class Othello extends Component {
  props: {
    board: boardStateType,
    game: gameStateType,
    changeHand: Function,
    initializeBoard: Function,
    putStone: (x: number, y: number, hand: PlayerType) => void
  };

  componentDidMount() {
    this.props.initializeBoard();
  }

  render() {
    const { board, game, changeHand, putStone } = this.props;
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
                      align="center"
                      valign="center"
                      style={{ width: 50, height: 50, border: 'solid 1px' }}
                      onClick={() => {
                        if (!square.enable) {
                          return;
                        }
                        putStone(y, x, game.hand);
                        changeHand();
                      }}
                    >
                      <div
                        style={{
                          ...stoneStyle[square.owner],
                          ...(square.enable ? enableStyle : {})
                        }}
                      />
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
