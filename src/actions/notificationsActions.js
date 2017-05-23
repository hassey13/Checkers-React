// import { notificationsAdapter } from '../adapters/notificationsAdapter'

// const ADD_INVITE = 'ADD_INVITE'
// const LOAD_INVITES = 'LOAD_INVITES'
// const REJECT_INVITE = 'REJECT_INVITE'

// export const addInvite = ( invite ) => {
//
//   return {
//     type: ADD_INVITE,
//     payload: invite
//   }
// }
//
// export const loadInvites = ( user ) => {
//
//   const Invites = notificationsAdapter.loadInvites( user )
//     .then( response => response.data )
//
//   return {
//     type: LOAD_INVITES,
//     payload: Invites
//   }
// }
//
// export const rejectInvite = ( user, invite ) => {
//
//   const Invite = notificationsAdapter.rejectInvite( user, invite )
//     .then( response => response.data)
//
//   return {
//     type: REJECT_INVITE,
//     payload: Invite
//   }
// }
