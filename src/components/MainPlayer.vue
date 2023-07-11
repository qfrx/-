<template>
    <div>
        <div class="MainPlayer">
            <div class="show-box">
                <div class="head-nav">
                    <div class="left">
                        <span @click="back">
                            <i class=" iconfont icon-jiantouyou"></i>
                        </span>
                    </div>
                    <h2>持续更新:抖音热门网红BGM全集</h2>
                </div>
                <van-swipe :style="{'height':'100vh'}" vertical :show-indicators="false" @change="onChange" :initial-swipe="starIndex" ref="menu">
                    <van-swipe-item v-for="(item) in songList" :key="item.id">
                        <div class="card">
                            <div class="bg-box">
                                <div class="bg" :style="{'background-image' : 'url(' + item.al.picUrl + ')' }"></div>
                                <div class="bg-mar"></div>
                            </div>
                            <div class="content">
                                <div class="head-null"></div>
                                <div class="img-box">
                                    <img :src="item.al.picUrl + '?param=140y140'" alt="" >
                                </div>
                                <div class="lyric">
                                    <span>
                                        是因为太幸福
                                        <div class="bg-text"></div>
                                    </span>
                                </div>
                                <div class="title">
                                    <h3>
                                        <!-- <van-notice-bar
                                        :text="item.name"
                                        /> -->
                                        {{ item.name }}
                                        <span>
                                            <!-- (沈从柯 Remix) -->
                                        </span>
                                    </h3>
                                    <div class="name">
                                        {{ item.ar[0].name }}
                                        <span>关注</span>
                                    </div>
                                </div>
                                <div class="btn-box">
                                    <div class="left">
                                    <span @click="likeFn(item)">
                                        <i :class= "['iconfont icon-xihuan',{'like':item.like}]"></i>
                                        <em>4w+</em>
                                    </span>
                                    <span>
                                        <i class="iconfont icon-icon_huifu-mian"></i>
                                        <em>185</em>
                                    </span>
                                    <span @click="showShareFun">
                                        <i class="iconfont icon-a-ziyuan566"></i>
                                        <em>6151</em>
                                    </span>
                                    </div>
                                    <div class="right">
                                        <div class="play-type" @click="changePlayType">
                                            <i class="iconfont icon-suijibofang" v-if="playType==0"></i>
                                            <i class="iconfont icon-bofang-xunhuanbofang" v-if="playType==1"></i>
                                             <i class="iconfont icon-shunxubofang" v-if="playType==2"></i>
                                        </div>
                                        <i class="iconfont icon-more_vert"></i>
                                    </div>
                                </div>
                                <div class="rang-box">
                                    <div class="playFlag">
                                        <span>
                                            <i class="iconfont 24gf-pause2 icon-24gf-pause2" v-if="playflag" @click="pauseFn"></i>
                                            <i class="iconfont icon-bofang3" v-if="!playflag" @click="playFn"></i>
                                        </span>
                                    </div>
                                    <div class="rang">
                                        <div class="rang-loading" v-if="!rangeFlag">
                                            <span></span>
                                        </div>
                                        <van-slider 
                                        v-if="rangeFlag"
                                        v-model="currentPlay"
                                        @input="sliderInputFn" 
                                        @drag-start="sliderDragStartFn"
                                        @drag-end="sliderDragEndFn" 
                                        :button-size="6"
                                        :active-color="'#fff'" 
                                        inactive-color="#ffffff7d"/>
                                    </div>
                                </div>
                            </div>
                            <van-share-sheet
                            v-model="showShare"
                            title="分享"
                            :options="options"
                            />
                        </div>
                    </van-swipe-item>
                
                </van-swipe>
              
            </div>
        </div>
    </div>
</template>

