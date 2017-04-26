import React from 'react'

const Winner = ( props ) => {

  let className = props.winner ? props.winner.toLowerCase() : 'hide'

  return (
    <div className={ props.winner ? 'winner' : 'hide' } >
      <div className={ className }>{ `${props.winner} WINS!` }</div>
    </div>
  )
}

export default Winner
