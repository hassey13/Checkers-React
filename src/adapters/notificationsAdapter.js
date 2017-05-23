import axios from './index'

export const notificationsAdapter = {

  loadNotifications: ( user ) => {

    return axios.get(`/boards/users/${ user.username }`)
      .then( response => response.data[0] )
      .catch( err => err.message)
  }

  // dismissNotifications: ( user, invite ) => {
  //
  //   return axios.post(`/boards/${ boardId }`, { pending: false, accepted: false } )
  //     .then( response => response.data )
  //     .catch( err => err.message)
  // }

}
