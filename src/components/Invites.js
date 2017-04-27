import React from 'react'

const Invites = ( props ) => {

  let className = !!props.show ? 'invites' : 'hide'

  // let loggedIn = !!props.user ? 'user-menu-button-container' : 'hide'
  // let showLoginForm = !!props.user ? 'hide' : 'login-form'
  // let finePrint = !!props.user ? '' : "You don't have to signup"

  return (
    <div className={ className }>
      <div className='invites-dismiss' onClick={ props.onDismiss } >X</div>
      <p className='invites-title'>Pending Invites</p>
      <div className='invites-list'>
        { props.invites.length > 0 ? props.invites.map( (invite, i) => <div key={i} >Youre Invited</div> ) : 'You have no invites'}
      </div>
    </div>
  )
}

export default Invites
