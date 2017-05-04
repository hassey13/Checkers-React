import React from 'react'

import NotificationAlert from './NotificationAlert'

const Sessions = ( props ) => {

  let userInitial = !!props.user ? props.user[0].toUpperCase() : '?'

  return (
    <div className='sessions noselect' onClick={ props.onClick } >
      { userInitial }
      <NotificationAlert number={ props.notifications } />
    </div>
  )
}

export default Sessions
