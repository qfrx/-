<template>
    <div>
        <div class="UserInfo" v-if="userData">
            <div class="head-nav">
                <span>
                    <i class="iconfont icon-lingdang"></i>
                </span>
                <span>
                    <i class="iconfont icon-shezhi"></i>
                </span>
            </div>
            <div class="bg-box">
                <img :src="userData.backgroundUrl + '?param=400y400'" alt="">
                <div class="mark" :style=" `background-image: linear-gradient(to bottom, hsla(0, 0%, 0%, ${opacity}) 0%,#000000 100%);`"></div>
            </div>
            <div class="content">
                <div class="user-more">
                    <div class="img-box">
                        <img :src="userData.avatarUrl" alt="">
                    </div>
                    <div class="name">
                        <h3>{{ userData.nickname }}</h3>
                    </div>
                    <div class="des">
                        <span class="vip">
                            <span>vip</span>
                        </span>
                        <span class="sex">
                            <i class="iconfont icon-nansheng"></i>
                            21岁
                        </span>
                    </div>
                    <div class="count-box">
                        <span> <em>433</em> 关注</span>
                        <span> <em>3</em> 粉丝</span>
                        <span> <em>0</em> 获赞</span>
                    </div>
                </div>
                <div class="getVip">
                    <div class="img-box">
                        <img src="../assets/img/getviplogo.png" alt="">
                    </div>
                    <div class="center-box">
                        <h4>VIP天天送</h4>
                        <p>已领取3天,明日登录继续领取</p>
                    </div>
                    <div class="right">
                        <span>
                            <i class="iconfont icon-jiantouyou"></i>
                        </span>
                    </div>
                </div>
                <div class="content">
                    <van-tabs v-model="active">
                        <van-tab title="歌单">
                            <div class="tab-one">
                                <div class="title">
                                    <div class="left">
                                        <p>创建歌单</p>
                                    </div>
                                    <div class="right">
                                        <span>+</span>
                                        创建
                                    </div>
                                </div>
                                <div class="like-list" v-for="item in userSongList" :key="item.id" @click="openListPage(item.id)">
                                    <div class="img-box">
                                        <img :src="item.coverImgUrl" alt="">
                                    </div>
                                    <div class="des">
                                    <h4>{{ item.name }}</h4>
                                        <p><span>{{ item.trackCount }}</span>首</p>
                                    </div>

                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="下载">
                            <div class="tab-two">
                                <span>
                                    没有下载内容~
                                </span>
                            </div>
                        </van-tab>
                        <van-tab title="历史播放">历史播放</van-tab>
                    </van-tabs>
                </div>
            </div>
          
      
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import {getUser,getUsermore,getUserDetails,getUserUserList} from '../api/userInfo'

