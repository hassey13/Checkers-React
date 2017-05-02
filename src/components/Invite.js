import React from 'react'

const Invite = ( props ) => {

  let containerClassName = props.ownInvite ? 'invite no-border' : 'invite'
  let formClassName = props.ownInvite ? 'hide' : 'invite-ar-form'

  return (
    <div className={containerClassName} >
        <p>{ `${props.invite.challenger} invited ${props.invite.challengee} to a match!` }</p>
      <form className={formClassName} onSubmit={ ( event ) => { props.onSubmit( event, props.invite.boardId, 'accept') } }>
        <input type='submit' className='invite-accept' value='Accept'/>
      </form>
      <form className={formClassName} onSubmit={ ( event ) => { props.onSubmit( event, props.invite.boardId, 'reject') } }>
        <input type='submit' className='invite-reject' value='Reject'/>
      </form>
      <div className='clear'></div>
    </div>
)}

export default Invite
