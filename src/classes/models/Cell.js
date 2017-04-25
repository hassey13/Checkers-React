export default class Cell {
  constructor( id ) {
    this.id = id
    this.piece = null
    this.color = this.color( id )
  }

  color( id ) {
    if ( Math.floor((id) / 8) % 2 === 0 ) {
      return id % 2 === 0 ? 'white' : 'black'
    }
    else {
      return id % 2 === 0 ? 'black' : 'white'
    }
  }

  receivePiece(piece) {
    this.piece = piece
    piece.cell = this

    if ( (this.id > 56 && this.piece.player.color === "blue") || (this.id < 7 && this.piece.player.color === "red") ) {
      this.piece.kingMe();
    }
  }

  removePiece() {
    this.piece.removeCell()
    this.piece = null
  }

  occupied() {
    return this.piece === null ? false : true
  }

}
