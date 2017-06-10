// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import styles from './Counter.css';
import type { boardStateType, Square } from '../reducers/board';
import type { gameStateType } from '../reducers/game';

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
  empty: {
  }
};

class Othello extends Component {
  props: {
    board: boardStateType,
    game: gameStateType,
    initializeBoard: Function,
    putStore: (x: number, y: number) => void
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
            { _.map(board.squares, (line) => (
              <tr>
                {_.map(line, (square: Square) => (
                  <td style={{ width: 50, height: 50, border: 'solid 1px' }}>
                    <div style={stoneStyle[square.owner]}>
                    </div>
                  </td>
                ))}
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
