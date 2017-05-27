import React from 'react'

import NotificationAlert from './NotificationAlert'

const UserMenu = ( props ) => {
  let loggedIn = !!props.user

  let user = loggedIn ? props.user.username : 'Not Logged In'
  let className = !!props.show ? 'user-menu' : 'hide'
  let buttonContainerClass = loggedIn ? 'user-menu-button-container' : 'hide'
  let showLoginForm = loggedIn ? 'hide' : 'login-form'
  let finePrint = loggedIn ? '' : "You don't have to signup"

  return (
    <div className={ className }>
      <div>
        <p className='username-font'>{ user }</p>
      </div>

      <div className={ buttonContainerClass }>
        <div className='user-menu-button' onClick={ props.showInvites }>
          Invites
          <NotificationAlert number={ props.notifications } invites={ true } />
        </div>
        <div className='user-menu-button' onClick={ props.onLogout }>
          Logout
        </div>
      </div>

      <div className={ showLoginForm } >
        <form onSubmit={ props.onSubmit } >
          <label className='username-label'>Username
          <input className='login-input' name='username' type='text' onChange={ props.onChange } value={ props.input } />
          </label>
          <input className='login-submit' type='submit' value='Login' />
        </form>

      </div>

      <p className='fine-print'>{ finePrint }</p>

    </div>
  )
}

export default UserMenu