export default {
    data() {
        return {
            uid:null,
            active:0,
            userData:null,
            userSongList:null,
            opacity:0.1
            
        }
    },
    methods: {
        //获取当前登录账号id
        getUserFn(){
            getUser().then(data=>{
                this.uid = data.data.account.id
            })
        },
        //获取用户信息
        getUsermoreFn(){
            getUsermore({
                uid:this.uid
            }).then(data=>{
                console.log(data);
            })
        },
        //获取账号详情
        getUserDetailsFun(){
            getUserDetails().then(data=>{
                this.userData = data.profile
            })
        },
        // 获取用户歌单
        getUserUserListFun(){
            getUserUserList({
                uid:this.uid
            }).then(data=>{
                this.userSongList = data.playlist
            })
        },
        openListPage(id){ //跳转对应歌单页
            this.$store.commit("setListConId",id)
            this.$router.push('/listView')
        },
        scrolling() {
            // 滚动条距文档顶部的距离
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
               if (scrollTop>=0 && scrollTop<=200) {
                this.opacity = 0.1 +( (scrollTop/200) * 0.9)
               }
            },
    },
    watch:{
        'uid':function(){
            this.getUserDetailsFun()
            this.getUserUserListFun()
        }
    },
    computed:{
        ...mapState(['listId','songId'])
    },
    created() {
        this.getUserFn()
        this.$store.commit("setHomeTabFlag",true)
    },
    mounted() {
        window.addEventListener("scroll", this.scrolling);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrolling);
    },
}
</script>
<style lang="scss" scoped>
.UserInfo{
    .head-nav{
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span{
            background-color: rgba(255, 255, 255, 0.143);
            border-radius: 50%;
            padding: 3px;
            margin-right: 12px;
            i{
                font-size: 12px;
            }
        }
    }
    .bg-box{
        position:fixed;
        width: 100%;
        top: 0;
        left: 0;
        img{
            width: 100%;
        }
        .mark{
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .content{
        position: absolute;
        z-index: 10;
        width: 100%;
    }
    .user-more{
        margin-top: 150px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .img-box{
            img{
                width: 65px;
                height: 65px;
                border-radius: 50%;
            }
        }
        .name{
            margin-top: 15px;
            h3{
                font-size: 14px;
            }
        }
        .des{
            margin: 7px 0;
            display: flex;
            align-items: center;
            .vip{
                margin-right: 5px;
                span{
                    color: #00c561;
                    padding: 2px 5px;
                    zoom: .8;
                    background-color: #00c5633b;
                    font-size: 12px;
                    zoom: .8;

                }
            }
            .sex{
                display: flex;
                align-items: center;
                font-size: 12px;
                zoom: .8;
                i{
                    color: #1f7ab7;
                    font-weight: bolder;
                }
            }
        }
        .count-box{
            span{
                font-size: 12px;
                opacity: .8;
                zoom: .8;
                margin-right: 14px;
                em{
                    margin-right: 3px;
                }
            }
        }
    }
    .getVip{
        margin: 10px 0;
        background-color: #0d4026;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        margin-left: 12px;
        margin-right: 12px;
        .img-box{
            margin-right: 5px;
            img{
                width: 30px;
                height: 30px;
            }
        }
        .center-box{
            flex: 1;
            h4{
                font-size: 12px;
                zoom: .9;
            }
            p{
                font-size: 12px;
                zoom: .6;
                opacity: .7;
            }
        }
        .right{
            span{
                i{
                    font-size: 12px;
                    opacity: .7;
                    zoom: .7;

                }
            }
        }
       
    }
    .content{
        margin-top: 30px;
        width: 100%;
        ::v-deep .van-tabs__nav{
            background-color: #161616;
        }
        ::v-deep .van-tab__text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            zoom: .8;

        }
        ::v-deep .van-tab--active {
            .van-tab__text{
                color: #fff;
                font-weight: bold;
            }
        }
        ::v-deep .van-tabs__line{
            background-color: rgba(169, 168, 168, 0.759);
            width: 15px;
            top: 33px;
        }
        ::v-deep .van-tabs__nav {
            width: 50%;
        }
        .tab-one{
            background-color: #161616;
           .title{
            display: flex;
            font-size: 12px;
            justify-content: space-between;
            align-items: center;
            padding: 0 12px;
            .left{
                opacity: .7;
                p{
                    zoom: .8;

                }
            }
            .right{
                zoom: .8;
                span{
                    font-size: 18px;

                }
            }
           }
           .like-list{
                display: flex;
                align-items: center;
                padding: 0 12px;
                margin-top: 10px;
             
                .img-box{
                    margin-right: 12px;
                    img{
                        width: 45px;
                        height: 45px;
                        border-radius: 5px;
                    }
                }
                .des{
                    h4{
                        font-size: 12px;
                        zoom: .8;
                    }
                    p{
                        font-size: 12px;
                        zoom: .8;
                        span{
                            padding: 3px;

                        }
                    }
                }
           }
        }
        .tab-two{
            padding: 0 12px;
            font-size: 12px;
            margin-top: 10px;
        }
    }

}
    
</style>