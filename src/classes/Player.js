import Piece from './Piece.js'

export default class Player {
  constructor(color, name, board, username = null) {
    this.username = username
    this.color = color
    this.name = name
    this.pieces = this.generatePieces()
    this.board = board
  }

  addUsername( username ) {
    this.username = username
  }

  generatePieces() {
    let piecesContainer = []
    while ( piecesContainer.length < 12 ) {
      piecesContainer.push(new Piece(this, piecesContainer.length + 1))
    }
    return piecesContainer
  }

  activePieceCount() {
    let count = 0
    for (var i = 0; i < this.pieces.length; i++) {
      if ( this.pieces[i].cell !== null ) {
        count += 1
      }
    }
    return count
  }
}
