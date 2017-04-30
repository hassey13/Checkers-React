import React from 'react'

const GameInfo = ( props ) => {

  if ( !props.board.id ) {
    return (
      <div className='game-info' >
        <p className='small-font'>Local Match</p>
      </div>
    )
  }

  return (
    <div className='game-info' >
      <p className='small-font'>Match vs Someone Else!</p>
    </div>
  )
}

export default GameInfo
