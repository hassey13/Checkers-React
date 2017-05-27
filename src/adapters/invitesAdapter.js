import axios from './index'

export const invitesAdapter = {

  inviteToGame: ( invite ) => {
    return axios.post(`/boards`, invite )
      .then( response => response.data )
      .catch( err => err.message)
  },

  loadInvites: ( user ) => {
    return axios.get(`/boards/users/${ user.username }`)
      .then( response => response.data )
      .catch( err => { console.error( err.message ) } )
  },

  respondInvite: ( user, invite ) => {
    return axios.post(`/boards/${invite.boardId}`, { accepted: invite.accepted } )
      .then( response => response.data )
      .catch( err => err.message)
  }

}
