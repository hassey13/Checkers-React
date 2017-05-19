import axios from './index'

export const boardAdapter = {

  loadBoard: ( boardId ) => {

    return axios.get(`/boards/${ boardId }`)
      .then( response => response.data[0] )
      .catch( err => err.message)
  },

  queryBoards: ( query ) => {
    // return axios.get(`searchusers/${query}`).then(response => response.data)
  },

}
