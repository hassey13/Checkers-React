import React from 'react'

import Piece from './Piece'

const Cell = ( props ) => {

  if ( props.piece ) {
    return (
      <div className={`cell ${props.color}`} >
        <Piece {...props.piece} onPieceClick={ props.onPieceClick } />
      </div>
    )
  }
  return (
  <div className={`cell ${props.color}`} onClick={ () => { props.onCellClick( props ) } } >
  </div>
)}

export default Cell
