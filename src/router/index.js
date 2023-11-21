import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },

    {
      path: '/chat',
      name: 'chat',
      component: () => import("@/views/ChatView.vue"),
      children: [
        {
          path: 'chatrooms',
          name: 'chatrooms',
          component: () => import("@/components/chat/ChatRoomListComponent.vue"),
          // children : [
          //   {
          //     path :":id",
          //     name : 'chatroom',
          //     component: () => import("@/compenents/chat/ChatRoomInsideComponent.vue")
          //   }
          // ]
        }
      ]
    },

    {
      path:'/mypage',
      name: 'mypage',
      component: () => import("@/views/MyPage.vue")
    }
    
  ]
})

export default router
