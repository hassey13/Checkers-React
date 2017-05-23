import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../actions/index'

import PopupNotification from '../components/PopupNotification'
import Invites from '../components/Invites'
import ErrorComponent from '../components/Error'
import Game from './Game'
import UserSignIn from './UserSignIn'

const io = require('socket.io-client')

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000/api'
// axios.defaults.baseURL = 'https://react-checkers-server.herokuapp.com/api'

class App extends Component {
  constructor() {
    super()

    this.state = {
      socket: null,
      showInvites: false,
      loadBoard: null,
      inviteContent: '',
      invites: [],
      popupNotificationContent: null,
      content: ''
    }
    this.updateNotification = this.updateNotification.bind( this )
    this.handleAcceptedInvite = this.handleAcceptedInvite.bind( this )
  }

  componentWillMount() {
    const socket = io.connect('http://localhost:4000')
    // const socket = io.connect('https://react-checkers-server.herokuapp.com')

    this.setState({
      socket: socket,
      axios: axios
    })

    socket.on('invite', this.updateNotification  )
    socket.on('acceptedInvite', this.handleAcceptedInvite  )
  }

  updateNotification( invite ) {
    if ( this.props.user && 'username' in this.props.user && invite.challengee === this.props.user.username) {

      this.props.actions.addInvite( invite )

      this.setState({
        invites: [...this.state.invites, invite],
        notifications: this.state.notifications + 1
      })
    }
  }

  dismissPopupNotification() {
    this.setState({
      popupNotificationContent: null
    })
  }

  loadBoard() {
    this.setState({
      loadBoard: this.state.popupNotificationContent.boardId
    })
    this.dismissPopupNotification()
    this.dismissInvites()
  }

  loadedBoard() {
    this.setState({
      loadBoard: null
    })
  }

  showInvites( ) {
    this.setState({
      showInvites: true
    })
  }

  dismissInvites() {
    this.setState({
      showInvites: false
    })
  }

  onChangeInvite( event ) {
    this.setState({
      inviteContent: event.target.value
    })
  }

  handleAcceptedInvite( acceptedInvite ) {
    if ( this.props.user.length && acceptedInvite.challenger === this.props.user.username ) {
      let invites = this.state.invites.filter( (invite) => invite.boardId !== acceptedInvite.boardId )

      //opens notification that it was accepted and allows board load

      this.setState({
        invites: invites,
        popupNotificationContent: acceptedInvite
      })
    }
  }

  onSubmitPendingInvite( event, boardId, action ) {
    event.preventDefault()
    let invites = this.state.invites.filter( (invite) => invite.boardId !== boardId )
    let invite = this.state.invites.filter( (invite) => invite.boardId === boardId )[0]

    if ( action === 'accept') {
      invite.accepted = true
      invite.pending = false

      this.setState({
        showInvites: false,
        loadBoard: boardId,
        invites: invites,
        notifications: this.state.notifications - 1
      })

      this.state.socket.emit('acceptedInvite', invite )
      this.state.axios.post(`/boards/${boardId}`, { accepted: true } )
    }
    else {
      this.state.axios.post(`/boards/${boardId}`, { accepted: false } )

      this.setState({
        invites: invites,
        notifications: this.state.notifications - 1
      })
    }
  }


  onSubmitInvite( event ) {
    // let self = this
    event.preventDefault()

    if ( !(this.props.user && 'username' in this.props.user) ) {
      console.error('You must login to invite someone')
      return
    }

    let invite = {
      challenger: this.props.user.username,
      challengee: this.state.inviteContent
    }

    this.props.actions.inviteToGame( invite )
      .then( ( action ) => {
        // self.state.socket.emit('invite', action.payload )
      })
      .catch((error) => {
        console.error('Failed to start match!')
        console.error(error)
      })

    this.setState({
      showUserMenu: true,
      inviteContent: ''
    })

  }

  render() {
    const { actions } = this.props
    const user = this.props.user && 'username' in this.props.user ? this.props.user : null
    const board = !!this.props.board && 'id' in this.props.board ? this.props.board : []

    // Handles init of component
    if ( !this.state.axios || !this.state.socket ) {
      return(<div>Loading...</div>)
    }

    return (
      <div>
        <ErrorComponent
          message={ null }
          />
        <UserSignIn
          actions={ actions }
          user={ user }
          showInvites={ this.showInvites.bind( this )}
          />
        <Game
          actions={ actions }
          user={ user }
          axios={ this.state.axios }
          socket={ this.state.socket }
          board={ board }
          loadBoard={ this.state.loadBoard }
          loadedBoard={ this.loadedBoard.bind( this ) }
          />
        <PopupNotification
          content={ this.state.popupNotificationContent }
          onDismiss={ this.dismissPopupNotification.bind( this )}
          loadBoard={ this.loadBoard.bind( this )}
        />
        <Invites
          show={ this.state.showInvites }
          user={ user }
          invites={ this.props.invites }
          content={ this.state.inviteContent }
          onSubmit={ this.onSubmitInvite.bind( this ) }
          onChange={ this.onChangeInvite.bind( this ) }
          onDismiss={ this.dismissInvites.bind( this ) }
          onSubmitPendingInvite={ this.onSubmitPendingInvite.bind( this ) }
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    invites: state.invites,
    board: state.board
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
})}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )( App )
