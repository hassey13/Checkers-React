import React, { Component } from 'react'

import GamesMenu from '../components/GamesMenu'
import GameBoard from '../components/Board'
import PlayerBar from '../components/PlayerBar'
import Options from '../components/Options'
import Rules from '../components/Rules'
import Winner from '../components/Winner'

import Menu from './Menu'

import { createBoard } from '../helpers/board'


class Game extends Component {

  constructor() {
    super()

    this.state = {
      session: Math.random() * 1000000000,
      selectedGame: null,
      piece: null,
      showMenu: false,
      gameMenu: {
        show: false,
        games: [],
        submit: null
      },
      showRules: false,
      highlightedCells: []
    }
    this.socketUpdateBoard = this.socketUpdateBoard.bind(this)
    this.socketUpdateBoardWithResignation = this.socketUpdateBoardWithResignation.bind(this)
  }

  componentWillMount() {
    const board = createBoard()
    this.props.actions.addBoard( board )

    if ( this.props.socket ) {
      this.props.socket.on('move', this.socketUpdateBoard  )
      this.props.socket.on('resign', this.socketUpdateBoardWithResignation  )
    }
  }

  socketUpdateBoard( move ) {
    if ( move.boardId === this.props.board.id && this.state.session !== move.session ) {

      let piece = this.props.board.findPieceByIdAndColor( move.piece.id, move.piece.color );
      let cell = this.props.board.findCellById( move.cell );

      let board = this.props.board;
      board.status( piece, cell );

      if ( !this.props.board.winner  && !!this.props.board.checkEndOfGame() ) {
        this.props.actions.sendWinner( this.props.board.id, this.props.board.checkEndOfGame() )
      }

      this.setState({
        board: board
      })
    }
  }

  socketUpdateBoardWithResignation( resignation ) {
    if ( resignation.boardId === this.props.board.id && this.state.session !== resignation.session ) {
      console.log( resignation )
      this.props.actions.updateWinner( resignation.winner )
    }
  }

  newBoard() {
    const board = createBoard();
    this.props.actions.addBoard( board );
  }

  loadBoard( id ) {
    if ( !id || typeof id !== 'string' ) {
      id = this.state.selectedGame._id.toString()
    }

    this.props.actions.loadBoard( id )
      .then( ( action ) => {
        if ( !this.props.board.winner  && !!this.props.board.checkEndOfGame() ) {
          this.props.actions.sendWinner( this.props.board.id, this.props.board.checkEndOfGame() )
        }

        this.setState( {
          highlightedCells: [],
          piece: null,
          showMenu: false,
          gameMenu: {
            show: false,
            games: [],
            submit: null
          },
          showRules: false
        })
      })
      .catch((error) => {
        console.error('Failed to start game')
        console.log(error)
        return {error: error}
      })
  }

  handleContinueGame() {
    if ( !this.props.user ) {
      console.warn('Must be logged in to continue game!');
      return;
    }

    this.props.actions.fetchActiveGames( this.props.user )
      .then( () => {
        this.setState({
          showMenu: false,
          gameMenu: {
            show: true,
            games: this.props.user.games,
            submit: this.loadBoard.bind( this )
          }
        });
      })
      .catch( ( err ) => {
        console.error('Could not fetch games.')
        console.error(err.message)
      })
  }

  listRecentGames() {
    this.props.actions.fetchRecentGames()
      .then( () => {
        this.setState({
          showMenu: false,
          gameMenu: {
            show: true,
            games: this.props.menu.activeGames,
            submit: this.loadBoard.bind( this )
          }
        });
      })

  }

  userIsPlayingInMatch( user, board ) {
    for (let i = 0; i < board.players.length; i++) {
      if ( board.players[i].username === user.username ) {
        return true
      }
    }
    return false;
  }

  handleResignGame() {
    let user = this.props.user;

    if ( this.userIsPlayingInMatch( user, this.props.board ) ) {
      this.props.actions.resignGame( this.props.board.id, user );

      this.props.socket.emit('resign', {
        session: this.state.session,
        boardId: this.props.board.id,
        winner: this.props.board.players[0].username === user.username ? { username: this.props.board.players[1].username } : { username: this.props.board.players[0].username }
      } );
    }
    else {
      console.log('Cannot resign in a match you are not playing in.')
    }

  }

