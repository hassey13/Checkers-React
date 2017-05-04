import React, { Component } from 'react'

import GamesMenu from '../components/GamesMenu'
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
      session: Math.random() * 1000000000,
      games: [],
      selectedGame: null,
      board: null,
      piece: null,
      showMenu: false,
      showGamesMenu: false,
      showRules: false,
      turn: '',
      winner: null,
      highlightedCells: []
    }
    this.socketUpdateBoard = this.socketUpdateBoard.bind(this)
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
      board: board
    } )

    if ( this.props.socket ) {
      this.props.socket.on('move', this.socketUpdateBoard  )
    }

  }

  componentWillReceiveProps(nextProps) {
    if ( !!nextProps.loadBoard ) {
      this.loadBoard( nextProps.loadBoard )
      this.props.loadedBoard()
    }
  }

  socketUpdateBoard( move ) {
    if ( move.boardId === this.state.board.id && this.state.session !== move.session ) {

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

  newBoard() {
    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let player = this.props.user ? this.props.user : null

    let playerOne = new Player('blue', "Blue", board, player)
    let playerTwo = new Player('red', "Red" , board)
    board.addPlayers( playerOne , playerTwo )
    board.placePieces()

    this.setState( {
      board: board
    })
  }

  loadBoard( id ) {
    if ( !id || typeof id !== 'string' ) {
      id = this.state.selectedGame._id.toString()
    }

    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let playerOne
    let playerTwo

    this.props.axios.get(`/boards/${id}`)
      .then( response => {

        new Promise( (resolve, reject) => {
          let boardFromServer = response.data[0]
          board.id = boardFromServer._id.toString()
          board.turn = boardFromServer.turn
          playerOne = new Player('blue', "BLUE", board, boardFromServer.players[0].username )
          playerTwo = new Player('red', "RED" , board, boardFromServer.players[1].username )

          board.addPlayers( playerOne , playerTwo )

          boardFromServer.pieces.forEach( (piece, i) => {
            if ( piece.cellId !== null ) {
              if ( piece.color === 'blue' ) {
                let selectedPiece = board.players[0].pieces[piece.id-1]
                selectedPiece.king = piece.king

                // board.cells[piece.cellId].removePiece()
                board.cells[piece.cellId].receivePiece(selectedPiece)
                selectedPiece.receiveCell(board.cells[piece.cellId])
              }
              else {
                let selectedPiece = board.players[1].pieces[piece.id-1]
                selectedPiece.king = piece.king

                // board.cells[piece.cellId].removePiece()
                board.cells[piece.cellId].receivePiece(selectedPiece)
                selectedPiece.receiveCell(board.cells[piece.cellId])
              }
            }
            else {
              //populate lost piece
            }
          })

          setInterval( () => {
            if ( board.players[1].pieces.length === 12 ) {
              resolve()
            }
          },10)
        })
        .then( () => {
          this.setState( {
            board: board,
            piece: null,
            showMenu: false,
            showGamesMenu: false,
            showRules: false,
            turn: board.turn,
            winner: board.winner,
            highlightedCells: []
          })
        })
      })
      .catch((error) => {
        console.error('Failed to start game')
        console.log(error)
        return {error: error}
      })
  }

  handleContinueGame() {
    if ( this.props.user === null ) {
      console.warn('Must be logged in to continue game!')
      return
    }

    this.props.axios.get(`/boards/users/${this.props.user}`)
      .then( (response) => {
        let games = response.data.filter( (game, i) => game.accepted || !game.pending )

        this.setState({
          games: games,
          showMenu: false,
          showGamesMenu: true
        })
      })
  }

  handleSelectGame( board ) {
    this.setState({
      selectedGame: board
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

  dismissGamesMenu() {
    this.setState( {
      showGamesMenu: false
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

  playersTurn( board, user ) {
    return ( (board.turn === board.players[0].color && board.players[0].username === user) || (board.turn === board.players[1].color && board.players[1].username === user) )
  }

  onCellClick( cell ) {
    if ( this.state.piece && this.playersTurn( this.state.board, this.props.user ) ) {

        if ( this.state.board.game.validJump( cell, this.state.piece, false ) && !!this.state.board.id ) {
          console.log('sent taken piece')
          this.props.axios.post(`/boards/${this.state.board.id}`, {
            piece: {
              id: this.state.board.cells[ ( cell.id - ( ( cell.id - this.state.piece.cell.id ) / 2 ) )].piece.id,
              color: this.state.board.cells[ ( cell.id - ( ( cell.id - this.state.piece.cell.id ) / 2 ) )].piece.player.color,
              cellId: null
            }
          } )
        }

        this.state.board.status( this.state.piece, cell )

        this.props.socket.emit('move', {
          session: this.state.session,
          boardId: this.state.board.id,
          user: this.props.user,
          piece: {
            id: this.state.piece.id,
            color: this.state.piece.player.color
          },
          cell: cell.id
        } )

        this.props.axios.post(`/boards/${this.state.board.id}`, {
          turn: (this.state.piece.player.color === 'blue' ? 'red' : 'blue'),
          piece: {
            id: this.state.piece.id,
            color: this.state.piece.player.color,
            king: this.state.piece.king,
            cellId: this.state.piece.cell.id
          }
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
        <PlayerBar
          board={ this.state.board }
          user={ this.props.user }
          />
        <Options onClick={ this.onOptionsClick.bind( this ) } />
        <Menu
          show={ this.state.showMenu }
          onDismiss={ this.dismissMenu.bind( this ) }
          showRules={ this.showRules.bind( this ) }
          newBoard={ this.newBoard.bind( this ) }
          loadBoard={ this.loadBoard.bind( this ) }
          continueGame={ this.handleContinueGame.bind( this ) }
        />
        <GamesMenu
          show={ this.state.showGamesMenu }
          user={ this.props.user }
          selectedGame={ this.state.selectedGame }
          handleSelectGame={ this.handleSelectGame.bind( this ) }
          onDismiss={ this.dismissGamesMenu.bind( this ) }
          games={ this.state.games }
          loadBoard={ this.loadBoard.bind( this ) }
        />
        <Rules show={ this.state.showRules } onDismiss={ this.dismissRules.bind( this ) } />
        <Winner
          winner={ this.state.winner }
          board={ this.state.board } />
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
