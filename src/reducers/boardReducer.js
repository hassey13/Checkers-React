export default function boardReducer(state=[], action){

  switch (action.type) {

    case 'ADD_BOARD':
      return action.payload;

    case 'LOAD_BOARD':
      return action.payload;

    case 'UPDATE_PIECE':
      return state;

    case 'UPDATE_WINNER':
      if ( !state.players[0].username ) {
        return Object.assign( {}, state, { winner: state.checkEndOfGame() });
      }

      let player = state.players[0].username === action.payload.username ? state.players[0] : state.players[1]
      return Object.assign( {}, state, { winner: player });

    default:
      return state
  }
}
