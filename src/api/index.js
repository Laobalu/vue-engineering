import localApi from './localApi'
import prodApi from './prodApi'

const _env = process.env.NODE_ENV
const api = _env === 'development' ? localApi : prodApi

export default api
