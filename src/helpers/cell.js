export function determineHighlight( cells, cell ) {
  if (cells.length === 0) {
    return false
  }

  for (var i = 0; i < cells.length; i++) {
    if ( cells[i].id === cell.id ) {
      return true
    }
  }
  return false
}
