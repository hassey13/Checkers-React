import React from 'react'

const Invite = ( props ) => {
  return (
    <div className='invite' >
      <p>{ `${props.challenger} invited ${props.challengee} to a match!` }</p>
    </div>
)}

export default Invite
