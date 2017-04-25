import React from 'react'

import Cell from './Cell'

const Board = ( props ) => (
  <div className='frame'>
    <div className='container'>
      { props.cells.map( (cell, i) => (
          <Cell key={ i }
            onCellClick={ props.onCellClick}
            onPieceClick={ props.onPieceClick}
            {...cell} />
        ) ) }
    </div>
  </div>
)

export default Board
