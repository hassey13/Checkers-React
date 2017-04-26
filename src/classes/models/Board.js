import Cell from './Cell.js'

export default class Board {
  constructor(game = 'Checkers') {
    this.size = 8
    this.game = game
    this.cells = []
    this.generateGrid()
    this.players = []
    this.turn = 'blue'
    this.lastPieceThatJumpped = null
  }

  addPlayers(playerOne, playerTwo) {
    this.players = [playerOne, playerTwo]
  }

  generateGrid() {
    for (let i = 0; i < this.size * this.size ; i++) {
      this.cells.push(new Cell(i))
    }
  }

  placePieces() {
    var count = 0
    for (let i = 0; i < this.players[0].pieces.length * 2; i+=2) {
      if ( Math.floor(i / 8) % 2 === 0 ) {
        this.cells[i].receivePiece(this.players[0].pieces[count])
        this.players[0].pieces[count].receiveCell(this.cells[i])
        count++
      }
      else {
        this.cells[i+1].receivePiece(this.players[0].pieces[count])
        this.players[0].pieces[count].receiveCell(this.cells[i+1])
        count++
      }
    }
    count = 0
    for (let i = this.size * this.size - 1; i >= this.size * this.size - this.players[1].pieces.length * 2; i-=2) {
        if ( Math.floor(i / 8) % 2 === 0 ) {
          this.cells[i-1].receivePiece(this.players[1].pieces[count])
          this.players[1].pieces[count].receiveCell(this.cells[i-1])
          count++
        }
        else {
          this.cells[i].receivePiece(this.players[1].pieces[count])
          this.players[1].pieces[count].receiveCell(this.cells[i])
          count++
        }
    }
  }

  status(piece, cell) {
    let objCell = this.cells[cell.id]
    let wasAJump = this.game.validJump(objCell, piece, false)


    if (this.game.validMove(objCell, piece, true) || this.game.validJump(objCell, piece, true)) {
      this.game.move(objCell, piece)

      if ( wasAJump ) {
        if ( !this.game.checkJumpAgain( piece ) ) {
            this.game.board.turn = this.game.board.turn === 'blue' ? 'red' : 'blue';
          }
        }
      }

      return true
    }

  checkEndOfGame() {
    if (this.players[0].activePieceCount() === 0) {
      this.announceWinner(this.players[1])
    }
    else if (this.players[1].activePieceCount() === 0) {
      this.announceWinner(this.players[0])
    }
    return false
  }

  announceWinner(player) {
    setTimeout( () => {
      alert(`Game over! ${player.name.toUpperCase()} Wins!`)
    }, 500)
  }

}
