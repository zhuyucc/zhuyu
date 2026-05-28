import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/projects', name: 'Projects', component: () => import('../views/Projects.vue') },
  { path: '/timeline', name: 'Timeline', component: () => import('../views/Timeline.vue') },
  { path: '/photowall', name: 'PhotoWall', component: () => import('../views/PhotoWall.vue') },
  { path: '/photowall/:albumId', name: 'PhotoAlbum', component: () => import('../views/PhotoAlbumDetail.vue') },
  { path: '/music', name: 'Music', component: () => import('../views/Music.vue') },
  { path: '/tree', name: 'Tree', component: () => import('../views/Tree.vue') },
  { path: '/moments', name: 'Moments', component: () => import('../views/Moments.vue') },
  { path: '/chatter', name: 'Chatter', component: () => import('../views/Chatter.vue') },
  { path: '/friends', name: 'Friends', component: () => import('../views/Friends.vue') },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/posts/:id', name: 'PostDetail', component: () => import('../views/PostDetail.vue') },
  { path: '/chatter/:id', name: 'ChatterDetail', component: () => import('../views/PostDetail.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  if (to.path.startsWith('/posts/') || to.path.startsWith('/chatter/')) {
    sessionStorage.setItem('back_target', from.fullPath)
  }
})

export default router
