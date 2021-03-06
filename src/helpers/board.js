import Checkers from '../classes/Checkers.js'
import Board from '../classes/Board.js'
import Player from '../classes/Player.js'

function processBoardProperty( property, value) {

  let board = this;
  switch ( property ) {
    case 'id':
      board.id = value;
      break;

    case 'turn':
      board.turn = value;
      break;

    case 'winner':
      if ( value.length ) {
        let victor = board.players[0].username === value[0].username ? board.players[0] : board.players[1]
        board.winner = victor;
      }
      break;

    case 'players':
      value.forEach( (player, i) => {
        board.players[i].addUsername(player.username)
      })
      break;

    case 'pieces':
      value.forEach( (piece, i) => {
        if ( piece.cellId !== null ) {
          if ( piece.color === 'blue' ) {
            let selectedPiece = board.players[0].pieces[piece.id-1]
            selectedPiece.king = piece.king

            board.cells[piece.cellId].receivePiece(selectedPiece)
            selectedPiece.receiveCell(board.cells[piece.cellId])
          }
          else {
            let selectedPiece = board.players[1].pieces[piece.id-1]
            selectedPiece.king = piece.king

            board.cells[piece.cellId].receivePiece(selectedPiece)
            selectedPiece.receiveCell(board.cells[piece.cellId])
          }
        }
      })
      break;

    default:
      console.error(`Error processing ${property} while loading board.`)
      break;
  }

}

export function createBoard( options ) {
  let game = new Checkers()
  let board = new Board(game)
  game.addBoard(board)

  let playerOne = new Player('blue', "Blue", board)
  let playerTwo = new Player('red', "Red" , board)
  board.addPlayers( playerOne , playerTwo )

  // Only place new pieces if its a brand new game
  if ( !options || !('pieces' in options) ) {
    board.placePieces()
  }

  // Set up board with loaded configurations
  if ( !!options && typeof( options ) === 'object' ) {
    for (let key in options) {
      processBoardProperty.call( board , key, options[key] )
    }
  }

  return board
}
