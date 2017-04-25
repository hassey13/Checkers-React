export default class Piece {
  constructor(player,id,cell = null) {
    this.player = player
    this.cell = cell
    this.king = false
    this.direction = this.allowedDirection()
    this.id = id
  }
  alive() {
    return this.cell !== null
  }

  allowedDirection() {
    return this.player.color === 'blue' ? 'down' : 'up'
  }

  kingMe() {
    this.king = true
    this.direction = 'upanddown'
  }

  receiveCell(cell) {
    this.cell = cell
  }

  removeCell() {
    this.cell = null
  }

}
