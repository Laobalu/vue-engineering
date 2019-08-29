import api from '../../api'

export default {
  state: {
    banner: [],
    content: []
  },
  mutations: {
    getBanner: (state, data) => {
      // debugger;
      state.banner = data
    }
  },
  actions: {
    // 用结构方式简写context.commit, 用荷载方式携带请求参数
    getBanner: async ({ commit }, param) => {
      const res = await api.homeApi1(param)
      return commit('getBanner', res.data)
    }
  },
  getters: {
    getBanner: state => state.banner
  }
}
