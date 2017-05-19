import React, { Component } from 'react'
import { connect } from 'react-redux'

import Sessions from '../components/Sessions'
import UserMenu from '../components/UserMenu'

class UserSignIn extends Component {
  constructor() {
    super()

    this.state = {
      showUserMenu: true,
      showInvites: false,
      notifications: 0,
      popupNotificationContent: null,
      input: ''
    }
  }

  toggleUserMenu() {
    this.setState({
      showUserMenu: !this.state.showUserMenu
    })
  }

  onChange( event ) {
    this.setState({
      input: event.target.value
    })
  }

  // Login
  handleSignIn( event ) {
    event.preventDefault()

    let credentials = { username: this.state.input }

    this.props.actions.loginUser( credentials )

    //
    //     // Get pending games, update invites and notifications
    //     this.props.axios.get(`/boards/users/${ username }`)
    //       .then( response => {
    //         let pendingGames = [];
    //
    //         for (let i = 0; i < response.data.length; i++) {
    //           if ( response.data[i].pending ) {
    //             response.data[i].boardId = response.data[i]._id
    //             response.data[i].challenger = response.data[i].players[0].username
    //             response.data[i].challengee = response.data[i].players[1].username
    //             pendingGames.push( response.data[i] )
    //           }
    //         };
    //
    //         this.setState({
    //           user: username,
    //           showUserMenu: true,
    //           invites: pendingGames,
    //           notifications: pendingGames.length,
    //           input: ''
    //         });
    //       });

      // .catch((error) => {
      //     console.warn('Failed to find user!')
      //     console.log('Attempting to create the user instead!')
      //     this.props.axios.post('/users', credentials)
      //       .then( response => {
      //         console.log('Success creating user!')
      //         this.setState({
      //           user: response.data.user.username,
      //           showUserMenu: true,
      //           input: ''
      //         })
      //       })
      //       .catch((error) => {
      //           console.error('Could not create user either! =(')
      //           console.error(error)
      //           return {error: error}
      //       })
      // })
  }

  onLogout( event ) {
    this.props.actions.logoutUser()

    this.setState({
      showUserMenu: false,
      showInvites: false,
      invites: [],
      notifications: 0
    })
  }

  render() {

    return (
      <div>
        <Sessions
          user={ this.props.user }
          notifications={ this.props.notifications }
          onClick={ this.toggleUserMenu.bind( this )} />
        <UserMenu
          show={ this.state.showUserMenu }
          user={ this.props.user }
          notifications={ this.props.notifications }
          showInvites={ this.props.showInvites }
          onLogout={ this.onLogout.bind( this )}
          onSubmit={ this.handleSignIn.bind( this )}
          onChange={ this.onChange.bind( this )}
          input={ this.props.input }
          />
      </div>
    )
  }

}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

export default connect(
  null,
  null
  )( UserSignIn )
