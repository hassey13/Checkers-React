import * as userActions from './userActions'
import * as boardActions from './boardActions'

export const loginUser = ( credentials ) => userActions.loginUser( credentials )
export const logoutUser = ( ) => userActions.logoutUser( )

export const addBoard = ( board ) => boardActions.addBoard( board )
export const loadBoard = ( boardId ) => boardActions.loadBoard( boardId )
