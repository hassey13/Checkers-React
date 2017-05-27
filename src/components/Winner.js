import React from 'react'

const Winner = ( props ) => {

  let someoneHasWon = !!props.board.winner

  if ( !('winner' in props.board) && !someoneHasWon  ) return (<div></div>);

  let className = someoneHasWon ? props.board.winner.color.toLowerCase() : 'hide'

  let winnerColor = someoneHasWon ? props.board.winner.color.toUpperCase() : 'No One!'
  let winner = props.board.winner && props.board.winner.username === props.board.players[0].username ? props.board.players[0].username : props.board.players[1].username

  return (
    <div className={ someoneHasWon ? 'winner' : 'hide' } >
      <div className={ className }>
        { winner && winner.length ? winner : winnerColor } wins!
      </div>
      <div>
        <p className='fine-print extra-small'>If there are pieces on the board your opponent resigned.</p>
      </div>
    </div>
  )
}

export default Winner
