import React, { Component } from 'react'

import GameBoard from '../components/Board'

import Checkers from '../classes/models/Checkers.js'
import Board from '../classes/models/Board.js'
import Player from '../classes/models/Player.js'

class Game extends Component {

  constructor() {
    super()

    this.state = {
      board: null,
      piece: null,
      turn: 'blue',
      highlightedCells: []
    }
  }

  componentWillMount() {
    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let playerOne = new Player('blue', "Blue", board)
    let playerTwo = new Player('red', "Red" , board)
    board.addPlayers( playerOne , playerTwo )
    board.placePieces()

    this.setState( {
      board: board
    } )
  }


  onCellClick( cell ) {
    if ( this.state.piece ) {
        this.state.board.status( this.state.piece, cell )
        this.setState( {
          piece: null,
          highlightedCells: []
        } )

    }
    this.state.board.checkEndOfGame()
  }

  onPieceClick( piece ) {
    let cells = this.state.board.cells
    let highlightedCells = []
    for (var i = 0; i < cells.length; i++) {
      if ( this.state.board.game.validMove(cells[i], piece, false) || this.state.board.game.validJump(cells[i], piece, false) ) {
        highlightedCells.push( cells[i] )
      }
    }
    this.setState( {
      piece: piece,
      highlightedCells: highlightedCells
    } )
  }

  render() {

    return (
      <div>
        <GameBoard
          onPieceClick={ this.onPieceClick.bind( this ) }
          onCellClick={ this.onCellClick.bind( this ) }
          cells={this.state.board.cells}
          highlightedCells={this.state.highlightedCells} />
      </div>
    )
  }
}

export default Game
