import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入字体图标
import "./assets/font/iconfont.css";//引入本地
// import "./assets/font/iconfont"


// vant组件库安装
// https://vant-contrib.gitee.io/vant/v2/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian
// $cnpm i vant@latest-v2 -S
// $cnpm i babel-plugin-import -D
import { Swipe,Tab,Tabs,Sticky,Progress,PullRefresh,SwipeItem ,Loading , Popover, Lazyload, Toast ,Slider ,NavBar,NoticeBar,ShareSheet ,Search ,Checkbox,CheckboxGroup ,Field, Popup    } from 'vant';
Vue.use(Swipe).use(Tab).use(Tabs).use(Sticky ).use(Progress ).use(PullRefresh ).use(SwipeItem ).use(Loading ).use(Popover ).use(Lazyload ).use(Toast ).use(Slider ).use(NavBar).use(NoticeBar ).use(ShareSheet ).use(Search ).use(Checkbox).use(CheckboxGroup ).use(Field ).use(Popup );


import 'swiper/dist/css/swiper.min.css'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
