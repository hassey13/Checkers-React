import { userAdapter } from '../adapters/userAdapter'

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export const signUpUser = ( credentials ) => {
  const response = userAdapter.signUpUser( credentials )

  return {
    type: LOGIN_USER,
    payload: response
  }
}

export const loginUser = ( credentials ) => {
  const response = userAdapter.loginUser( credentials )

  return {
    type: LOGIN_USER,
    payload: response
  }
}

export const logoutUser = () => {

  return {
    type: LOGOUT_USER,
    payload: null
  }
}
