import { combineReducers } from 'redux'

import notificationsReducer from './notificationsReducer'
import invitesReducer from './invitesReducer'
import menuReducer from './menuReducer'
import userReducer from './userReducer'
import boardReducer from './boardReducer'

const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  invites: invitesReducer,
  notifications: notificationsReducer,
  board: boardReducer
})

export default rootReducer
