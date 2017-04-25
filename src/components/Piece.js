import React from 'react'

const Piece = ( props ) => {
  let className = props.king ? `king-${props.player.color}` : `piece-${props.player.color}`
  return (
    <div className={`piece ${className}`} onClick={ () => { props.onPieceClick( props.cell.piece ) } }></div>
)}

export default Piece
