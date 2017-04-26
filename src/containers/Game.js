import React, { Component } from 'react'

import GameBoard from '../components/Board'
import PlayerBar from '../components/PlayerBar'
import Options from '../components/Options'
import Rules from '../components/Rules'
import Winner from '../components/Winner'

import Checkers from '../classes/models/Checkers.js'
import Board from '../classes/models/Board.js'
import Player from '../classes/models/Player.js'

import Menu from './Menu'

class Game extends Component {

  constructor() {
    super()

    this.state = {
      board: null,
      piece: null,
      showMenu: false,
      showRules: false,
      turn: 'blue',
      winner: null,
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

  updateBoard() {
    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let playerOne = new Player('blue', "BLUE", board)
    let playerTwo = new Player('red', "RED" , board)
    board.addPlayers( playerOne , playerTwo )
    board.placePieces()

    this.setState( {
      board: board,
      piece: null,
      showMenu: false,
      showRules: false,
      turn: 'blue',
      winner: null,
      highlightedCells: []
    })
  }

  onOptionsClick() {
    this.setState( {
      showMenu: !this.state.showMenu
    })
  }

  dismissMenu() {
    this.setState( {
      showMenu: false
    })
  }

  dismissRules() {
    this.setState( {
      showRules: false
    })
  }

  showRules() {
    this.setState( {
      showRules: true
    })
  }

  onCellClick( cell ) {
    if ( this.state.piece ) {
        this.state.board.status( this.state.piece, cell )
        this.setState( {
          piece: null,
          highlightedCells: [],
          winner: this.state.board.checkEndOfGame()
        } )

    }
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
        <PlayerBar board={ this.state.board } />
        <Options onClick={ this.onOptionsClick.bind( this ) } />
        <Menu
          show={ this.state.showMenu }
          onDismiss={ this.dismissMenu.bind( this ) }
          showRules={ this.showRules.bind( this ) }
          updateBoard={ this.updateBoard.bind( this ) }
        />
        <Rules show={ this.state.showRules } onDismiss={ this.dismissRules.bind( this ) } />
        <Winner winner={ this.state.winner } />
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
