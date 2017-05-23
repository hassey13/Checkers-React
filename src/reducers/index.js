import { combineReducers } from 'redux'

import invitesReducer from './invitesReducer'
import notificationsReducer from './notificationsReducer'
import userReducer from './userReducer'
import boardReducer from './boardReducer'

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  invites: invitesReducer,
  board: boardReducer
})

export default rootReducer
