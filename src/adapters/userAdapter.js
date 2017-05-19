import axios from './index'

export const userAdapter = {

  loginUser: ( credentials ) => {

    return axios.get(`/users/${credentials.username}`).then( response => response.data.user )
  },

  queryUsers: ( query ) => {
    // return axios.get(`searchusers/${query}`).then(response => response.data)
  },

}
