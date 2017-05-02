import React from 'react'

const Winner = ( props ) => {

  let className = props.winner ? props.winner.toLowerCase() : 'hide'
  let winner = props.winner === "BLUE" ? props.board.players[0].username : props.board.players[1].username

  return (
    <div className={ props.winner ? 'winner' : 'hide' } >
      <div className={ className }>{ winner === null ? props.winner : winner } wins!</div>
    </div>
  )
}

export default Winner