<script>
   import { Toast } from 'vant';
   import { mapState } from "vuex";
   import {getSongDetail, getListSongs  } from "../api/MainPlayer";
    export default{
        data() {
            return {
                currentPlay:0, // 进度条进度
                songList:[], // 当前歌曲列表
                listId:null, // 歌单id
                starIndex:0, //初始位置
                playType:0, // 播放模式
                reShowFlag:true, // 第一次轮播重绘
                like:false,// 喜欢
                showShare:false, //分享开关
                options: [ // 分享列表数据
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' }],
            
            }
        },
        methods: {
      
            back(){ // 返回
                this.$store.commit("setMainPlayerFlag",false)
            },
            onChange(index){ // 切换歌曲
                this.starIndex = index
                this.$store.commit("setSongId",this.songList[index].id)

            },
            changePlayFlag(){ // 播放/暂停 切换
                this.$store.commit("setPlayflag",!this.playflag)
            },
            pauseFn(){//暂停歌曲
                this.$store.commit("setPlayflag",false) 

            },
            playFn(){//播放歌曲
                this.$store.commit("setPlayflag",true) 

            },
            getSongDetailFn(){ // 获取歌曲详情
                getSongDetail({
                    ids:this.songId
                }).then(data=>{
                    this.songList.unshift(data.songs[0])
                    this.starIndex = 0
                 
                
                })
            },
            getListSongsFn(){ // 获取歌单所有歌曲
                getListSongs({
                    id:this.listConId,
                    limit:20,
                    offset:0
                }).then(data=>{
                    this.songList = data.songs
                })
            },
            sliderInputFn(value){ //拖动进度条
                this.$store.commit("setRangValue",value)
            },
            sliderDragStartFn(){ //开始拖动效果
                //   this.$refs.audio.pause();//停止音乐播放
                this.$store.commit("setPlayflag",false)
            },
            sliderDragEndFn(){  //结束拖动效果
                //   this.$refs.audio.play();//开始音乐播放
                this.$store.commit("setPlayflag",true)
            },
            changePlayType(){ // 改变播放模式
                if (this.playType === 2) {
                    this.playType = 0
                    Toast('随机播放');
                }else if(this.playType === 1 ){
                    this.playType += 1
                    Toast('单曲循环');
                }else if(this.playType === 0 ){
                    this.playType += 1
                    Toast('顺序播放');
                }
            }, 
            likeFn(obj){ // 喜欢
                obj.like = !obj.like
            },
            relike(){ //结束更新喜欢
                if ( localStorage.getItem('songLike')) {
                    let list = JSON.parse(localStorage.getItem('songLike'))
                    let num = list.findIndex(item=>item==this.songId )
                if (num == -1 && this.like) {
                    list.push(this.songId)
                    localStorage.setItem('songLike',JSON.stringify(list))
                    return
                }
                if (num != -1 && !this.like) {
                    list.splice(num,1)
                    localStorage.setItem('songLike',JSON.stringify(list))
                    return
                }
                }else{
                    localStorage.setItem('songLike',JSON.stringify([]))
                }
            },
            setlike(){ // 判断是否喜欢
                if (localStorage.getItem('songLike')) {
                    let num = JSON.parse(localStorage.getItem('songLike')).findIndex(item=>item==this.songId)
                    if (num == -1) {
                        this.like = false
                    }else{
                        this.like = true
                    }
                }
            },
            showShareFun(){ //显示分享
                // this.showShare = true

            }  
        },
        watch:{
            '$store.state.listConId':function(){
                this.getListSongsFn()
            },
            '$store.state.songId':function(){
                // this.relike()
                // this.setlike()
                let index = this.songList.findIndex(song=>song.id == this.songId )
                if (index !== -1) {
                    this.$refs.menu.swipeTo = index
                    this.starIndex = index
                }else{
                    this.getSongDetailFn()
                }
                if (this.reShowFlag) { //首次重绘轮播组件
                    setTimeout(() => {
                        this.$refs.menu.resize();
                    }, 500);
                    this.reShowFlag = false
                }

            
            },
            '$store.state.rangValue':function(){
                this.currentPlay = this.rangValue
                if (this.rangValue == 100) {  // 播放完毕，自动执行下步操作
                    if (this.playType == 1) { //顺序播放
                        this.$refs.menu.next()
                    }
                    if(this.playType == 0){ //随机播放
                        let num = Math.floor(Math.random * this.songList.length)
                        for (let i = 0; i < num; i++) {
                            this.$refs.menu.next()
                        }
                    }
                    if(this.playType == 2){ // 单曲循环
                        this.$refs.menu.next()
                        this.$refs.menu.prev()
                    }
                   
                   
                }
            },
            'currentPlay':function(){
                this.$store.commit("setRangValue",this.currentPlay)
            },
        },
        computed:{
            ...mapState(['songId','listConId','playflag','rangeFlag','rangValue'])
        },
        created() {
            // this.setlike()
        },
        beforeDestroy() {
            // this.relike()
        },
    }
</script>



<style lang="scss">
    .MainPlayer{
        .show-box{
            position: absolute;
            z-index: 999;
            width: 100%;
            background-color: #161616;
            top: 0;
            left: 0;
            .head-nav{
                display: flex;
                padding: 10px 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 990;
                .left{
                    transform: rotateZ(180deg);
                    padding: 0 12px;
                    position: absolute;
                    span{
                        i{
                            font-size: 14px;
                        }
                    }
                }
                h2{
                width: 100%;
                text-align: center;
                    font-size: 14px;
                }
            }
        
            .card{
                height: 100vh;
                width: 100%;
          
                .bg-box{
                    position: absolute;
                    z-index: 1;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                .bg{
                        // background-image: url(../assets/img/img3.png);
                        background-size: 2000%;
                        background-repeat: no-repeat;
                        background-position: center;
                        filter: blur(30px);
                        height: 100%;
                        width: 100%;
                        transform: scale(2);
                        position: absolute;
                        z-index: 1;

                }
                .bg-mar{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        z-index: 2;
                        background-image :linear-gradient(140deg,rgba(0, 0, 0, .2) 0%,rgba(0, 0, 0, 0.3) 10%,rgba(0, 0, 0, 0.4) 100%)
                }
                }
                .content{
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    z-index: 9;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .head-null{
                        width: 100%;
                        height: 40px;
                      
                    }
                    .img-box{
                        margin-top: 30px;
                        width: 100vw;
                        // margin-left: 12px;
                        img{
                            width: 93.5%;
                            height: 93.5vw;
                            margin: 0 auto;
                            border-radius: 5px;
                        }
                    }
                    .lyric{
                        flex: .35;
                        span{
                            font-size: 14px;
                            color: #fff;
                            line-height: 16px;
                            position: relative;
                            .bg-text{
                                position: absolute;
                                top: 0;
                                right: 0;
                                width: 100%;
                                height: 100%;
                            }

                        }
                        padding: 50px 0 50px 12px;
                    }
                    .title{
                        padding-left: 12px;
                        margin-bottom: 10px;
                        h3{
                            font-size: 16px;
                            font-weight: bold;
                            span{
                                margin-left: 10px;

                            }
                        }
                        .name{
                            margin-top: 5px;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            span{
                                font-size: 12px;
                                zoom: .5;
                                padding:3px 5px;
                                background-color: #807b72;
                                border-radius: 8px;
                                margin-left: 10px;

                            }
                        }
                    }
                    .btn-box{
                        display: flex;
                        justify-content: space-between;
                        .left{
                            display: flex;
                            align-items: flex-start;
                            height: 42px;
                
                            span{
                                padding: 12px;
                                display: flex;
                                align-items: flex-start;
                                &:nth-child(1){
                                    i{
                                        font-size: 18px;
                                    }
                                
                                }
                                i{
                                    color: #fff;
                                    opacity: .9;
                                    font-size: 15px;
                                    display: block;
                                    padding-right: 5px;
                                    &.like{
                                        color: red;
                                    }
                                
                                }
                                em{
                                    font-size: 12px;
                                    color: #fff;
                                    opacity: .8;
                                    zoom: .5;
                                    display: block;

                                }
                            }

                        }
                        .right{
                            height: 42px;
                            line-height: 42px;
                            padding-right: 12px;
                            color: #fff;
                            opacity: .7;
                            display: flex;
                            .play-type{
                                margin-right: 15px;

                            }

                        }
                    }
                    .rang-box{
                        display: flex;
                        align-items: center;
                        margin-top: 10px;
                        .playFlag{
                        padding-left: 12px;
                            span{
                                i{
                                    &.icon-shangjiantou{
                                        transform: rotateZ( 90deg);
                                    }

                                }
                            }
                        }
                        .rang{
                            padding: 0 12px;
                            width: 85%;
                            .rang-loading{
                                width: 100%;
                                height: 3px;
                                background-color: #ffffff3a;
                                position: relative;
                                overflow: hidden;
                                span{
                                    position: absolute;
                                    display: block;
                                    height: 3px;
                                    top: 0px;
                                    left: 0;
                                    width: 30%;
                                    border-radius: 3px;
                                    background-image :linear-gradient(90deg,transparent 0%,#fff 50%,transparent 100%);
                                    animation: rangeLodingMove 1.5s linear infinite;
                                
                                    
                                    
                                }
                            }
                        }
                    }
                }
            }

        }
        
    }
    
    @keyframes rangeLodingMove {
    0% {
       left: 0
    }
    40%{
        left: 45%;
    }
    60%{
       left: 55%;  
    }
    100%{
        left: 100%;
    }
   
}

</style>