  handleSelectGame( board ) {
    this.setState({
      selectedGame: board
    });
  }

  onOptionsClick() {
    this.setState( {
      showMenu: !this.state.showMenu
    });
  }

  dismissMenu() {
    this.setState( {
      showMenu: false
    })
  }

  dismissGamesMenu() {
    let gameMenu = Object.assign({}, this.state.gameMenu, { show: false });
    this.setState( {
      gameMenu: gameMenu
    });
  }

  dismissRules() {
    this.setState( {
      showRules: false
    });
  }

  showRules() {
    this.setState( {
      showRules: true
    });
  }

  playersTurn( board, user ) {
    return ( (board.turn === board.players[0].color && board.players[0].username === user) || (board.turn === board.players[1].color && board.players[1].username === user) );
  }

  onCellClick( cell ) {
    let username = this.props.user ? this.props.user.username : null
    if ( this.state.piece && this.playersTurn( this.props.board, username ) ) {

      if ( this.props.board.game.validJump( cell, this.state.piece, false ) && !!this.props.board.id ) {

        //send jumped piece to server
        if ( this.props.board.id ) {
          let move = {
            piece: {
              id: this.props.board.cells[ ( cell.id - ( ( cell.id - this.state.piece.cell.id ) / 2 ) )].piece.id,
              color: this.props.board.cells[ ( cell.id - ( ( cell.id - this.state.piece.cell.id ) / 2 ) )].piece.player.color,
              cellId: null
            }
          }

          this.props.actions.updatePiece( this.props.board.id, move )
        }
      }

      //update the local board
      this.props.board.status( this.state.piece, cell )

      //emit the move to opponent
      this.props.socket.emit('move', {
        session: this.state.session,
        boardId: this.props.board.id,
        user: username,
        piece: {
          id: this.state.piece.id,
          color: this.state.piece.player.color
        },
        cell: cell.id
      } )

      //send moved piece to server
      if ( this.props.board.id ) {
        let move = {
          turn: (this.state.piece.player.color === 'blue' ? 'red' : 'blue'),
          piece: {
            id: this.state.piece.id,
            color: this.state.piece.player.color,
            king: this.state.piece.king,
            cellId: this.state.piece.cell.id
          }
        }
        this.props.actions.updatePiece( this.props.board.id, move )
      }

      if ( !!this.props.board.checkEndOfGame() ) {
        console.log(this.props.board.checkEndOfGame())
        this.props.actions.sendWinner( this.props.board.id, this.props.board.checkEndOfGame() )
      }

      this.setState( {
        piece: null,
        highlightedCells: []
      } )
    }
  }

  onPieceClick( piece ) {
    //highlight possible moves
    let cells = this.props.board.cells
    let highlightedCells = []

    for ( let i = 0; i < cells.length; i++ ) {
      if ( this.props.board.game.validMove(cells[i], piece, false) || this.props.board.game.validJump(cells[i], piece, false) ) {
        highlightedCells.push( cells[i] )
      }
    }

    this.setState({
      piece: piece,
      highlightedCells: highlightedCells
    });
  }

  render() {
    return (
      <div>
        <PlayerBar
          board={ this.props.board }
          user={ this.props.user }
          />
        <Options
          onClick={ this.onOptionsClick.bind( this ) } />
        <Menu
          board={ this.props.board }
          user={ this.props.user }
          show={ this.state.showMenu }
          onDismiss={ this.dismissMenu.bind( this ) }
          showRules={ this.showRules.bind( this ) }
          newBoard={ this.newBoard.bind( this ) }
          loadBoard={ this.loadBoard.bind( this ) }
          handleContinueGame={ this.handleContinueGame.bind( this ) }
          listRecentGames={ this.listRecentGames.bind( this ) }
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
        <Rules
          show={ this.state.showRules }
          onDismiss={ this.dismissRules.bind( this ) } />
        <Winner
          board={ this.props.board } />
        <GameBoard
          onPieceClick={ this.onPieceClick.bind( this ) }
          onCellClick={ this.onCellClick.bind( this ) }
          board={this.props.board}
          highlightedCells={this.state.highlightedCells} />
      </div>
    )
  }
}

export default Game
