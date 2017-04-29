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
      turn: '',
      winner: null,
      highlightedCells: []
    }
    this.socketUpdateBoard = this.socketUpdateBoard.bind( this )
  }

  componentWillMount() {
    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let playerOne = new Player('blue', "Blue", board, this.props.user)
    let playerTwo = new Player('red', "Red" , board)
    board.addPlayers( playerOne , playerTwo )
    board.placePieces()

    this.setState( {
      board: board,
      turn: board.turn
    } )

    if ( this.props.socket ) {
      this.props.socket.on('move', this.socketUpdateBoard  )
    }
  }

  socketUpdateBoard( move ) {
    if ( move.user !== this.props.user ) {

      let piece = this.state.board.findPieceByIdAndColor( move.piece.id, move.piece.color )
      let cell = this.state.board.findCellById( move.cell )

      let board = this.state.board
      board.status( piece, cell )
      this.setState({
        board: board,
        winner: board.checkEndOfGame()
      })
    }
  }

  loadBoard( id ) {

    //call for board from server

    // let boardFromServer = this.props.axios.get(`/boards/${id}`)
    //   .then( response => response )
    //   .catch((error) => {
    //       console.log('Failed to get board')
    //       console.log(error)
    //       return {error: error}
    //     })

    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    //set board properties

    let playerOne = new Player('blue', "BLUE", board, )
    let playerTwo = new Player('red', "RED" , board)
    board.addPlayers( playerOne , playerTwo )

    board.placePieces()

    //custom function to modify pieces based off board from server

    this.setState( {
      board: board,
      piece: null,
      showMenu: false,
      showRules: false,
      turn: board.turn,
      winner: board.winner,
      highlightedCells: []
    })
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
      turn: board.turn,
      winner: board.winner,
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

        this.props.socket.emit('move', {
          user: this.props.user,
          piece: {
            id: this.state.piece.id,
            color: this.state.piece.player.color
          },
          cell: cell.id
        } )

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
