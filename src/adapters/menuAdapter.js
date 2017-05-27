import axios from './index'
import { convertDate } from '../helpers/dateHelpers'

export const menuAdapter = {

  fetchRecentGames: ( ) => {
    let date = convertDate( new Date() );

    return axios.get(`/boards/query/lastUpdated=${ date },accepted=true`)
      .then( ( response ) => response.data.filter( (game, i) => game.accepted || !game.pending ) )
      .catch( err => err.message)
  }

}
