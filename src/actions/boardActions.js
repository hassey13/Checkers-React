import { boardAdapter } from '../adapters/boardAdapter'
import { createBoard } from '../helpers/board'

const ADD_BOARD = 'ADD_BOARD'
const UPDATE_PIECE = 'UPDATE_PIECE'
const LOAD_BOARD = 'LOAD_BOARD'
const UPDATE_WINNER = 'UPDATE_WINNER'

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
        players: response.players,
        winner: response.winner,
        pieces: response.pieces
      }

      return createBoard( options )
    })

  return {
    type: LOAD_BOARD,
    payload: Board
  }
}

export const updatePiece = ( boardId, move ) => {

  boardAdapter.updatePiece( boardId, move )
    .then( response => response )

  return {
    type: UPDATE_PIECE,
    payload: null
  }
}

export const sendWinner = ( boardId, winner ) => {

  let params = {
    winner: {
      username: winner.username
    }
  }

  const Winner = boardAdapter.sendWinner( boardId, params )
    .then( response => response.data.winner[0] )

  return {
    type: UPDATE_WINNER,
    payload: Winner
  }
}

export const updateWinner = ( winner ) => {

  return {
    type: UPDATE_WINNER,
    payload: winner
  }
}

export const resignGame = ( boardId, user ) => {

  let params = {
    resign: {
      username: user.username
    }
  }

  const Winner = boardAdapter.resignGame( boardId, params )
    .then( response => response.data.winner[0] )

  return {
    type: UPDATE_WINNER,
    payload: Winner
  }
}
