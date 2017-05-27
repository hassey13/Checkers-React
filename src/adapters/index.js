import axios from 'axios'

const URL = 'http://localhost:4000/api'
// const URL = 'https://react-checkers-server.herokuapp.com/api'

axios.defaults.baseURL = URL
// axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('jwt')

export default axios
