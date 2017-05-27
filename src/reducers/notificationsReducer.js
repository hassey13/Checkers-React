export default function notificationsReducer(state=0, action){

  switch (action.type) {

    case 'LOAD_NOTIFICATIONS':
      return action.payload

    case 'INCREMENT_NOTIFICATIONS':
      return state + 1

    case 'DECREMENT_NOTIFICATIONS':
      return state > 0 ? state - 1 : 0

    case 'CLEAR_NOTIFICATIONS':
      return 0

    default:
      return state
  }
}
