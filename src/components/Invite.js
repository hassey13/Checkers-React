import React from 'react'

const Invite = ( props ) => {

  let message = props.ownInvite ? `Pending invite with ${props.invite.challengee}!` : `${props.invite.challenger} invited you to a match!`;
  let containerClassName = props.ownInvite ? 'invite no-border' : 'invite';
  let formClassName = props.ownInvite ? 'hide' : 'invite-ar-form';

  return (
    <div className={containerClassName} >
        <p>{ message }</p>
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
