import * as userActions from './userActions'
import * as boardActions from './boardActions'
import * as invitesActions from './invitesActions'
import * as notificationsActions from './notificationsActions'
import * as menuActions from './menuActions'

export const signUpUser = ( credentials ) => userActions.signUpUser( credentials )
export const loginUser = ( credentials ) => userActions.loginUser( credentials )
export const logoutUser = ( ) => userActions.logoutUser( )
export const fetchActiveGames = ( user ) => userActions.fetchActiveGames( user )

export const addBoard = ( board ) => boardActions.addBoard( board )
export const loadBoard = ( boardId ) => boardActions.loadBoard( boardId )
export const updatePiece = ( boardId, move ) => boardActions.updatePiece( boardId, move )
export const sendWinner = ( boardId, move ) => boardActions.sendWinner( boardId, move )
export const updateWinner = ( winner ) => boardActions.updateWinner( winner )
export const resignGame = ( boardId, user ) => boardActions.resignGame( boardId, user )

export const addInvite = ( invite ) => invitesActions.addInvite( invite )
export const inviteToGame = ( invite ) => invitesActions.inviteToGame( invite )
export const loadInvites = ( user ) => invitesActions.loadInvites( user )
export const respondInvite = ( user, invite ) => invitesActions.respondInvite( user, invite )
export const removeInvite = ( invite ) => invitesActions.removeInvite( invite )
export const clearInvites = ( ) => invitesActions.clearInvites( )

export const fetchRecentGames = ( ) => menuActions.fetchRecentGames( )

export const loadNotifications = ( count ) => notificationsActions.loadNotifications( count )
export const incrementNotifications = ( ) => notificationsActions.incrementNotifications( )
export const decrementNotifications = ( ) => notificationsActions.decrementNotifications( )
export const clearNotifications = ( ) => notificationsActions.clearNotifications( )
