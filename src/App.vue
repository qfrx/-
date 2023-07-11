<template>
  <div class="main">
    <keep-alive>
      <router-view v-if="$route.meta.keep && !MainPlayerFlag"></router-view>
    </keep-alive>
    <router-view  v-if="!$route.meta.keep && !MainPlayerFlag"></router-view>
    <songs-player></songs-player>


      <main-player v-show="MainPlayerFlag"></main-player>
      <home-tab ></home-tab>
  </div>
</template>


<script>
import { mapState } from "vuex";
import HomeTab from './components/HomeTab.vue'
import SongsPlayer from './components/SongsPlayer.vue'
import MainPlayer from './components/MainPlayer.vue'
export default {
  components: { 
    HomeTab,
    SongsPlayer,
    MainPlayer
  },
 
  data() {
    return {
      playerId : null,
      listsId:null,
    }
  },
  methods: {



  },
  computed:{
        ...mapState(['MainPlayerFlag'])
  },
 
}
</script>

<style lang="scss">
// 公共css
@import "./assets/css/base.css"
</style>