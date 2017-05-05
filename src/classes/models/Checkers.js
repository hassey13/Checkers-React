export default class Checkers {
  constructor() {
    this.name = 'Checkers'
    this.board = null
  }

  addBoard(board) {
    this.board = board
  }

  validMove(destination, piece, execute) {

    if ( !!this.board.lastPieceThatJumpped ) {
      return false
    }

    for (let i = 0; i < this.board.cells.length; i++) {
      for (let p = 0; p < piece.player.pieces.length; p++) {
        if ( piece.player.pieces[p].cell ) {
          if ( this.board.game.validJump( this.board.cells[i] , piece.player.pieces[p],  false )  ) {
            return false
          }
        }
      }
    }

    if (this.cellIsOccupied(destination) || piece.player.color !== this.board.turn ) {
      return false
    }

    let leftColumn = piece.cell.id % 8 === 0
    let rightColumn = (piece.cell.id + 1) % 8 === 0

    let upLeft = (destination.id === piece.cell.id - 9) && !leftColumn
    let upRight = (destination.id === piece.cell.id - 7) &&  !rightColumn
    let downLeft = (destination.id === piece.cell.id + 9) && !rightColumn
    let downRight = (destination.id === piece.cell.id + 7) && !leftColumn

    switch (piece.direction) {
      case 'down':
        if ( downRight || downLeft ) {
          if( execute ) {
            this.board.turn = this.board.turn === 'blue' ? 'red' : 'blue';
            this.board.lastPieceThatJumpped = null;
          }
          return true
        }
        else {
          return false
        }
      case 'up':
        if (upRight || upLeft) {
          if( execute ) {
            this.board.turn = this.board.turn === 'blue' ? 'red' : 'blue';
            this.board.lastPieceThatJumpped = null;
          }
          return true
        }
        else {
          return false
        }
      case 'upanddown':
        if ( downRight || downLeft || upLeft || upRight ) {
          if( execute ) {
            this.board.turn = this.board.turn === 'blue' ? 'red' : 'blue';
            this.board.lastPieceThatJumpped = null;
          }
          return true
        }
        else {
          return false
        }
      default:
        throw new Error("Perhaps no direction set")
    }
  }

  validJump(destination, piece, execute) {
    if ( !!this.board.lastPieceThatJumpped && this.board.lastPieceThatJumpped !== piece ) {
      return false
    }

    if (this.cellIsOccupied(destination) || piece.player.color !== this.board.turn) {
      return false
    }


    var leftColumn = (piece.cell.id - 1) % 8 === 0
    var rightColumn = (piece.cell.id + 2) % 8 === 0

    var upLeft = (destination.id === piece.cell.id - 18) && !leftColumn
    var upRight = (destination.id === piece.cell.id - 14) &&  !rightColumn
    var downLeft = (destination.id === piece.cell.id + 18) && !rightColumn
    var downRight = (destination.id === piece.cell.id + 14) && !leftColumn

    switch (piece.direction) {
      case 'down':
        if  ( downLeft ) {
          if ( this.board.cells[piece.cell.id + 9].piece !== null && this.board.cells[piece.cell.id + 9].piece.player.color !== piece.player.color) {
            if ( execute ) {

              this.removeJumpedPiece(9,piece)
            }
            return true
          }
        }
        else if ( downRight ) {
          if ( this.board.cells[piece.cell.id + 7].piece !== null && this.board.cells[piece.cell.id + 7].piece.player.color !== piece.player.color) {
            if ( execute ) {

              this.removeJumpedPiece(7,piece)
            }
            return true
          }
        }
        else {
          return false
        }
        break
      case 'up':
      if  ( upLeft ) {
        if ( this.board.cells[piece.cell.id - 9].piece !== null && this.board.cells[piece.cell.id - 9].piece.player.color !== piece.player.color) {
          if ( execute ) {
            this.removeJumpedPiece(-9,piece)
          }
          return true
        }
      }
      else if ( upRight ) {
        if ( this.board.cells[piece.cell.id - 7].piece !== null && this.board.cells[piece.cell.id - 7].piece.player.color !== piece.player.color) {
          if ( execute ) {
            this.removeJumpedPiece(-7,piece)
          }
          return true
        }
      }
      else {
        return false
      }
        break
      case 'upanddown':
      if  ( upLeft ) {
        if ( this.board.cells[piece.cell.id - 9].piece !== null && this.board.cells[piece.cell.id - 9].piece.player.color !== piece.player.color) {
          if ( execute ) {
            this.removeJumpedPiece(-9,piece)
          }
          return true
        }
      }
      else if ( upRight ) {
        if ( this.board.cells[piece.cell.id - 7].piece !== null && this.board.cells[piece.cell.id - 7].piece.player.color !== piece.player.color) {
          if ( execute ) {
            this.removeJumpedPiece(-7,piece)
          }
          return true
        }
      }
      else if  ( downLeft ) {
        if ( this.board.cells[piece.cell.id + 9].piece !== null && this.board.cells[piece.cell.id + 9].piece.player.color !== piece.player.color) {
          if ( execute ) {
            this.removeJumpedPiece(9,piece)
          }
          return true
        }
      }
      else if ( downRight ) {
        if ( this.board.cells[piece.cell.id + 7].piece !== null && this.board.cells[piece.cell.id + 7].piece.player.color !== piece.player.color) {
          if ( execute ) {
            this.removeJumpedPiece(7,piece)
          }
          return true
        }
      }
      else {
        return false
      }

        break
      default:
        throw new Error("Perhaps no direction set")
    }
  }

  cellIsOccupied(destination) {
    return destination.piece !== null
  }

  move(cell, piece) {
    piece.cell.removePiece()
    cell.receivePiece(piece)
  }

  removeJumpedPiece(direction,piece) {
    this.board.lastPieceThatJumpped = piece;
    this.board.cells[piece.cell.id + direction].removePiece()
  }

  checkJumpAgain( piece ) {
    let canJumpAgain = false
    for (var i = 0; i < this.board.cells.length; i++) {
      if ( this.board.game.validJump(this.board.cells[i], piece, false) ) {
        canJumpAgain = true
      }
    }
    if (!canJumpAgain) {
      this.board.lastPieceThatJumpped = null
    }
    return canJumpAgain
  }
}
