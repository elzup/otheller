// @flow
import _ from "lodash"

import { INITIALIZE_BOARD, PUT_STORE } from "../actions/board"
import type { PlayerType } from "./game"
import { reverseHand } from "./game"

type SquareType = "black" | "white" | "empty"

export type Square = {
  owner: SquareType,
  enable: boolean
}

export type boardStateType = {
  squares: Array<Array<Square>>
}

type actionType = {
  type: string,
  x?: number,
  y?: number,
  hand?: PlayerType
}

const initState: boardStateType = {
  squares: [[]],
}

export default function counter(
  state: boardStateType = initState,
  action: actionType
) {
  switch (action.type) {
    case INITIALIZE_BOARD:
      const squares = _.map(new Array(8), () =>
        _.map(new Array(8), () => ({ owner: "empty", enable: false }: Square))
      )
      squares[3][4].owner = "black"
      squares[4][3].owner = "black"
      squares[3][3].owner = "white"
      squares[4][4].owner = "white"
      return { ...state, squares: enableCheck(squares, "black") }
    case PUT_STORE:
      const { x, y, hand } = action
      const squares2 = [...state.squares]

      if (state.squares[y][x].owner !== "empty") {
        return state
      }
      _.each([-1, 0, 1], dx => {
        _.each([-1, 0, 1], dy => {
          if (dx === 0 && dy === 0) {
            return
          }
          let i = 1
          let existsEnemyStone = false
          while (true) {
            const tx = x + dx * i
            const ty = y + dy * i
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) {
              return
            }
            const tSquare = state.squares[ty][tx]
            const isEmpty = tSquare.owner === "empty"
            const isMine = tSquare.owner === hand
            const isEnemy = !isMine && !isEmpty
            if (isEmpty) {
              return
            }
            if (isEnemy) {
              existsEnemyStone = true
            } else {
              if (existsEnemyStone) {
                break
              }
              return
            }
            i += 1
          }
          while (i > 0) {
            const tx = x + dx * i
            const ty = y + dy * i
            console.log(tx, ty)
            squares2[ty][tx].owner = hand
            i -= 1
          }
        })
      })
      squares2[y][x].owner = hand
      return { ...state, squares: enableCheck(squares2, reverseHand(hand)) }
    default:
      return state
  }
}

function enableCheck(
  oldSquares: Array<Array<Square>>,
  hand: PlayerType
): Array<Array<Square>> {
  const squares = [...oldSquares]
  _.each(_.range(squares.length), y => {
    _.each(_.range(squares[0].length), x => {
      if (squares[y][x].owner !== "empty") {
        squares[y][x].enable = false
        return
      }
      const maps = _.map([-1, 0, 1], dx =>
        _.map([-1, 0, 1], dy => {
          if (dx === 0 && dy === 0) {
            return false
          }
          let i = 1
          let existsEnemyStone = false
          while (true) {
            const tx = x + dx * i
            const ty = y + dy * i
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) {
              return false
            }
            const tSquare = squares[ty][tx]
            const isEmpty = tSquare.owner === "empty"
            const isMine = tSquare.owner === hand
            const isEnemy = !isMine && !isEmpty
            if (isEmpty) {
              return false
            }
            if (isEnemy) {
              existsEnemyStone = true
            } else {
              if (existsEnemyStone) {
                break
              }
              return false
            }
            i += 1
          }
          return true
        })
      )
      squares[y][x].enable = _.some(_.flatten(maps), Boolean)
    })
  })
  return squares
}
