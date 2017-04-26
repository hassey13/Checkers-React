import React from 'react'

const TurnIndicator = ( props ) => {


  return (
    <div className={`turn-indicator ${props.turn}`} >
      { `${props.turn.toUpperCase()}'s Turn` }
    </div>
  )
}

export default TurnIndicator
