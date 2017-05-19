import React from 'react'

const Winner = ( props ) => {

  let someoneHasWon = !!props.board.winner

  if ( !('winner' in props.board) && !someoneHasWon  ) return (<div></div>);

  let className = someoneHasWon ? props.board.winner.color.toLowerCase() : 'hide'
  let winner = props.board.winner === "BLUE" ? props.board.players[0].username : props.board.players[1].username

  return (
    <div className={ someoneHasWon ? 'winner' : 'hide' } >
      <div className={ className }>
        { someoneHasWon ? props.board.winner.color : winner } wins!
      </div>
    </div>
  )
}

export default Winner
