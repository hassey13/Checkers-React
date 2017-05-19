import { searchAdapter } from '../adapters/searchAdapter'

const QUERY_STOCKS = 'QUERY_STOCKS'
const QUERY_USERS = 'QUERY_USERS'
const START_SEARCH = 'START_SEARCH'

export const queryStocks = (query) => {
  const response = searchAdapter.queryStocks(query)

  return {
    type: QUERY_STOCKS,
    payload: response
  }
}

export const queryUsers = (query) => {
  const response = searchAdapter.queryUsers(query)

  return {
    type: QUERY_USERS,
    payload: response
  }
}

export const startSearch = (value) => {
  return {
    type: START_SEARCH,
    payload: value
  }
}
