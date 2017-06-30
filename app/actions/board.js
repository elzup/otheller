// @flow

export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';
export const PUT_STORE = 'PUT_STORE';

export function initializeBoard() {
  return {
    type: INITIALIZE_BOARD
  };
}

export function putStone() {
  return {
    type: PUT_STORE
  };
}
