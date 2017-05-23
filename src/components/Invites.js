import React from 'react'

import Invite from './Invite'

const Invites = ( props ) => {

  let className = !!props.show ? 'invites' : 'hide'

  return (
    <div className={ className }>
      <div className='invites-dismiss' onClick={ props.onDismiss } >X</div>
      <p className='invites-title'>Pending Invites</p>
      <div className='invites-list'>
        { props.invites.length > 0 ? props.invites.map( (invite, i) => (
          <Invite
            key={i}
            ownInvite={ props.user.username === invite.challenger }
            onSubmit={ props.onSubmitPendingInvite }
            invite={ invite }
            accepted={ invite.accepted }
            pending={ invite.pending }
            />
          )
        ) : 'You have no invites' }
      </div>
      <div className='invite-form'>
        <form onSubmit={ props.onSubmit } >
          <label className='invite-label'>Challenge
          <input className='invite-input' type='text' onChange={ props.onChange } value={ props.content } />
          </label>
          <input type='submit' className='invite-submit' value='Invite' />
        </form>
      </div>
    </div>
  )
}

export default Invites
