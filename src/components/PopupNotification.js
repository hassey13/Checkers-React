import React from 'react'

const PopupNotification = ( props ) => {

  let className = !!props.content ? 'popup-notification' : 'hide'
  let content = !!props.content ? `Your invite to ${props.content.challengee} was accepted.` : ''

  return (
    <div className={ className }>
      <div className='popup-notification-dismiss' onClick={ props.onDismiss } >X</div>
      <p>{ content }</p>
      <div className='user-menu-button' onClick={ props.loadBoard }>
        Load Game
      </div>
    </div>
  )
}

export default PopupNotification
