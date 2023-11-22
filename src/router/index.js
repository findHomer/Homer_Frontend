import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      
      children :[
        {
          path:'mypage',
          name:'myPage',
          component: () => import("@/views/MyPageView.vue")
        }
      ]
    },
  ]
})

export default router
