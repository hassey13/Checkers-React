import axios from './index'

export const boardAdapter = {

  loadBoard: ( boardId ) => {

    return axios.get(`/boards/${ boardId }`)
      .then( response => response.data[0] )
      .catch( err => err.message)
  },

  updatePiece: ( boardId, move ) => {
    return axios.post(`/boards/${ boardId }`, move)
      .then( response => response )
      .catch( err => err.message)
  },

  sendWinner: ( boardId, winner ) => {
    return axios.post(`/boards/${ boardId }`, winner)
      .then( response => response )
      .catch( err => err)
  },

  resignGame: ( boardId, user ) => {
    return axios.post(`/boards/${ boardId }`, { resign: user } )
      .then( response => response )
      .catch( err => {
        console.log(err.message); return {} })
  }

}
