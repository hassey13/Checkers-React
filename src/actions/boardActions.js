import { boardAdapter } from '../adapters/boardAdapter'
import { createBoard } from '../helpers/board'

const ADD_BOARD = 'ADD_BOARD'
const LOAD_BOARD = 'LOAD_BOARD'
const RESIGN_GAME = 'RESIGN_GAME'

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

export const resignGame = ( boardId, user ) => {

  const Winner = boardAdapter.resignGame( boardId, user )
    .then( response => {
      debugger
    })

  return {
    type: RESIGN_GAME,
    payload: Winner
  }
}
