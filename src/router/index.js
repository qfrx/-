import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      keep:true
    }
  },
  {
    path: '/PlayCon',
    name: 'PlayCon',
    component: ()=>import('../views/PlayCon.vue')
  },
  {
    path: '/PlayList',
    name: 'PlayList',
    component: ()=>import('../views/PlayList.vue')
  },{
    path: '/listView',
    name: 'listView',
    component: ()=>import('../views/listView.vue')
  },
  {
    path: '/commentView',
    name: 'commentView',
    component: ()=>import ('../views/commentView.vue')
  
  },
  {
    path: '/SearchView',
    name: 'SearchView',
    component: ()=>import ('../views/SearchView.vue')
  
  },{
    path: '/SearchResultView',
    name: 'SearchResultView',
    component: ()=>import ('../views/SearchResultView.vue')

  },
  {
    path: '/UserlInfo',
    name: 'UserlInfo',
    component: ()=>import('../views/UserlInfo.vue'),
    beforeEnter: (to, from, next) => {
      let token = window.localStorage.getItem("token");
      if (!token) {
        next('/LogonView')
        return
      }else{
        next()
      }
    },
    
  },
  {
    path: '/LogonView',
    name: 'LogonView',
    component: ()=>import ('../views/LogonView.vue')
  },
  {
    path: '/PhoneLogon',
    name: 'PhoneLogon',
    component: ()=>import ('../views/PhoneLogon.vue')
  }


  // {
  //   path: '/userInfo',
  //   name: 'userInfo',
  //   component : ()=>import('../views/UserInfo.vue'),
  //   // 独享路由守卫
  //   beforeEnter: (to, from, next) => {
  //     let token = window.localStorage.getItem("token");
  //     if (!token) {
  //       next('/login')
  //       return
  //     }else{
  //       next()
  //     }
  //   },
  //   meta:{
  //     player:true
  //   }
  // },
  

 
]

//   beforeEnter: (to, from, next) => {
//     let token = window.localStorage.getItem("token");
//     if (!token) {
//       next('/login')
//       return
//     }else{
//       next()
//     }
//   }




const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
