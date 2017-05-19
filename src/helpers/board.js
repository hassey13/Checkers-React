import Checkers from '../classes/Checkers.js'
import Board from '../classes/Board.js'
import Player from '../classes/Player.js'

function processBoardProperty( property, value) {

  switch ( property ) {
    case 'id':
      this.id = value
      break;
    case 'turn':
      this.turn = value
      break;
    case 'winner':
      this.winner = value
      break;
    case 'players':
      this.players = value
      break;
    case 'pieces':
      this.pieces = value
      break;
    default:
  }

}

export function createBoard( options ) {
  let game = new Checkers()
  let board = new Board(game)
  game.addBoard(board)

  let playerOne = new Player('blue', "Blue", board)
  let playerTwo = new Player('red', "Red" , board)
  board.addPlayers( playerOne , playerTwo )
  
  board.placePieces()

  if ( !!options && typeof( options ) === 'object' ) {
    for (let key in options) {
      processBoardProperty.call( board , key, options[key] )
    }
  }

  return board
}
