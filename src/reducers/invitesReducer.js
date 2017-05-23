export default function invitesReducer(state=[], action){

  switch (action.type) {

    case 'ADD_INVITE':
      return [ ...state , action.payload ]

    case 'LOAD_INVITES':
      return action.payload

    case 'REMOVE_INVITE':
      let invites = state.filter( (invite) => action.payload.boardId !== invite.boardId )
      return invites

    case 'CLEAR_INVITES':
      return []

    default:
      return state
  }
}
