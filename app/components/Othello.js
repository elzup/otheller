// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import styles from './Counter.css';
import type { boardStateType, Square } from '../reducers/board';

class Othello extends Component {
  props: {
    board: boardStateType,
    initializeBoard: Function,
    initializeGame: Function,
    putStore: (x: number, y: number) => void
  };

  componentDidMount() {
    this.props.initializeBoard();
    this.props.initializeGame();
  }

  render() {
    const { board } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
          <table>
            { _.map(board.squares, (line) => (
              <tr>
                {_.map(line, (square: Square) => (
                  <td>
                    {square.owner}
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
