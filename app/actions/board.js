// @flow
import type { PlayerType } from '../reducers/game'

export const INITIALIZE_BOARD = 'INITIALIZE_BOARD'
export const PUT_STORE = 'PUT_STORE'

export function initializeBoard() {
  return {
    type: INITIALIZE_BOARD,
  }
}

export function putStone(y: number, x: number, hand: PlayerType) {
  return {
    type: PUT_STORE,
    x,
    y,
    hand,
  }
}
