import React from 'react'

import TurnIndicator from './TurnIndicator'

const PlayerBar = ( props ) => (
  <div className='player-bar-container'>
    <TurnIndicator turn={ props.board.turn } />
  </div>
)

export default PlayerBar
