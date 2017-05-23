import * as userActions from './userActions'
import * as boardActions from './boardActions'
import * as invitesActions from './invitesActions'
// import * as notificationsActions from './notificationsActions'

export const loginUser = ( credentials ) => userActions.loginUser( credentials )
export const logoutUser = ( ) => userActions.logoutUser( )

export const addBoard = ( board ) => boardActions.addBoard( board )
export const loadBoard = ( boardId ) => boardActions.loadBoard( boardId )
export const resignGame = ( boardId, user ) => boardActions.resignGame( boardId, user )

export const addInvite = ( invite ) => invitesActions.addInvite( invite )
export const inviteToGame = ( invite ) => invitesActions.inviteToGame( invite )
export const loadInvites = ( user ) => invitesActions.loadInvites( user )
export const rejectInvite = ( user, invite ) => invitesActions.rejectInvite( user, invite )
