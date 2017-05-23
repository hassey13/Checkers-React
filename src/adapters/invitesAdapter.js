import axios from './index'

export const invitesAdapter = {

  inviteToGame: ( invite ) => {

    return axios.post(`/boards`, invite )
      .then( response => {
        console.log(response.data)
        return response.data
      })
      .catch( err => err.message)
  },

  loadInvites: ( user ) => {

    return axios.get(`/boards/users/${ user.username }`)
      .then( response => response.data[0] )
      .catch( err => err.message)
  },

  respondInvite: ( user, invite ) => {

    return axios.post(`/boards/${ invite.board.id }`, { pending: false, accepted: false } )
      .then( response => response.data )
      .catch( err => err.message)
  }

}
