<template>
    <div>
        <div class="listView" v-if="playlist">
            <div class="load-box" v-if="loadFlag">
                <van-loading color="#fff" size="26" />
            </div>
            <div class="head-nav">
                <div class="con">
                    <div class="back" @click="backPage">
                        <i class="iconfont icon-jiantouyou"></i>
                    </div>
                    <div class="right">
                        <span>
                            <i class="iconfont icon-caidan1"></i>
                        </span>
                        <span  @click="openBottomTab">
                            <i class="iconfont icon-more_vert"></i>
                        </span>
                    </div>
                </div>
                <div class="bg-title" ref="bgTitle" :style="{'background-image':'linear-gradient(180deg,' + bgColor + ' 0%, #161616 100%)'}">
                    <h3 class="one-txt-cut">{{ playlist.name }}</h3>
                </div>
            </div>
            <div class="bg-box-bot" :style="{'background-color': bgColor}"></div>
            <div class="bg-box-top" ref="bgBoxTop" ></div>
            <div class="top" v-if="playlist.coverImgUrl">
                <div class="img-box" ref="imgBox" >
                    <img :src="playlist.coverImgUrl + '?param=110y110'" alt="">
                    <div class="bg-left" ref="bgLeft"></div>
                    <div class="bg-center"  ref="bgCenter"></div>
                    <div class="bg-right"  ref="bgRight"></div>
                </div>
            </div>
            <div class="content">
                <div class="title">
                    <div class="name one-txt-cut">
                        <h3>{{ playlist.name }}</h3>
                    </div>
                   <div class="des one-txt-cut">
                        <p>{{ playlist.description }}</p>
                   </div>
                </div>
                <van-sticky :offset-top="30">
                    <div :class="['play-all',{'topTime':playAllTopFlag}]">
                        <div class="left">
                            <span>
                                <i class=" iconfont 24gf-playCircle icon-24gf-playCircle"></i>
                            </span>
                            <p @click="playAll">播放全部</p>
                            <span class="sum">{{ playlist.trackCount | playcountData }}</span>
                        </div>
                        <div class="right">
                            <span @click="likeFn">
                                <i :class= "['iconfont icon-xihuan',{'like':like}]"></i>
                                <p>{{ playlist.subscribedCount | playcountData }}</p>
                            </span>
                            <span @click="openCommentPage">
                                <i class="iconfont icon-icon_huifu-mian"></i>
                                <p>{{ playlist.commentCount  | playcountData }}</p>
                            </span>
                            <span @click="showShare = true">
                                <i class="iconfont icon-a-ziyuan566"></i>
                                <p>{{ playlist.shareCount | playcountData }}</p>
                            </span>
                        </div>
                    </div>
                </van-sticky>
                <div class="songs-list">
                    <ul>
                        <li v-for="(item,index) in songsList" :key="item.id" @click="playSong(item.id)">
                            <div class="left">
                                <span>{{ index +1  }}</span>
                            </div>
                            <div class="txt">
                                <div class="name">
                                    <h4 class="one-txt-cut">{{ item.name }}</h4>
                                </div>
                                <div class="des">
                                    <span v-if="item.fee == 1">vip</span>
                                    <p class="one-txt-cut">{{ item.ar[0].name }}</p>
                                </div>
                            </div>

                        </li>
                    </ul>
                    <div class="null-box">
                        没有更多了~
                    </div>
                   
                </div>
            </div>
            <van-share-sheet
            v-model="showShare"
            title="分享"
            :options="options"
            @select="onSelect"
            />
           <div class="bottom-tab">
             <van-popup v-model="show" round position="bottom" :style="{ height: '30%' ,backgroundColor:'#292929'}" :overlay-style="{backgroundColor: '#161616',opacity:'.5'}"> 
                <div class="des">
                    <div class="img-box">
                        <img :src="playlist.coverImgUrl + '?param=50y50'" alt="">
                    </div>
                    <div class="right">
                        <div class="title">
                            <h3 class="one-txt-cut">{{ playlist.name }}</h3>
                        </div>
                        <div class="name">
                            <p>{{ playlist.description }}</p>
                        </div>
                    </div>
                </div>
                <ul>
                    <li>
                        <span>
                            <i class="iconfont icon-caidan1"></i>
                            <p>批量管理歌曲</p>
                        </span>
                    </li>
                    <li>
                        <span>
                            <i class="iconfont icon-xiazai"></i>
                            <p>下载歌单内歌曲</p>
                        </span>
                    </li>
                    <li>
                        <span>
                            <i class="iconfont icon-jubao"></i>
                            <p>举报歌单</p>
                        </span>
                    </li>
                </ul>
            </van-popup>
         
           </div>
                    
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from "vuex";
import {getListSongs,getListMore} from '../api/listView'
import Colorthief from "colorthief";
export default {
    data() {
        return {
            bgColor:'#986784', // 背景色
            playlist:[],  // 歌单
            songsList:[], // 歌曲列表
            playAllTopFlag:false,
            loadFlag:true ,//loading 开关
            liFocusIndex:null,  // 选中li
            showShare: false,
            show:false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
          
            ],
            like:false
        }
    },
    methods: {
        getCol(src){ // 根据图片获取主题色
            const img = new Image()
            img.crossOrigin = ""
            img.src = src
            img.onload = ()=>{
                const colorthief = new Colorthief
                const color = colorthief.getColor(img)
                // this.bodyBgColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'  
                this.bgColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'  
            }
        },
        getListSongsFn(){ // 获取歌单所有歌曲
            getListSongs({
                id:this.listConId
                // id:5137419858
            }).then(data=>{
                this.songsList = data.songs

            })
        },
        backPage(){  // 返回主页
            this.$router.push('/home')
            this.$store.commit("setHomeTabFlag",true)

        },
        getListMoreFn(){  // 歌单详情
            getListMore({  
                id:this.listConId
                // id:5137419858
            }).then(data=>{
                this.playlist = data.playlist
                // console.log(data.playlist);
                this.getCol(this.playlist.coverImgUrl)
            })
        },
        scrolling() { // 页面滚动
            // 滚动条距文档顶部的距离
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            // 滚动条滚动的距离
            // let scrollStep = scrollTop - this.oldScrollTop;
            // console.log("header 滚动距离 ", scrollTop);
            if (scrollTop<= 20) {  //背景框效果
                this.$refs.bgCenter.style.transform =`rotateZ(-${7 - ((7 / 20) * scrollTop)}deg) translateX(-${13 - ((13 / 20) * scrollTop)}px)`
                this.$refs.bgCenter.style.opacity = 0.2 - (scrollTop / 100)

                this.$refs.bgLeft.style.transform =`rotateZ(-${10 - ((10 / 20) * scrollTop)}deg) translateX(-${25 - ((25 / 20) * scrollTop)}px)`
                this.$refs.bgLeft.style.opacity = 0.2 - (scrollTop / 100)

                this.$refs.bgRight.style.transform =`rotateZ(${5 - ((5 / 20) * scrollTop)}deg) translateX(${15 - ((15 / 20) * scrollTop)}px) translateY(${10 - ((10 / 20) * scrollTop)}px)`
                this.$refs.bgRight.style.opacity = 0.2 - (scrollTop / 100)
                
            }
            if (scrollTop> 20 && scrollTop <= 100){ //图片效果
                this.$refs.imgBox.style.opacity = 1 - ((scrollTop - 20) / 80)
                this.$refs.imgBox.style.transform = `scale(${1 -  ((scrollTop - 20) / 160)})  translateY(${1.5 * (scrollTop - 20)}px)`

            }
            if (scrollTop > 130 && scrollTop < 170) {  //头部标题
                this.$refs.bgTitle.style.opacity = ((scrollTop - 130) / 40)
                
            }
            if (scrollTop > 190) {  //全部播放
               this.playAllTopFlag = true                
            }else{
                this.playAllTopFlag = false
            }
            if (scrollTop <= 0) {
               this.$refs.bgTitle.style.opacity = 0
            } 

            // 黑色渐变大背景
            this.$refs.bgBoxTop.style.backgroundImage =  `linear-gradient(0deg,#000 0%, #161616 10%,rgba${'(22, 22, 22, ' + scrollTop / 200 + ')'} 100%)`



            // transform: rotateZ(-10deg) translateX(-25px);
            // transform: rotateZ(-7deg) translateX(-13px);
            // transform: rotateZ(5deg) translateX(15px) translateY(10px);
            // 更新——滚动前，滚动条距文档顶部的距离
            // this.oldScrollTop = scrollTop;

            // //变量windowHeight是可视区的高度
            // let windowHeight =
            //     document.documentElement.clientHeight || document.body.clientHeight;
            // //变量scrollHeight是滚动条的总高度
            // let scrollHeight =
            //     document.documentElement.scrollHeight || document.body.scrollHeight;

            // //滚动条到底部的条件
            // if (scrollTop + windowHeight == scrollHeight) {
            //     //你想做的事情
            //     console.log("header  你已经到底部了");
            // }
            // if (scrollStep < 0) {
            //     console.log("header 滚动条向上滚动了！");
            // } else {
            //     console.log("header  滚动条向下滚动了！");
            // }
            // // 判断是否到了最顶部
           
        },
        playSong(id){
            this.$store.commit("setSongId",id)
            this.$store.commit("setMainPlayerFlag",true)
            // setMainListId
        },
        playAll(){ //播放全部

            // console.log(this.songsList[0].id);
            this.$store.commit("setSongId",this.songsList[0].id)
            this.$store.commit("setMainPlayerFlag",true)
        },
        openCommentPage(){ //跳转评论页
            this.$router.push({
                name: 'commentView',
                params:{
                    listId:this.listConId,
                    fromName: this.$route.fullPath
                }

            })
            // this.$router.push({
            //     name:'Comment',
            //     params:{
            //         listId:this.$route.query.id,
            //         imgUrl:this.playlists.coverImgUrl,
            //         name:this.playlists.creator.nickname,
            //         des:this.playlists.name,
            //         num:this.playlists.commentCount

            //     }
            // });

        },
        onSelect(option) {
            Toast(option.name);
            this.showShare = false;
        },
        likeFn(){ // 喜欢
            this.like = !this.like
        },
        relike(){ //结束更新喜欢
            if ( localStorage.getItem('songListLike')) {
               let list = JSON.parse(localStorage.getItem('songListLike'))
               let num = list.findIndex(item=>item==this.listConId )
               if (num == -1 && this.like) {
                  list.push(this.listConId)
                  localStorage.setItem('songListLike',JSON.stringify(list))
                  return
               }
               if (num != -1 && !this.like) {
                  list.splice(num,1)
                  localStorage.setItem('songListLike',JSON.stringify(list))
                  return
               }
            }else{
                localStorage.setItem('songListLike',JSON.stringify([]))
            }
        },
        setlike(){ // 判断是否喜欢
            if (localStorage.getItem('songListLike')) {
                let num = JSON.parse(localStorage.getItem('songListLike')).findIndex(item=>item==this.listConId)
                console.log(num);
                if (num == -1) {
                    this.like = false
                }else{
                    this.like = true
                }
            }

        },
        openBottomTab(){
            this.show = true
        }
    

    },
    watch:{
      'bgColor':function(){
        setTimeout(()=>{
            this.loadFlag = false
        },300)
      },
    
    },
    computed:{
        ...mapState(['songId','listConId','MainPlayerFlag'])
    },
    filters:{
            playcountData(value){
               if(value < 10000){
                 return value;
               }
               let w = value > 10000?value/10000:value;//万计算
               let y = w > 10000? parseInt(w/10000) + "亿" : parseInt(w) + "万";
               return y;
            }
        },
    created() {
        this.getListMoreFn()
        this.getListSongsFn()
        this.setlike()

    },
    mounted() {
        setTimeout(() => {
            window.addEventListener("scroll", this.scrolling)
        }, 1000);
    },
    beforeDestroy(){
        window.removeEventListener("scroll", this.scrolling)
        this.relike()
  
    }


    
}
</script>

