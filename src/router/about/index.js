export default [
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
  }
]
