import React from 'react'

const TurnIndicator = ( props ) => {

  let player = props.board.turn === props.board.players[0].color ? props.board.players[0].username : props.board.players[1].username

  return (
    <div className='turn-indicator' >
      <p className='small-font'>Turn</p>
      <p className={`turn-font ${props.board.turn}`}>{ player !== null ? player.toUpperCase() : props.board.turn.toUpperCase() }</p>
    </div>
  )
}

export default TurnIndicator
