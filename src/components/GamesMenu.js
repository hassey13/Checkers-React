import React from 'react'

import Game from './Game'

const GamesMenu = ( props ) => {
  let className = props.show ? 'games-menu' : 'hide'

  if ( props.games.length === 0 ) {
    return (
      <div className={ className } >
        <div className='menu-dismiss' onClick={ props.onDismiss } >X</div>
        <div className='games-menu-title'>List of Active Games</div>
        <div className='games-menu-content'>No active games</div>
      </div>
    )
  }

  return (
    <div className={ className } >
      <div className='menu-dismiss' onClick={ props.onDismiss } >X</div>

      <div className='games-menu-title'>List of Active Games</div>

      <div>
        {
          props.games.map( (game, i) => (
            <Game
              key={i}
              selectedGame={ props.selectedGame }
              selected={ props.selectedGame !== null && props.selectedGame._id.toString() === game._id.toString() }
              handleSelectGame={ props.handleSelectGame }
              user={ props.user }
              board={ game }
              {...game}
            />
          ) )
        }
      </div>

      <div className='menu-option' onClick={ props.onSubmit }>
        Load Game
      </div>
    </div>
  )
}

export default GamesMenu
