// @flow
import _ from 'lodash';

import { INITIALIZE_BOARD, PUT_STORE } from '../actions/board';

type SquareType = 'black' | 'white' | 'empty';

export type Square = {
  owner: SquareType
};

export type boardStateType = {
  squares: Array<Array<Square>>
};

type actionType = {
  type: string
};

const initState: boardStateType = {
  squares: [[]]
};

export default function counter(state: boardStateType = initState, action: actionType) {
  switch (action.type) {
    case INITIALIZE_BOARD:
      const squares = _.map(
        new Array(8),
        () => _.map(
          new Array(8),
          () => ({ owner: 'empty' }: Square)));
      squares[3][4] = { owner: 'white' };
      squares[4][3] = { owner: 'white' };
      squares[3][3] = { owner: 'black' };
      squares[4][4] = { owner: 'black' };
      return { ...state, squares };
    case PUT_STORE:
      const {x, y, hand} = action;
      return state;
    default:
      return state;
  }
}
