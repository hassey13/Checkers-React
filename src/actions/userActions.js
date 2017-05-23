import { userAdapter } from '../adapters/userAdapter'

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const LOAD_ACTIVE_GAMES = 'LOAD_ACTIVE_GAMES'

export const signUpUser = ( credentials ) => {
  const response = userAdapter.signUpUser( credentials );

  return {
    type: LOGIN_USER,
    payload: response
  }
}

export const loginUser = ( credentials ) => {
  const response = userAdapter.loginUser( credentials );

  return {
    type: LOGIN_USER,
    payload: response
  }
}

export const logoutUser = () => {

  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export const fetchActiveGames = ( user ) => {
  const response = userAdapter.fetchActiveGames( user )
    .then( response => response.filter( (game, i) => game.accepted && !game.pending ) );

  return {
    type: LOAD_ACTIVE_GAMES,
    payload: response
  }
}
