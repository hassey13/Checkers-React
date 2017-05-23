export default function notificationsReducer(state=[], action){

  switch (action.type) {

    case 'ADD_BOARD':
      return action.payload

    default:
      return state
  }
}
