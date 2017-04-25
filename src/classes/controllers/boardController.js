import $ from 'jquery'

import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'

import Player from '../models/Player.js'

export default class BoardController {
  constructor(board) {
    var playerOne = new Player('blue', "Blue", board)
    var playerTwo = new Player('red', "Red" , board)
    board.addPlayers(playerOne,playerTwo)
    board.placePieces()
    this.addDragEventListener()
    this.addDropListiners(this)
    this.board = board
  }

  addDragEventListener() {
    $(".piece").draggable({ cursor: "crosshair", revert: "invalid", start: function(){
      $(this).data("origPosition",$(this).position());
    }});
  }

  addDropListiners(boardController) {
    $(".cell").droppable({
      drop: function(event, ui) {
        var dropped = ui.draggable;
        var droppedOn = $(this);

        if( boardController.board.status(dropped, droppedOn) ) {
          $(dropped).detach().css({top: 1,left: 1}).appendTo(droppedOn);
          if (boardController.board.findPiece(dropped).king) {
            if (boardController.board.findPiece(dropped).player.color === 'blue' ) {
              dropped.addClass('king-blue')
            }
            else {
              dropped.addClass('king-red')
            }
          }
        }
        else {
          dropped.remove()
          boardController.board.findPiece(dropped).cell.renderCell()
          // Change this to only add to piece that was moved
          boardController.addDragEventListener(boardController)
        }
      },
    });
  }
}
