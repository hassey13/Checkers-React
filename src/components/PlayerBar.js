import React from 'react'

import GameInfo from './GameInfo'
import TurnIndicator from './TurnIndicator'

const PlayerBar = ( props ) => {
  return (

    <div className='player-bar-container'>
      <GameInfo
        board={ props.board }
        user={ props.user }
      />
    <TurnIndicator board={ props.board } />
    </div>
  )
}

export default PlayerBar
