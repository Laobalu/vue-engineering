import axios from './axios.js'

let base = {}
const home = {
  homeApi1: function (params) {
    return axios.get('/homeApi1', params)
  },
  homeApi2: function (params) {
    return axios.get('/homeApi2', params)
  }
}

const about = {
  aboutApi1: params => axios.get('/homeApi1', params),
  aboutApi2: params => axios.get('/homeApi2', params)
}

Object.assign(base, home, about)

export default base
