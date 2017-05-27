import { combineReducers } from 'redux'

import invitesReducer from './invitesReducer'
import menuReducer from './menuReducer'
import userReducer from './userReducer'
import boardReducer from './boardReducer'

const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  invites: invitesReducer,
  board: boardReducer
})

export default rootReducer
