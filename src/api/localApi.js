import axios from './axios.js'

function getJson (file) {
  return `../mock/${file}.json`
}

let base = {}
const home = {
  homeApi1: function (params) {
    return axios.get(getJson('homeApi1'), params)
  },
  homeApi2: function (params) {
    return axios.get(getJson('homeApi2'), params)
  }
}

const about = {
  aboutApi1: parmas => axios.get(getJson('aboutApi1'), parmas),
  aboutApi2: params => axios.get(getJson('aboutApi2'), params)
}

Object.assign(base, home, about)

export default base
