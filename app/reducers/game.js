// @flow
import { CHANGE_HAND } from "../actions/game"

export type PlayerType = "white" | "black"

export type gameStateType = {
  hand: PlayerType
}

const initialState: gameStateType = {
  hand: "black",
}

type actionType = {
  type: string
}

export default function counter(
  state: gameStateType = initialState,
  action: actionType
) {
  switch (action.type) {
    case CHANGE_HAND:
      return { ...state, hand: reverseHand(state.hand) }
    default:
      return state
  }
}

export function reverseHand(hand: PlayerType): PlayerType {
  return { white: "black", black: "white" }[hand]
}
