export default function boardReducer(state=[], action){

  switch (action.type) {

    case 'ADD_BOARD':
      return action.payload

    case 'LOAD_BOARD':
      return action.payload

    default:
      return state
  }
}
