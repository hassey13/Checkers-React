import React from 'react'

import Piece from './Piece'

const Cell = ( props ) => {

  let className = props.highlight ? `cell ${props.color} highlight` : `cell ${props.color}`

  if ( props.piece ) {
    return (
      <div className={className} >
        <Piece {...props.piece} onPieceClick={ props.onPieceClick } />
      </div>
    )
  }
  return (
  <div className={className} onClick={ () => { props.onCellClick( props ) } } >

  </div>
)}

export default Cell
