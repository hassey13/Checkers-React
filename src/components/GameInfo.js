import React from 'react'

const GameInfo = ( props ) => {

  if ( !props.board.id ) {
    return (
      <div className='game-info' >
        <p className='small-font'>Global Match</p>
      </div>
    )
  }

  if ( props.board.players[0].username !== props.user && props.board.players[1].username !== props.user ) {
    return(
      <div className='game-info' >
        <p className='small-font'>{ `Match between ${props.board.players[0].username} and ${props.board.players[1].username}` }</p>
      </div>
    )
  }

  return (
    <div className='game-info' >
      <p className='small-font'>{ `Match against ${ props.board.players[0].username === props.user ? props.board.players[1].username : props.board.players[0].username}` }</p>
    </div>
  )
}

export default GameInfo
