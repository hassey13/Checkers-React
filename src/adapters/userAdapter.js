import axios from './index'

export const userAdapter = {

  signUpUser: ( credentials ) => {
    return axios.post('/users', credentials).then( response => response.data.user )
  },

  loginUser: ( credentials ) => {
    return axios.get(`/users/${credentials.username}`).then( response => response.data.user )
  },

  fetchActiveGames: ( user ) => {
    return axios.get(`/boards/users/${user.username}`).then( response => response.data )
  },

  queryUsers: ( query ) => {
    // return axios.get(`searchusers/${query}`).then(response => response.data)
  }

}