<style lang="scss" scoped>
    .listView{
        position: relative;
        background-color: #161616;
        ::v-deep .van-share-sheet__cancel{
            display: none;
        }
        .load-box{
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            z-index: 999;
            background-color: #161616;
        }
        .head-nav{
            height: 40px;
            position: fixed;
            z-index: 998;
            top: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            .con{
                position: absolute;
                top: 0;
                left: 0;
                z-index: 95;
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .back{
                    margin-left: 12px;
                    transform: rotateZ(180deg);
                    i{
                        font-size: 13px;
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                    span{
                        &:nth-child(1){
                            margin-right: 25px;
                            i{
                                
                            }
                        }
                        i{
                            font-size: 13px;
                        }
                    }
                }

            }
         
            .bg-title{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 90;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                // background-image:linear-gradient(180deg,#986784 0%, #161616 100%);
                h3{
                    text-align: center;
                    font-size: 12px;
                    width: 70%;
                }
            }
        }
        .bg-box-bot{
            width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
    
        }
        .bg-box-top{
            width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            // background-color: #000;
            background-image:linear-gradient(0deg,#000 0%, #161616 10%,transparent 100%);
            // background-color: #161616;
            z-index: 3;
        }
        .top{
            position: absolute;
            top: 40px;
            z-index: 5;
            width: 100%;
            .img-box{
                display: flex;
                justify-content: center;
                position: relative;
                img{
                    width: 110px;
                    height: 110px;
                    border-radius: 10px;
                    position: absolute;
                    z-index: 9;
                }
                .bg-left{
                    width: 110px;
                    height: 110px;
                    border-left: 3px solid #fff;
                    opacity: .2;
                    border-radius: 10px;
                    position: absolute;
                    transform: rotateZ(-10deg) translateX(-25px);
                    // transform: rotateZ(0deg) translateX(-10px);

                    z-index: 7;
                }
                .bg-center{
                    width: 110px;
                    height: 110px;
                    border: 3px solid #fff;
                    opacity: .2;
                    border-radius: 10px;
                    position: absolute;
                    transform: rotateZ(-7deg) translateX(-13px);
                    z-index: 7;

                }
                .bg-right{
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border: 3px solid #fff;
                    opacity: .2;
                    border-radius: 10px;
                    z-index: 7;
                    transform: rotateZ(5deg) translateX(15px) translateY(10px);

                }
            }
        }
        .content{
            position: absolute;
            top:180px;
            z-index: 30;
            width: 100%;
            .title{
                // display: none;
                width: 100%;
                .name{
                    padding-left: 12px;
                   h3{
                        font-size: 14px;
                        font-weight: normal;
                   }
                }
                .des{
                    margin-top: 10px;
                    padding:0 12px;
                    max-width: 80%;
                    p{
                        font-size: 12px;
                        zoom: .8;
                        clear: #fff;
                        opacity: .5;
                    }
                }
            }
            .play-all{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 36px;
                margin-top: 10px;
                line-height: 36px;
               &.topTime{
                background-color: #161616;
               }
                .left{
                    display: flex;
                    align-items: center;
                    padding-left: 12px;
                    span{
                        margin-right: 5px;
                        i{
                            font-size: 24px;

                        }
                    }
                    p{
                        font-size: 12px;
                        zoom: .9;
                        color: #fff;
                        opacity: .7;
                        margin-right: 3px;

                    }
                    span.sum{
                        font-size: 12px;
                        zoom: .8;
                        color: #fff;
                        opacity: .7;

                    }
                }
                .right{
                    display: flex;
                    span{
                        display: flex;
                        margin-right: 20px;
                        &:nth-child(1){
                            i{
                                font-size: 18px;
                            }
                        }
                        i{
                            font-size: 15px;
                            &.like{
                                color: red;
                            }

                        }
                        p{
                            margin-left: 3px;
                            font-size: 12px;
                            opacity: .7;
                            zoom: .7;
                        }
                    }
                }
            }
            .songs-list{
                ul{
                    width: 100%;
                    overflow: hidden;
                    li{
                        padding: 10px 0 10px 12px;
                        display: flex;
                        align-items: center;
                        height: 30px;
                        &:active{
                            background-color: rgba(255, 255, 255, 0.07);
                        }
                        .left{
                            padding: 0 5px;
                            span{
                                opacity: .4;
                                i{
                                    font-size: 12px;
                                }

                            }
                        }
                        .txt{
                            margin-left: 12px;
                            flex: 1;
                            .name{
                                padding-right: 12px;
                                width: 100%;
                                h4{
                                    max-width: 80% ;
                                    font-size: 12px;
                                    zoom: .9;
                                    
                                    
                                }
                            }
                            .des{
                                margin-top: 3px;
                                display: flex;
                                align-items: center;
                                span{
                                    font-size: 12px;
                                    color: #00c561;
                                    padding: 2px 5px;
                                    zoom: .5;
                                    background-color: #00c5633b;
                                    margin-right: 3px;
                                }
                                p{
                                    font-size: 12px;
                                    zoom: .7;
                                    opacity: .6;
                                    margin-top: 2px;
                                    width: 80%;
                                }
                            }
                        }
                    }
                }
                .null-box{
                    font-size: 12px;
                    text-align: center;
                    height: 80px;
                    width: 100%;
                    color: #fff;
                    padding-top: 20px;
                }
            
            }
        }
        .bottom-tab{
            color: #dddddd;
            .des{
                margin-top: 20px;
                display: flex;
                align-items: center;
                .img-box{
                    padding: 10px;
                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 5px;

                    }
                }
                .right{
                  .title{
                    h3{
                        font-size: 12px;
                        zoom: .9;
                        
                    }
                 
                  }
                    .name{
                        margin-top: 3px;
                      p{
                        font-size: 12px;
                        zoom: .7;
                        opacity: .5;
                      }

                    }
                }
            }
            ul{
                li{
                    padding: 10px 12px;
                    align-items: center;
                    span{
                        display: flex;
                        font-size: 12px;
                        i{
                            font-size: 12px;
                            color: #ddd;
                        }
                        p{
                            margin-left: 10px;
                            color: #ddd;
                        }
                    }
                }
            }
        }
  
    }
</style>