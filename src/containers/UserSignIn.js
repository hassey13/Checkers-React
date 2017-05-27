import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sessions from '../components/Sessions';
import UserMenu from '../components/UserMenu';

class UserSignIn extends Component {
  constructor() {
    super();

    this.state = {
      showUserMenu: true,
      showInvites: false,
      popupNotificationContent: null,
      input: ''
    };
  };

  toggleUserMenu() {
    this.setState({
      showUserMenu: !this.state.showUserMenu
    });
  };

  onChange( event ) {
    this.setState({
      input: event.target.value
    });
  };

  // Login
  handleSignIn( event ) {
    event.preventDefault();

    let self = this;
    let credentials = { username: this.state.input };

    this.props.actions.loginUser( credentials )
      .then( response => {
        if ( !response.payload ) {
          console.warn('Could not find user, attempting to create one instead!')

          self.props.actions.signUpUser( credentials )
            .then( response => {
              if ( !response.payload ) {
                console.error('Could not create user either! Server is down or username is invalid!');
              }
              else {
               self.props.actions.loadInvites( response.payload )
                 .then( (action) => {
                   self.props.actions.loadNotifications( action.payload.length )
                 })
              }
            })
        }
        else {
          self.props.actions.loadInvites( response.payload )
            .then( (action) => {
              self.props.actions.loadNotifications( action.payload.length )
            })
        }
      });

      this.setState({
        showUserMenu: true,
        input: ''
      });
  }

  onLogout( event ) {
    this.props.actions.clearInvites()
    this.props.actions.logoutUser()
    this.props.actions.clearNotifications()

    this.setState({
      showUserMenu: false,
      showInvites: false,
      invites: [],
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
