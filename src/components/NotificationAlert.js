import React from 'react'

const NotificationAlert = ( props ) => {

  let className = !!props.number ? 'notification-alert' : 'hide'
  className = props.invites && !!props.number ? 'notification-alert-invites' : className

  return (
    <div className={ className }>
      { props.number }
    </div>
  )
}

export default NotificationAlert
