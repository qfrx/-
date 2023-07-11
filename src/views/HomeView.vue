<template>
    <div>
     

        <div class="Home">
            <div class="bg-box"  :style="{ 'background-image':'linear-gradient(140deg,'+ radioStationColors[0] + ' 0%,#121212 45%)'}" v-show="!bgFlag" v-if="chartsMore"></div>
          
            <div class="load-box" v-if="loadFlag">
                <van-loading color="#fff" size="26" />
            </div>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="chartsMore">
                <div class="content-box">
                    <div class="null-box"></div>
                    <div class="head-nav" :style="{'background-color'  : bgFlag?'#121212':'transparent' }">
                        <div class="left">
                            <h3>发现</h3>
                        </div>
                        <div class="right" @click="openSearchPage">
                            <i class="iconfont icon-sousuo"></i>
                        </div>
                    </div>
                    <div class="radio-station" v-if="audioSongsList && audioIdList && audioBglist">
                        <div class="title">
                            <h3>音乐电台</h3>
                        </div>
                        <div class="content">
                            <div class="swiper-container">
                                <div class="swiper-wrapper ">
                                    <div class="swiper-slide" v-for="(item,index) in radioStationColors" :key="index">
                                        <div class="card" :style="{'background-color': item}" @click="playAudio(index)" v-if="radioStationList">
                                            <h3>{{ radioStationList[index].name }}</h3>
                                            <div class="img-box">
                                                <img :src="[audioBglist[index]]" alt="">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                    <div class="list-recommend">
                        <div class="title">
                            <h3>歌单推荐</h3>
                            <span>
                                <i class="iconfont icon-jiantouyou"></i>
                            </span>
                        </div>
                        <div class="content" v-if="hostList">
                            <div class="swiper-container-radio" >
                                <div class="swiper-wrapper " >

                                    <div class="swiper-slide" v-for="item in hostList" :key="item.id">
                                        <div class="card" @click="openListPage(item.id)">
                                            <div class="img-box">
                                                <img :src="item.picUrl" alt="">
                                            </div>
                                            <p class="txt-cut">{{ item.name }}</p>
                                        </div>
                                    </div>
                              


                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                    <div class="chart">
                        <van-sticky :offset-top="0">
                            <div class="play-all" @click="playall">
                                <span>
                                    <i class="iconfont icon-shangjiantou"></i>
                                </span>
                                <h3>播放全部
                                    <p>(50)</p>
                                </h3>
                            </div>
                        </van-sticky>
                        <van-tabs v-model="active" sticky animated swipeable>

                            <van-tab :title="Charts[index].name" v-for="(item,index) in chartsMore" :key="index">
                                <ul>
                                    <li v-for="(song,num) in item.songs" :key="song.id" @click="play(song.id)">
                                        <div class="left">
                                            <span>{{ num + 1 }}</span>
                                            <i class="iconfont icon-xiajiantou1"></i>
                                        </div>
                                        <div class="right">
                                            <div class="name">
                                                <h3>
                                                    {{song.name}}
                                                </h3>
                                            </div>
                                            <div class="title">
                                                <p>
                                                    <span v-if="song.fee == 1">vip</span>
                                                    {{ song.ar[0].name }}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="goTop" @click="goTop">
                                    <span>
                                        回到顶部
                                    </span>
                                </div>
                            </van-tab> 
                    
                        </van-tabs>
                        <div class="null-box-bottom"></div>
                    </div>
                </div>
            </van-pull-refresh>
        </div>
      
    </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import Colorthief from "colorthief";
