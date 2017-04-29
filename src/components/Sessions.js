import React from 'react'

const Sessions = ( props ) => {

  let user = !!props.user ? props.user[0].toUpperCase() : '?'

  return (
    <div className='sessions noselect' onClick={ props.onClick } >
      { user }
    </div>
  )
}

export default Sessions
