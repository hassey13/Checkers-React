import React, { Component } from 'react'
import { connect } from 'react-redux'

import GamesMenu from '../components/GamesMenu'
import GameBoard from '../components/Board'
import PlayerBar from '../components/PlayerBar'
import Options from '../components/Options'
import Rules from '../components/Rules'
import Winner from '../components/Winner'

import Checkers from '../classes/Checkers.js'
import Board from '../classes/Board.js'
import Player from '../classes/Player.js'

import Menu from './Menu'

import { convertDate } from '../helpers/dateHelpers'

class Game extends Component {

  constructor() {
    super()

    this.state = {
      session: Math.random() * 1000000000,
      selectedGame: null,
      board: null,
      piece: null,
      showMenu: false,
      gameMenu: {
        show: false,
        games: [],
        submit: null
      },
      showRules: false,
      turn: '',
      winner: null,
      highlightedCells: []
    }
    this.socketUpdateBoard = this.socketUpdateBoard.bind(this)
    this.socketUpdateBoardWithResignation = this.socketUpdateBoardWithResignation.bind(this)
  }

  componentWillMount() {
    // let user = this.props.user.length ? this.props.user.username : null
    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let playerOne = new Player('blue', "Blue", board, null)
    let playerTwo = new Player('red', "Red" , board)
    board.addPlayers( playerOne , playerTwo )
    board.placePieces()

    this.setState( {
      board: board
    } )

    if ( this.props.socket ) {
      this.props.socket.on('move', this.socketUpdateBoard  )
      this.props.socket.on('resign', this.socketUpdateBoardWithResignation  )
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

  socketUpdateBoardWithResignation( resignation ) {
    if ( resignation.boardId === this.state.board.id && this.state.session !== resignation.session ) {

      this.setState({
        winner: resignation.winner
      })
    }
  }

  newBoard() {
    let game = new Checkers()
    let board = new Board(game)
    game.addBoard(board)

    let player = this.props.user.length ? this.props.user.username : null

    let playerOne = new Player('blue', "Blue", board, player)
    let playerTwo = new Player('red', "Red" , board)
    board.addPlayers( playerOne , playerTwo )
    board.placePieces()

    this.setState( {
      board: board,
      winner: null
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

          board.winner = boardFromServer.winner !== '' ? (boardFromServer.winner === board.players[0].username ? "BLUE" : "RED") : boardFromServer.winner

          boardFromServer.pieces.forEach( (piece, i) => {
            if ( piece.cellId !== null ) {
              if ( piece.color === 'blue' ) {
                let selectedPiece = board.players[0].pieces[piece.id-1]
                selectedPiece.king = piece.king

                board.cells[piece.cellId].receivePiece(selectedPiece)
                selectedPiece.receiveCell(board.cells[piece.cellId])
              }
              else {
                let selectedPiece = board.players[1].pieces[piece.id-1]
                selectedPiece.king = piece.king

                board.cells[piece.cellId].receivePiece(selectedPiece)
                selectedPiece.receiveCell(board.cells[piece.cellId])
              }
            }
            else {
              //populate lost piece on side of game?
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
            gameMenu: {
              show: false,
              games: [],
              submit: null
            },
            showRules: false,
            turn: board.turn,
            winner: board.winner !== '' ? board.winner : board.checkEndOfGame(),
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
    if ( this.props.user.length ) {
      console.warn('Must be logged in to continue game!')
      return
    }

    this.props.axios.get(`/boards/users/${this.props.user.username}`)
      .then( (response) => {
        let games = response.data.filter( (game, i) => game.accepted || !game.pending )

        this.setState({
          showMenu: false,
          gameMenu: {
            show: true,
            games: games,
            submit: this.loadBoard.bind( this )
          }
        })
      })
  }

  handleSpectateGame() {
    let date = convertDate( new Date() )
    console.log( date )
    this.props.axios.get(`/boards/query/lastUpdated=${ date }`)
      .then( (response) => {
        let games = response.data.filter( (game, i) => game.accepted || !game.pending )

        this.setState({
          showMenu: false,
          gameMenu: {
            show: true,
            games: games,
            submit: this.loadBoard.bind( this )
          }
        })
      })
  }

  handleResignGame( winner ) {
    this.props.axios.post(`/boards/${this.state.board.id}`, { winner: winner === "BLUE" ? this.state.board.players[0].username : this.state.board.players[1].username } );
    this.props.socket.emit('resign', {
      session: this.state.session,
      boardId: this.state.board.id,
      winner: winner
    } )

    this.setState({
      winner: winner
    });
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
    let gameMenu = Object.assign({}, this.state.gameMenu, { show: false })
    this.setState( {
      gameMenu: gameMenu
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
    let username = this.props.user.length ? this.props.user.username : null
    if ( this.state.piece && this.playersTurn( this.state.board, username ) ) {

      if ( this.state.board.game.validJump( cell, this.state.piece, false ) && !!this.state.board.id ) {

        if ( this.state.board.id ) {
          this.props.axios.post(`/boards/${this.state.board.id}`, {
            piece: {
              id: this.state.board.cells[ ( cell.id - ( ( cell.id - this.state.piece.cell.id ) / 2 ) )].piece.id,
              color: this.state.board.cells[ ( cell.id - ( ( cell.id - this.state.piece.cell.id ) / 2 ) )].piece.player.color,
              cellId: null
            }
          } )
        }
      }

      this.state.board.status( this.state.piece, cell )

      this.props.socket.emit('move', {
        session: this.state.session,
        boardId: this.state.board.id,
        user: username,
        piece: {
          id: this.state.piece.id,
          color: this.state.piece.player.color
        },
        cell: cell.id
      } )

      if ( this.state.board.id ) {
        this.props.axios.post(`/boards/${this.state.board.id}`, {
          turn: (this.state.piece.player.color === 'blue' ? 'red' : 'blue'),
          piece: {
            id: this.state.piece.id,
            color: this.state.piece.player.color,
            king: this.state.piece.king,
            cellId: this.state.piece.cell.id
          }
        } )
      }

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

    for ( let i = 0; i < cells.length; i++ ) {
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
          board={ this.state.board }
          user={ this.props.user }
          show={ this.state.showMenu }
          onDismiss={ this.dismissMenu.bind( this ) }
          showRules={ this.showRules.bind( this ) }
          newBoard={ this.newBoard.bind( this ) }
          loadBoard={ this.loadBoard.bind( this ) }
          handleContinueGame={ this.handleContinueGame.bind( this ) }
          handleSpectateGame={ this.handleSpectateGame.bind( this ) }
          handleResignGame={ this.handleResignGame.bind( this ) }
        />
        <GamesMenu
          show={ this.state.gameMenu.show }
          user={ this.props.user }
          selectedGame={ this.state.selectedGame }
          handleSelectGame={ this.handleSelectGame.bind( this ) }
          onDismiss={ this.dismissGamesMenu.bind( this ) }
          games={ this.state.gameMenu.games }
          onSubmit={ this.state.gameMenu.submit }
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
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
  )( Game )
