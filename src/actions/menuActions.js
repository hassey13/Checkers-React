import { menuAdapter } from '../adapters/menuAdapter'

const ADD_RECENT_GAMES = 'ADD_RECENT_GAMES'

export const fetchRecentGames = ( ) => {
  const games = menuAdapter.fetchRecentGames( )
    .then( response => response )

  return {
    type: ADD_RECENT_GAMES,
    payload: games
  }
}
