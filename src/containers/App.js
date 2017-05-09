import React, { Component } from 'react'

import Sessions from '../components/Sessions'
import PopupNotification from '../components/PopupNotification'
import UserMenu from '../components/UserMenu'
import Invites from '../components/Invites'
import Game from './Game'

const io = require('socket.io-client')

import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:4000/api'
axios.defaults.baseURL = 'https://react-checkers-server.herokuapp.com/api'

class App extends Component {
  constructor() {
    super()

    this.state = {
      socket: null,
      user: null,
      showUserMenu: true,
      showInvites: false,
      loadBoard: null,
      inviteContent: '',
      invites: [],
      notifications: 0,
      popupNotificationContent: null,
      content: ''
    }
    this.updateNotification = this.updateNotification.bind( this )
    this.handleAcceptedInvite = this.handleAcceptedInvite.bind( this )
  }

  componentWillMount() {
    // const socket = io.connect('http://localhost:4000')
    const socket = io.connect('https://react-checkers-server.herokuapp.com')

    this.setState({
      socket: socket,
      axios: axios
    })

    socket.on('invite', this.updateNotification  )
    socket.on('acceptedInvite', this.handleAcceptedInvite  )

    // axios.get(`/boards/${this.state.user}`)
    //   .then( ( response ) => {
    //     console.log(response.data)
    //   })
  }

  updateNotification( invite ) {
    if (invite.challengee === this.state.user) {
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

  handleAcceptedInvite( acceptedInvite ) {
    if (acceptedInvite.challenger === this.state.user) {
      let invites = this.state.invites.filter( (invite) => invite.boardId !== acceptedInvite.boardId )

      this.setState({
        invites: invites,
        popupNotificationContent: acceptedInvite
      })
    }
  }

  toggleUserMenu() {
    this.setState({
      showUserMenu: !this.state.showUserMenu
    })
  }

  dismissInvites() {
    this.setState({
      showInvites: false
    })
  }

  showInvites( ) {
    this.setState({
      showInvites: true
    })
  }

  onChange( event ) {
    this.setState({
      content: event.target.value
    })
  }

  onChangeInvite( event ) {
    this.setState({
      inviteContent: event.target.value
    })
  }

  onLogout( event ) {
    this.setState({
      user: null,
      showUserMenu: false,
      showInvites: false,
      invites: [],
      notifications: 0
    })
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

  loadedBoard() {
    this.setState({
      loadBoard: null
    })
  }

  // Login
  onSubmit( event ) {
    event.preventDefault()

    let credentials = { username: this.state.content }

    axios.get(`/users/${credentials.username}`)
      .then( response => {
        let username = response.data.user.username

        axios.get(`/boards/users/${ username }`)
          .then( response => {
            let pendingGames = [];

            for (let i = 0; i < response.data.length; i++) {
              if ( response.data[i].pending ) {
                response.data[i].boardId = response.data[i]._id
                response.data[i].challenger = response.data[i].players[0].username
                response.data[i].challengee = response.data[i].players[1].username
                pendingGames.push( response.data[i] )
              }
            };

            this.setState({
              user: username,
              showUserMenu: true,
              invites: pendingGames,
              notifications: pendingGames.length,
              content: ''
            });
          });

      })
      .catch((error) => {
          console.warn('Failed to find user!')
          console.log('Attempting to create the user instead!')
          axios.post('/users', credentials)
            .then( response => {
              console.log('Success creating user!')
              this.setState({
                user: response.data.user.username,
                showUserMenu: true,
                content: ''
              })
            })
            .catch((error) => {
                console.error('Could not create user either! =(')
                console.error(error)
                return {error: error}
            })
        })
  }

  onSubmitInvite( event ) {
    event.preventDefault()

    if ( !this.state.user ) {
      console.error('You must login to invite someone')
      return
    }

    let credentials = {
      challenger: this.state.user,
      challengee: this.state.inviteContent
    }

    axios.post('/boards', credentials)
      .then( response => {
        credentials.boardId = response.data.board._id.toString()
        this.setState({
          invites: [...this.state.invites, { ...credentials, accepted: false, pending: true } ],
          showUserMenu: true,
          inviteContent: ''
        })
        this.state.socket.emit('invite', credentials )
      })
      .catch((error) => {
        console.error('Failed to start match!')
        console.error(error)
      })

  }

  render() {

    if ( !this.state.axios || !this.state.socket ) {
      return(<div>Loading...</div>)
    }

    return (
      <div>
        <Sessions
          user={ this.state.user }
          notifications={ this.state.notifications }
          onClick={ this.toggleUserMenu.bind( this )} />
        <PopupNotification
          content={ this.state.popupNotificationContent }
          onDismiss={ this.dismissPopupNotification.bind( this )}
          loadBoard={ this.loadBoard.bind( this )}
        />
        <UserMenu
          show={ this.state.showUserMenu }
          user={ this.state.user }
          notifications={ this.state.notifications }
          showInvites={ this.showInvites.bind( this )}
          onLogout={ this.onLogout.bind( this )}
          onSubmit={ this.onSubmit.bind( this )}
          onChange={ this.onChange.bind( this )}
          content={ this.state.content }
        />
        <Invites
          show={ this.state.showInvites }
          user={ this.state.user }
          invites={ this.state.invites }
          content={ this.state.inviteContent }
          onSubmit={ this.onSubmitInvite.bind( this ) }
          onChange={ this.onChangeInvite.bind( this ) }
          onDismiss={ this.dismissInvites.bind( this ) }
          onSubmitPendingInvite={ this.onSubmitPendingInvite.bind( this ) }
          />
        <Game
          axios={ this.state.axios }
          socket={ this.state.socket }
          user={ this.state.user }
          loadBoard={ this.state.loadBoard }
          loadedBoard={ this.loadedBoard.bind( this ) }
        />
      </div>
    )
  }
}

export default App
