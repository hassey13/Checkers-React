import React from 'react'

import Cell from './Cell'
import { determineHighlight } from '../helpers/cell'

const Board = ( props ) => {

  const cells = 'cells' in props.board ? props.board.cells : []

  return (
    <div className='frame'>
      <div className='container'>
        { cells.map( (cell, i) => (
            <Cell key={ i }
              id={ i }
              onCellClick={ props.onCellClick}
              onPieceClick={ props.onPieceClick}
              highlight={ determineHighlight( props.highlightedCells, cell )  }
              {...cell} />
          ) ) }
      </div>
    </div>
  )
}

export default Board
