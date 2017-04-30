import React from 'react'

import GameInfo from './GameInfo'
import TurnIndicator from './TurnIndicator'

const PlayerBar = ( props ) => (
  <div className='player-bar-container'>
    <GameInfo
      board={ props.board }
      user={ props.user }
    />
    <TurnIndicator turn={ props.board.turn } />
  </div>
)

export default PlayerBar
