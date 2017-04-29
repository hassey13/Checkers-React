import React, { Component } from 'react'

import Sessions from '../components/Sessions'
import UserMenu from '../components/UserMenu'
import Invites from '../components/Invites'
import Game from './Game'

const io = require('socket.io-client')

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000/api'

class App extends Component {
  constructor() {
    super()

    this.state = {
      socket: null,
      user: null,
      showUserMenu: true,
      showInvites: false,
      invites: [],
      content: ''
    }
  }

  componentWillMount() {
    const socket = io.connect('http://localhost:4000')
    this.setState({
      socket: socket,
      axios: axios
    })
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

  onLogout( event ) {
    this.setState({
      user: null,
      showUserMenu: false,
      showInvites: false
    })
  }

  onSubmit( event ) {
    event.preventDefault()

    let credentials = { username: this.state.content }

    axios.get(`/users/${credentials.username}`)
      .then( response => {
        this.setState({
          user: response.data.user.username,
          showUserMenu: true,
          content: ''
        })
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
                console.warn('Could not create user either! =(')
                console.log(error)
                return {error: error}
            })
        })
  }

  render() {

    if ( !this.state.axios || !this.state.socket ) {
      return(<div>Loading...</div>)
    }

    return (
      <div>
        <Sessions user={ this.state.user } onClick={ this.toggleUserMenu.bind( this )} />
        <UserMenu
          show={ this.state.showUserMenu }
          user={ this.state.user }
          showInvites={ this.showInvites.bind( this )}
          onLogout={ this.onLogout.bind( this )}
          onSubmit={ this.onSubmit.bind( this )}
          onChange={ this.onChange.bind( this )}
          content={ this.state.content }
        />
        <Invites
          show={ this.state.showInvites }
          invites={ this.state.invites }
          onDismiss={ this.dismissInvites.bind( this ) }
          />
        <Game
          axios={ this.state.axios }
          socket={ this.state.socket }
          user={ this.state.user }
        />
      </div>
    )
  }
}

export default App
