import React, { Component } from 'react'

import Sessions from '../components/Sessions'
import UserMenu from '../components/UserMenu'
import Invites from '../components/Invites'
import Game from './Game'

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      showUserMenu: true,
      showInvites: false,
      invites: [],
      content: ''
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

  onLogout( event ) {
    this.setState({
      user: null,
      showUserMenu: false,
      showInvites: false
    })
  }

  onSubmit( event ) {
    event.preventDefault()
    this.setState({
      user: this.state.content,
      showUserMenu: true,
      content: ''
    })
  }

  render() {
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
        <Game />
      </div>
    )
  }
}

export default App
