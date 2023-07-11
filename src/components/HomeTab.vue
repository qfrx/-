<template>
    <div>
        <div class="HomeTab" v-if="HomeTabFlag">
            <ul :style="{'background-color': TabIndex!=1?'#161616':'transparent'}">
                <li>
                  <span @click="openHome">
                        <i :class="['iconfont icon-erji' ,{'active':TabIndex==0}]" ></i>
                        <p :class="{'active':TabIndex==0}">发现</p>
                  </span>
                </li>
                <li>
                    <span  @click="openPlay">
                    
                        <!-- <i :class=" ['iconfont' , active==1?'iconfont icon-bofang1':'icon-tubiao_daohangcaidan'] "></i> -->
                        <i :class=" ['iconfont iconfont' , playflag?'icon-bofang' : 'icon-bofang1'] " v-if="TabIndex==1" @click="changePlay"></i>
                        <i :class=" ['iconfont icon-tubiao_daohangcaidan']" v-if="TabIndex!=1"></i>

                        <p v-show="TabIndex!=1">音乐</p>
                    </span>
                </li>
                <li>
                    <router-link to="/UserlInfo" tag="span" >
                        <i :class="['iconfont icon-yonghu',{'active':TabIndex==2}]" @click="openUser"></i>
                       <p :class="{'active':TabIndex==2}">我的</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default{
    data() {
        return {
            active:0,
        }
    },
    methods: {
        openHome(){
            if (this.TabIndex !==0) {
                this.$router.push('/home')
            }
            this.$store.commit("setTabIndex",0)
        },
        openPlay(){
            if (this.TabIndex!==1) {
                this.$router.push('/PlayCon')
            }
            this.$store.commit("setTabIndex",1)
            
        },
        openUser(){
            this.$store.commit("setTabIndex",2)
        },
        changePlay(){  // 暂停/播放
            this.$store.commit("setPlayflag",!this.playflag)
        },

    },
    computed:{
        ...mapState(['playflag','HomeTabFlag','TabIndex'])

    },
}
</script>

<style lang="scss">
.HomeTab{   
    ul{
        position: fixed;
        bottom: 0;
        z-index: 990;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40px;
        background-color: #161616;
        li{
            color: #fff;
            span{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                i{
                    font-size: 14px;
                    color: #b1b1b1;
                    &.icon-tubiao_daohangcaidan{
                        transform: rotateZ(-90deg) ;
                        font-weight: bold;
                    }
                    &.active{
                        color: #fff;
                    }
                    &.icon-bofang1{
                        color: #fff;
                        transform: scale(2.1) translateY(0px);
                    }
                    &.icon-bofang{
                        color: #fff;
                        transform: scale(2.1) translateY(0px);
                        
                    }
                }
                p{
                    font-size: 12px;
                    zoom: .6;
                    margin-top: 5px;
                    color: #6e6d6d;
                    &.active{
                        color: #fff;
                    }
                }
            }
        }
    }

}
    
</style>