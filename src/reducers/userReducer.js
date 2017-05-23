export default function userReducer(state=[], action){

  switch (action.type) {

    case 'LOGIN_USER':
      return action.payload

    case 'LOGOUT_USER':
      return []

    case 'LOAD_ACTIVE_GAMES':
      let user = Object.assign( {}, state, { games: [ ...action.payload ] })
      return user

    default:
      return state
  }
}
