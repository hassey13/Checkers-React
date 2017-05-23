import React from 'react'

const Match = ( props ) => {

  let divClass = props.selected ? 'game-item selected' : 'game-item'

  let ownMatch = props.players[0].username === props.user.username || props.players[1].username === props.user.username
  let opponent = props.players[0].username === props.user.username ? props.players[1].username : props.players[0].username

  let textContent = ownMatch ? `Match versus ${ opponent }` : `Match between ${ props.players[0].username } and ${ props.players[1].username }`

  return (
    <div onClick={ () => { props.handleSelectGame( props.board ) } } >
        <p className={ divClass }>{ textContent }</p>
    </div>
  )
}

export default Match
