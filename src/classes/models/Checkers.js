import $ from 'jquery'


export default class Checkers {
  constructor() {
    this.name = 'Checkers'
    this.board = null
  }

  addBoard(board) {
    this.board = board
  }
  validMove(destination,piece) {
    if (this.cellIsOccupied(destination) || piece.player.color !== this.board.players[this.board.turn % 2].color) {
      return false
    }

    var leftColumn = piece.cell.id % 8 === 0
    var rightColumn = (piece.cell.id + 1) % 8 === 0

    var upLeft = (destination.id === piece.cell.id - 9) && !leftColumn
    var upRight = (destination.id === piece.cell.id - 7) &&  !rightColumn
    var downLeft = (destination.id === piece.cell.id + 9) && !rightColumn
    var downRight = (destination.id === piece.cell.id + 7) && !leftColumn

    switch (piece.direction) {
      case 'down':
        if ( downRight || downLeft ) {
          this.board.turn += 1;
          this.board.lastPieceThatJumpped = null;
          return true
        }
        else {
          return false
        }
      case 'up':
        if (upRight || upLeft) {
          this.board.turn += 1;
          this.board.lastPieceThatJumpped = null;
          return true
        }
        else {
          return false
        }
      case 'upanddown':
        if ( downRight || downLeft || upLeft || upRight ) {
          this.board.turn += 1;
          this.board.lastPieceThatJumpped = null;
          return true
        }
        else {
          return false
        }
      default:
        throw new Error("Perhaps no direction set")
    }
  }

  validJump(destination,piece) {
    if (this.board.lastPieceThatJumpped !== null && piece.player.color === this.board.lastPieceThatJumpped.player.color && piece.id === this.board.lastPieceThatJumpped.id ) {
      this.board.turn -= 1;
    }

    if (this.cellIsOccupied(destination) || piece.player.color !== this.board.players[this.board.turn % 2].color ) {
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
            this.removeJumpedPiece(9,piece)
            return true
          }
        }
        else if ( downRight ) {
          if ( this.board.cells[piece.cell.id + 7].piece !== null && this.board.cells[piece.cell.id + 7].piece.player.color !== piece.player.color) {
            this.removeJumpedPiece(7,piece)
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
          this.removeJumpedPiece(-9,piece)
          return true
        }
      }
      else if ( upRight ) {
        if ( this.board.cells[piece.cell.id - 7].piece !== null && this.board.cells[piece.cell.id - 7].piece.player.color !== piece.player.color) {
          this.removeJumpedPiece(-7,piece)
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
          this.removeJumpedPiece(-9,piece)
          return true
        }
      }
      else if ( upRight ) {
        if ( this.board.cells[piece.cell.id - 7].piece !== null && this.board.cells[piece.cell.id - 7].piece.player.color !== piece.player.color) {
          this.removeJumpedPiece(-7,piece)
          return true
        }
      }
      else if  ( downLeft ) {
        if ( this.board.cells[piece.cell.id + 9].piece !== null && this.board.cells[piece.cell.id + 9].piece.player.color !== piece.player.color) {
          this.removeJumpedPiece(9,piece)
          return true
        }
      }
      else if ( downRight ) {
        if ( this.board.cells[piece.cell.id + 7].piece !== null && this.board.cells[piece.cell.id + 7].piece.player.color !== piece.player.color) {
          this.removeJumpedPiece(7,piece)
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
    this.board.turn += 1;
    this.board.lastPieceThatJumpped = piece;

    if ( this.board.cells[piece.cell.id + direction].piece && this.board.cells[piece.cell.id + direction].piece.king ) {
      if ( this.board.cells[piece.cell.id + direction].piece.player.color === 'blue' ) {
        $('#blue-pieces').append(`<div id='${this.board.cells[piece.cell.id + direction].piece.id}' class='piece king-blue'></div>`)
      }
      else {
        $('#red-pieces').append(`<div id='${this.board.cells[piece.cell.id + direction].piece.id}' class='piece king-red'></div>`)
      }
    }
    else {
      if ( this.board.cells[piece.cell.id + direction].piece.player.color === 'blue' ) {
        $('#blue-pieces').append(`<div id='${this.board.cells[piece.cell.id + direction].piece.id}' class='piece piece-blue'></div>`)
      }
      else {
        $('#red-pieces').append(`<div id='${this.board.cells[piece.cell.id + direction].piece.id}' class='piece piece-red'></div>`)
      }
    }
    this.board.cells[piece.cell.id + direction].removePiece()

    this.board.checkEndOfGame()

  }
}
