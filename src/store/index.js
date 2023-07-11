import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import createPersistedstate from "vuex-persistedstate"
export default new Vuex.Store({
  state: {
    viewActive:0,
    songId:null,
    listId:null,
    rangValue:0,
    playflag:false,
    rangeFlag:false,
    listConId:null,
    MainPlayerFlag:false,
    HomeTabFlag:false,
    TabIndex:0

  },
  mutations: {
    setViewActive(state,num){
    state.viewActive = num

   },
   setSongId(state,id){
      state.songId = id

   },
   setListId(state,id){
      state.listId = id
  },
  setRangValue(state,num){
    state.rangValue = num
  },
  setPlayflag(state,val){
    state.playflag = val
  },
  setRangeFlag(state,val){
    state.rangeFlag = val
  },
  setListConId(state,num){
    state.listConId = num
  },
  setMainPlayerFlag(state,val){
    state.MainPlayerFlag = val
  },
  setHomeTabFlag(state,val){
    state.HomeTabFlag = val
  },
  setTabIndex(state,num){
    state.TabIndex = num
  },


   
  },
  getters: {
  },
  actions: {
  },
  modules: {
  },
  
})