import { getRadioStationList,getListContent,getTypeListContent,gettest,getHostList,getChart } from "../api/home";
export default {
    data() {
        return {
            begin:false,
            radioStationColors:["#ecaec0","#b17baf","#3483cd","#81768d","#3245b2","#252c4f","#44836c","#0876c6","#537b92","#804041","#7f68b0","#9acbdd","#531b80","#7aa6a2","#223160","#db5f89","#3585cf","#9c6a56","#777777","#537b92"],  //音乐电台背景色组
            newRadioStationColors :[],
            radioStationList:null,  //音乐电台歌单
            active:0, // 榜单显示下标
            bgFlag:false, // 背景图显示开关
            pagNums:1, // 歌单个数(换页数)
            audioList:[],
            audioIdList:[],
            audioBglist:[],
            audioSongsList:[],
            hostList:[],  //推荐歌单
            allHostList:[],
            Charts:[] , //榜单
            chartsMore:[], // 榜单歌曲
            count: 0,
            isLoading: false, // load开关
            loadFlag:true,   // load开关


        }
    },
    methods: {
        onRefresh() { //下拉刷新
            setTimeout(() => {
                this.isLoading = false;
                this.radioStationColors = this.radioStationColors.sort(() => Math.random() - 0.5);
                this.getHostListFn()
            }, 1000);
        },
        goTop(){ //回到顶部
            // window.scrollTo(0,0)
            var myTimer = -1;
            function back(){// 灰顶动画
                //1、获取当前滚动了多少距离
                //2、启动定时器，以一定时间减少响应的滚动距离
                var scrollTo = document.documentElement.scrollTop || document.body.scrollTop
                if(myTimer == -1){
                    myTimer = setInterval(() => {
                        scrollTo -= 60
                        if(scrollTo<=0){
                            scrollTo = 0
                            window.clearInterval(myTimer)
                            myTimer = -1
                        }
                    
                        window.scrollTo(0,scrollTo) //这是值  是指离开网页顶部的距离   
                    }, 7);

                }

            }
            back()
        },
        getRadioStationListFn(){ //歌单分类
            getRadioStationList().then(data=>{
                this.radioStationList = data.tags.slice(0,20)
            })
        },
        getTypeListContentFn(type){ //歌单分类详情(歌单id，bgurl)
            getTypeListContent({
                cat:type,
                limit:this.pagNums,
            }).then(data=>{
                this.audioIdList.push(data.playlists[0].id)
                this.audioBglist.push(data.playlists[0].coverImgUrl)
            })

        },
        getListContentFn(listId){//获取榜单歌曲
            getListContent({
                id:listId,
                limit:'50'
            }).then(data=>{
                this.chartsMore.push(data)
            })
        },
        scrolling() {  //首页背景色效果
            // 滚动条距文档顶部的距离
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            // 滚动条滚动的距离
            let scrollStep = scrollTop - this.oldScrollTop;
            
            // 更新——滚动前，滚动条距文档顶部的距离
            this.oldScrollTop = scrollTop;

    
            //滚动条到底部的条件
    
            if (scrollStep > 0) {
                this.bgFlag = true
            }
            // 判断是否到了最顶部
            if (scrollTop <= 0) {
                // console.log("header 到了最顶部")
                this.bgFlag = false
                // console.log(this.bgFlag);
            } 
        },
        getHostListFn(){ //获取推荐歌单
            getHostList({
                limit:60
            }).then(data=>{
                this.allHostList = data.result
                this.hostList = this.allHostList.sort(() => Math.random() - 0.5).splice(0,12)
            })
        },
        getChartFn(){ //获取榜单name，id
            getChart().then(data=>{
                data.list.splice(0,3).forEach(n=>{
                    this.Charts.push({'name':n.name,'id':n.id})
                })
            })
        },
        getCol(src,num){ //根据图片获取主题色
            const img = new Image()
            img.crossOrigin = ""
            img.src = src
            img.onload = ()=>{
                const colorthief = new Colorthief
                const color = colorthief.getColor(img)
                // this.bodyBgColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'  
                this.newRadioStationColors.push({[num]:('rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')')}) 
            }
        },
        openListPage(id){ //跳转对饮歌单页
            this.$store.commit("setListConId",id)
            this.$router.push('/listView')
        },
        play(id){  // 排行榜歌曲播放
            this.$store.commit("setSongId",id)
            this.$store.commit("setMainPlayerFlag",true)


        }, 
        playall(){ // 排行榜播放全部
            let id = this.Charts[this.active].id
            this.$store.commit("setListConId",id)
            this.$store.commit("setMainPlayerFlag",true)
        },
        playAudio(num){ // 音乐电台播放
            let id = this.radioStationList[num].id
            this.$store.commit("setListConId",id)
            this.$store.commit("setMainPlayerFlag",true)
            

        },
        gettestFn(){  // //测试
            gettest().then(data=>{
                console.log(data);
            })
        },
        openSearchPage(){//跳转搜索页
            this.$router.push({
                name:'SearchView',
                params:{bgColor:this.radioStationColors[0]}
            })
        }
    },
    computed:{
        ...mapState(['listId','MainPlayerFlag','songId'])
    },
    watch:{
        'radioStationList':function(){
            this.radioStationList.forEach((item) => {
                this.getTypeListContentFn(item.name)
                this.audioList.push({
                    'name':item.name,
                })

            });
            // console.log(this.audioList);
            // console.log(this.audioIdList);
        },
        'audioIdList':function() {
            if (this.audioIdList.length === 20) {
                this.audioList.forEach((item,index)=>{
                    item.listId = this.audioIdList[index]
                    item.coverImgUrl = this.audioBglist[index]
                    item.bgColor = this.radioStationColors[index]
                    // console.log(this.newRadioStationColors);
                    // this.getCol(item.coverImgUrl,index)
                })
      
      
              
            }
        },
        'Charts':function(){
            this.Charts.forEach(item=>{
                this.getListContentFn(item.id)
            })
            // console.log(this.chartsMore);
        },
        '$store.state.MainPlayerFlag':function() {
            this.bgFlag = !this.MainPlayerFlag  
        },
        'chartsMore':function(){
            if (this.loadFlag) {
               setTimeout(()=>{
                this.loadFlag = false
               },1000)
            }
        },
        'loadFlag':function(){
            this.$store.commit("setHomeTabFlag",!this.loadFlag)

        }
    },
    created() {
        this.getRadioStationListFn()
        this.getHostListFn()
        this.getChartFn()
      
        // console.log(this.Charts);
        // console.log(this.chartsMore);
    },
    mounted() {
            new Swiper('.swiper-container', {
                slidesPerView: '3.45',
                slidesPerColumn: 2,
                // paginationClickable: true,
                spaceBetween: 10,
                observer:true, //自动初始化swiper对象
                observerParents:true, //自动初始化父节点swiper对象
            }),
            new Swiper('.swiper-container-radio', {
                slidesPerView: '3.45',
                slidesPerColumn: 2,
                // paginationClickable: true,
                spaceBetween: 10,
                observer:true, //自动初始化swiper对象
                observerParents:true, //自动初始化父节点swiper对象
            })
            window.addEventListener("scroll", this.scrolling);
           
           
    },
    beforeDestroy(){
        window.removeEventListener("scroll", this.scrolling)
    }
  
}
</script>

<style lang="scss" scoped>

.Home{
    position: relative;
    overflow: hidden;
    .bg-box{
        position: absolute;
        width: 200%;
        height: 500px;
        top: 0;
        left: -300px;
    }
    .load-box{
        width: 100%;
        height: 100vh;
        background-color: #161616;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
    }
    .content-box{
        .null-box{
            height: 36px;
        }
        .head-nav{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 99;
            // background-color: red;
            .left{
                margin-left: 12px;
                text-align: center;
                h3{
                    font-size: 16px;
                    font-weight: bolder;
                }
            }
            .right{
                text-align: center;
                margin-right: 12px;
                i{
                    font-size: 16px;
                }
            }
        }
        .radio-station{
            .title{
                padding: 12px 0;
                position: relative;
                z-index: 10;
                h3{
                    margin-left: 12px;
                    font-size: 12px;
                }
            }
            .content{
                padding-left: 12px;
                .card{
                    width: 100px;
                    height: 65px;
                    position: relative;
                    background-color: #44836c;
                    overflow: hidden;
                    border-radius: 5px;
                    h3{
                        position: absolute;
                        font-size: 12px;
                        left: 7px;
                        top: 9px;
                    }
                    .img-box{
                        position: absolute;
                        right: -10px;
                        bottom: -10px;
                        transform: rotateZ(30deg);                    
                        img{
                            width: 55px;
                            height: 55px;
                            border-radius: 2px;
                        
                        }
                    }
                }
            
            }
        }
        .list-recommend{
            margin-top: 10px;
            .title{
                padding: 12px 0;
                display: flex;
                align-items: center;
                position: relative;
                z-index: 10;
                h3{
                    margin-left: 12px;
                    font-size: 12px;
                }
                span{
                    padding: 0 8px;
                    i{
                        font-size: 12px;

                    }
                }
            }
            .content{
                padding-left: 12px;
                .card{
                    .img-box{
                        margin-bottom: 7px;
                        img{
                            width: 100px;
                            height: 100px;
                            border-radius: 6px;

                        }
                    }
                    p{
                        font-size: 12px;
                        zoom: .8;
                    }
                }
            }
        }
        .chart{
            position: relative;
            background-color: #121212;
            margin-top: 20px;
            ::v-deep .van-tabs__line  {
                display: none;
            }
            ::v-deep .van-tabs__wrap{
                padding-right: 45%;
                background-color: #121212;
            }
            
            ::v-deep .van-tabs__nav {
                background-color: #121212;
            }
            ::v-deep .van-tab__text{
                color: #636363;
                font-weight: bold;
            }
            ::v-deep  .van-tab--active .van-tab__text{
                color: #d2d2d2;
            }
            ::v-deep .van-tabs__nav{
                justify-content: left;
            }
            ::v-deep .van-tab__pane{
                margin-top: 25px;
            }
            .play-all{
                width: 100%;
                padding: 8px 0;
                display: flex;
                align-items: center;
                padding-left: 12px;
                position: absolute;
                top: 40px;
                z-index: 5;
                background-color: #121212;
                span{
                    background-color: #00cb64;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    zoom: .7;
                    margin-right: 5px;
                    transform: rotateZ(90deg);
                    i{
                        

                    }
                }
                h3{
                    display: flex;
                    align-items: flex-end;
                    font-size: 12px;
                    zoom: .9;
                    p{
                        font-size: 12px;
                        zoom: .8;
                        color: #8b8888;

                    }

                }
           
            }
            ul{

                li{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    padding: 10px 0;
                    &:active{
                        background-color: rgba(255, 255, 255, 0.07);
                    }
                    .left{
                        width: 10%;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        span{
                            font-size: 12px;
                            font-weight: lighter;
                            margin-bottom: 5px;
                        }
                        i{
                            color: #656565;
                            zoom: .6;
                            transform: rotateZ(180deg);
                   
                        }

                    }
                    .right{
                        .name{
                            h3{
                                font-size: 12px;
                                zoom: .8;
                                font-weight: normal;

                            }
                            margin-bottom: 5px;
                        }
                        .title{
                            span{
                                color: #00c561;
                                padding: 2px 5px;
                                zoom: .8;
                                background-color: #00c5633b;
                            }
                            p{
                                font-size: 12px;
                                zoom: .7;
                                color: #8b8888;
                           
                            }
                        }
                    }

                }
            }
            .goTop{
                width: 100%;
                padding: 20px 0;

                span{
                    display: block;
                    font-size: 13px;
                    width: 80%;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background-color: rgba(255, 255, 255, 0.08);
                    margin: 0 auto;
                    
                }
            }
            .null-box-bottom{
                height: 40px;
            }

        }

    }
}
    
</style>





