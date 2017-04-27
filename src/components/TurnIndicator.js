import React from 'react'

const TurnIndicator = ( props ) => {


  return (
    <div className='turn-indicator' >
      <p className='small-font'>Turn</p>
      <p className={`turn-font ${props.turn}`}>{ `${props.turn.toUpperCase()}` }</p>
    </div>
  )
}

export default TurnIndicator
