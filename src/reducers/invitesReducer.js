export default function invitesReducer(state=[], action){

  switch (action.type) {

    case 'ADD_INVITE':
      return [ ...state , action.payload ]

    case 'LOAD_INVITES':
      return action.payload

    case 'RESPOND_INVITE':
      return action.payload

    default:
      return state
  }
}
