export default function menuReducer(state=[], action){

  switch (action.type) {

    case 'ADD_RECENT_GAMES':
      let menu = Object.assign( {}, state, { activeGames: [ ...action.payload ] } )
      return menu

    default:
      return state
  }
}
