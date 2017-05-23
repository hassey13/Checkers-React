import { invitesAdapter } from '../adapters/invitesAdapter'

const ADD_INVITE = 'ADD_INVITE'
const LOAD_INVITES = 'LOAD_INVITES'
const REJECT_INVITE = 'REJECT_INVITE'

export const addInvite = ( invite ) => {

  return {
    type: ADD_INVITE,
    payload: invite
  }
}
export const inviteToGame = ( invite ) => {
  const Invite = invitesAdapter.inviteToGame( invite )

  return {
    type: ADD_INVITE,
    payload: Invite
  }
}

export const loadInvites = ( user ) => {

  const Invites = invitesAdapter.loadInvites( user )
    .then( response => response.data )

  return {
    type: LOAD_INVITES,
    payload: Invites
  }
}

export const respondInvite = ( user, invite ) => {

  const Invite = invitesAdapter.respondInvite( user, invite )
    .then( response => response.data)

  return {
    type: REJECT_INVITE,
    payload: Invite
  }
}
