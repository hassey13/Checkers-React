import { boardAdapter } from '../adapters/boardAdapter'
import { createBoard } from '../helpers/board'

const ADD_BOARD = 'ADD_BOARD'
const LOAD_BOARD = 'LOAD_BOARD'

export const addBoard = ( board ) => {

  return {
    type: ADD_BOARD,
    payload: board
  }
}

export const loadBoard = ( boardId ) => {

  const Board = boardAdapter.loadBoard( boardId )
    .then( response => {

      let options = {
        id: response._id.toString(),
        turn: response.turn,
        winner: response.winner,
        players: response.players,
        pieces: response.pieces
      }

      return createBoard( options )
    })




  return {
    type: LOAD_BOARD,
    payload: Board
  }
}
