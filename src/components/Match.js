import React from 'react'

const Match = ( props ) => {

  let opponent = props.players[0].username === props.user ? props.players[1].username : props.players[0].username
  let divClass = props.selected ? 'game-item selected' : 'game-item'

  return (
    <div onClick={ () => { props.handleSelectGame( props.board ) } } >
        <p className={ divClass }>{ `Match versus ${ opponent }` }</p>
    </div>
  )
}

export default Match
