export default [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
  }
]
