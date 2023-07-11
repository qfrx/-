<template>
    <div>
        <div class="playCon">
            <!-- <div class="load-box" v-if="loadFlag">
                <van-loading color="#fff" size="26" />
            </div> -->
            <div class="head-nav">
                <div class="left">
                    <div class="title" @click="changeShow">
                        <h3>{{ styleWords }}</h3>
                        <span :class="{ 'hiden': btnShowFlag }">
                            <i class="iconfont icon-xiajiantou1"></i>
                        </span>
                    </div>
                    <div class="btn" :class="{ 'hiden': !btnShowFlag }">
                        <div class="tip">
                            <h3>请选择喜欢的推荐偏好</h3>
                            <h4>为你发现更多好音乐</h4>
                        </div>
                        <ul>
                            <li :class="{ 'active0': btnActive == 0 }" @click="changeType(0)">熟悉模式</li>
                            <li :class="{ 'active1': btnActive == 1 }" @click="changeType(1)">默认模式</li>
                            <li :class="{ 'active2': btnActive == 2 }" @click="changeType(2)">新鲜模式</li>
                        </ul>

                    </div>

                </div>
                <div class="right" @click="openSearch">
                    <i class="iconfont icon-sousuo"></i>
                </div>
            </div>

            <!-- :lazy-render="true" -->
            <van-swipe style="height: 100vh;" vertical :show-indicators="false" @change="onChange" v-if="suggestSongsList">
                <van-swipe-item v-for=" (item, index) in suggestSongsList" :key="item.id" v-lazy="item.al.picUrl">
                    <div class="card" @click="btnShowFlag = false">
                        <div class="bg-box">
                            <div class="bg" :style="{ 'background-image': 'url(' + item.al.picUrl + ')' }"></div>
                            <div class="bg-mar"></div>k
                        </div>
                        <div class="content">
                            <div class="null-box"></div>
                            <div class="img-box">
                                <img :src="item.al.picUrl" alt="" :ref="'img' + index" v-lazy="item.al.picUrl">
                            </div>
                            <div class="lyric">
                                <span>
                                    是因为太幸福
                                    <div class="bg-text"></div>
                                </span>

                            </div>
                            <div class="title">
                                <h3>
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
                                    <span @click="likeFun">
                                        <i class="iconfont icon-xihuan" :style="{'color':like?'red':''}"></i>
                                        <em>{{ 40000 | playcountData }}</em>
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
                                    <i class="iconfont icon-more_vert"></i>
                                </div>
                            </div>
                            <div class="rang">
                                <div class="rang-loading" v-if="!rangeFlag">
                                    <span></span>
                                </div>
                                <van-slider v-model="currentPlay" v-if="rangeFlag" @input="sliderInputFn"
                                    @drag-start="sliderDragStartFn" @drag-end="sliderDragEndFn" :button-size="6"
                                    :active-color="'#fff'" inactive-color="#ffffff7d" />
                            </div>
                        </div>

                    </div>
                </van-swipe-item>
            </van-swipe>

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import { getSuggestSongs, getSongDetail, getListByType, getListSongs } from '../api/playCon'
export default {
    data() {
        return {
            bodyBgColor: "#fff",
            suggestSongsList: null,  //推荐歌曲
            playIndex: 0,  // 当前index
            btnActive: 1, //模式按钮
            btnShowFlag: false,  // 模式切换
            loadFlag: false,   // loading开关
            styleWords: '推荐', // 模式文本
            songsUrl: null, //歌曲url
            currentPlay: 0, //进度条进度
            showShare: true, //分享显示
            like:false, // 是否喜欢
            options: [ // 分享列表数据
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' }],

        }
    },
    methods: {
        getSuggestSongsFn() { //每日推荐歌曲
            getSuggestSongs().then(data => {
                this.suggestSongsList = data.data.dailySongs
                this.$store.commit("setSongId", this.suggestSongsList[0].id)

            })
        },
        changeShow() { //模式按钮动态交互
            this.btnShowFlag = !this.btnShowFlag
        },
        changeType(num) { // 推荐模式切换
            this.loadFlag = true
            if (num === 0) {
                this.btnActive = 0
                setTimeout(() => {
                    this.btnShowFlag = false
                    this.styleWords = '熟悉模式'
                }, 300);
            } else if (num === 1) {
                this.btnActive = 1
                setTimeout(() => {
                    this.btnShowFlag = false
                    this.styleWords = '推荐'
                }, 300);
            } else if (num === 2) {
                this.btnActive = 2
                setTimeout(() => {
                    this.btnShowFlag = false
                    this.styleWords = '新鲜模式'
                }, 300);
            }
        },
        onChange(index) {  // 获取当前歌曲下标
            this.playIndex = index
        },
        getListByTypeFn() { //获得歌单(模式)分类
            getListByType().then(data => {
                if (this.btnActive == 0) {
                    this.$store.commit("setListId", data.playlists[Math.floor(Math.random() * 16)].id)
                } else if (this.btnActive == 1) {
                    this.$store.commit("setListId", data.playlists[Math.floor(Math.random() * 16 + 16)].id)
                }
                else if (this.btnActive == 2) {
                    this.$store.commit("setListId", data.playlists[Math.floor(Math.random() * 32 + 16)].id)
                }

            })
        },
        getSongDetailFn() { // 获取歌曲详情
            getSongDetail({
                ids: this.songId
            }).then(data => {
                console.log(data);
            })
        },
        getListSongsFn() { // 获取歌单所有歌曲
            getListSongs({
                id: this.listId,
                limit: 10
            }).then(data => {
                this.suggestSongsList = data.songs
                this.$store.commit("setSongId", this.suggestSongsList[0].id)
                // console.log(data.songs);
                setTimeout(() => {
                    this.loadFlag = false
                }, 3000);
            })
        },
        // togglePlay(){ // 播放状态切换
        //     if (this.playflag) {
        //         this.$refs.audio.play()
        //         this.ontimeupdataFn()
        //     }else{
        //         this.$refs.audio.pause()
        //     }
        // },
        sliderInputFn(value) { //拖动进度条
            this.$store.commit("setRangValue", value)
        },
        sliderDragStartFn() { //开始拖动效果
            this.$store.commit("setPlayflag", false)
        },
        sliderDragEndFn() {  //结束拖动效果
            this.$store.commit("setPlayflag", true)
        },
        loadinfFn() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
        },
        clearLoading() {
            setTimeout(() => {
                Toast.clear()
            }, 1000)
        },
        showShareFun() { //分享
            this.showShare = true

        },
        openSearch() { //搜索
            this.$router.push('/SearchView')

        },
        likeFun() { //添加/删除喜欢
            let likeSongs = JSON.parse(localStorage.getItem("songLike"));
            // if (!likeSongs) {
            //     localStorage.setItem('songLike',JSON.stringify([]))
            // }
            let index = likeSongs.findIndex(item=>item == this.songId)
            if (index == -1) {
                likeSongs.push(this.songId)
                this.like = true
            }else{
                likeSongs.splice(index,1)
                this.like = false
            }
            localStorage.setItem("songLike",JSON.stringify(likeSongs));
        },
        starKije(){//初始化歌曲喜欢咯额表
            let likeSongs = JSON.parse(localStorage.getItem("songLike"));
            if (!likeSongs) {
                localStorage.setItem('songLike',JSON.stringify([]))
            }
        }

    },
    watch: {
        'btnActive': function () {
            this.getListByTypeFn()
            this.loadinfFn()
        },
        '$store.state.listId': function () {
            this.getListSongsFn()
            this.clearLoading()
        },
        'playIndex': function () {
            // 判断是否喜欢
            this.$store.commit("setSongId", this.suggestSongsList[this.playIndex].id)
            let index = JSON.parse(localStorage.getItem("songLike")).findIndex(item=>item == this.songId)
            let time = setTimeout(()=>{
                if (index != -1) {
                    this.like = true
                }else{
                    this.like = false
                }
            },200)
            clearTimeout(time)

            // 获取歌曲详情
            this.getSongDetailFn()

        },
        '$store.state.rangValue': function () {
            this.currentPlay = this.rangValue
        },
        'currentPlay': function () {
            this.$store.commit("setRangValue", this.currentPlay)
        }

    },
    computed: {
        ...mapState(['songId', 'listId', 'rangValue', 'playflag', 'rangeFlag'])

    },
    filters:{
        playcountData(value){
            if(value < 10000){
                return value;
            }
            let w = value > 10000?value/10000:value;//万计算
            let y = w > 10000? parseInt(w/10000) + "亿+" : parseInt(w) + "万+";
            return y;
        }
    },
    created() {
        this.starKije()
        if (!this.listId) {
            this.getSuggestSongsFn()
        } else {
            this.getListSongsFn()
        }
    },
    mounted() {

    },
    beforeDestroy() {
        // console.log('end');
    }
}
</script>

<style lang="scss" scoped>
.playCon {
    .load-box {
        width: 100%;
        height: 100vh;
        background-color: #161616;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 9999;
    }

    .head-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
        background-color: transparent;

        .left {
            position: relative;

            .title {
                margin-left: 12px;
                text-align: center;
                display: flex;
                align-items: center;

                span {
                    transition: all .5s;

                    &.hiden {
                        transform: translateX(-15px);
                        opacity: 0;
                    }

                    i {
                        font-size: 12px;
                        zoom: .7;
                    }
                }

                h3 {
                    font-size: 14px;
                    font-weight: bolder;
                    margin-right: 5px;

                }
            }

            .btn {
                background-color: #292929;
                border-radius: 10px;
                position: absolute;
                left: 8px;
                top: 30px;
                width: 200px;
                height: 115px;
                opacity: 1;
                transition: all .5s;

                &.hiden {
                    opacity: 0;
                }

                .tip {
                    padding-left: 15px;

                    h3 {
                        color: #dadada;
                        font-size: 12px;
                        margin-top: 20px;
                    }

                    h4 {
                        margin-top: 5px;
                        color: #616161;
                        font-size: 12px;
                        zoom: .8;
                    }
                }

                ul {
                    margin: 10px 15px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background-color: #3b3e38;
                    border-radius: 18px;

                    li {
                        color: #616161;
                        font-size: 12px;
                        zoom: .8;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        padding: 0 8px;
                        border-radius: 15px;

                        &.active0 {
                            background-color: #ffe0cf;
                        }

                        &.active1 {
                            background-color: #fff;
                        }

                        &.active2 {
                            background-color: #d8ffa7;
                        }


                    }
                }
            }
        }

        .right {
            text-align: center;
            margin-right: 12px;

            i {
                font-size: 16px;
            }
        }
    }

    .card {
        width: 100%;
        height: 100vh;
        position: relative;

        .bg-box {
            position: absolute;
            z-index: 1;
            height: 100%;
            width: 100%;
            overflow: hidden;

            .bg {
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

            .bg-mar {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 2;
                background-image: linear-gradient(140deg, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.4) 100%)
            }
        }

        .content {
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 9;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .null-box {
                height: 40px;
                width: 100%;
            }

            // padding:0 12px;

            .img-box {
                margin-top: 25px;
                width: 100vw;

                // margin-left: 12px;
                img {
                    width: 93.5%;
                    height: 93.5vw;
                    margin: 0 auto;
                    border-radius: 5px;
                }
            }

            .lyric {
                flex: .35;
                span {
                    font-size: 14px;
                    color: #fff;
                    line-height: 16px;
                    position: relative;

                    .bg-text {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        // background-color: rgba(0, 0, 0, 0.1);
                        // background-color: red;
                    }

                }

                padding: 40px 0 30px 12px;
            }

            .title {
                padding-left: 12px;
                margin-bottom: 10px;

                h3 {
                    font-size: 16px;
                    font-weight: bold;

                    span {
                        margin-left: 10px;

                    }
                }

                .name {
                    margin-top: 5px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;

                    span {
                        font-size: 12px;
                        zoom: .5;
                        padding: 3px 5px;
                        background-color: #807b72;
                        border-radius: 8px;
                        margin-left: 10px;

                    }
                }
            }

            .btn-box {
                display: flex;
                justify-content: space-between;

                .left {
                    display: flex;
                    align-items: flex-start;
                    height: 42px;

                    span {
                        padding: 12px;
                        display: flex;
                        align-items: flex-start;

                        &:nth-child(1) {
                            i {
                                font-size: 18px;
                            }

                        }

                        i {
                            color: #fff;
                            opacity: .9;
                            font-size: 15px;
                            display: block;
                            padding-right: 5px;

                        }

                        em {
                            font-size: 12px;
                            color: #fff;
                            opacity: .8;
                            zoom: .5;
                            display: block;

                        }
                    }

                }

                .right {
                    height: 42px;
                    line-height: 42px;
                    padding-right: 12px;
                    color: #fff;
                    opacity: .7;

                }
            }

            .rang {
                margin-bottom: 40px;
                padding:  12px;
               
                .rang-loading {
                    width: 100%;
                    height: 3px;
                    background-color: #ffffff7d;
                    position: relative;
                    overflow: hidden;

                    span {
                        position: absolute;
                        display: block;
                        height: 3px;
                        top: 0px;
                        left: 0;
                        width: 30%;
                        border-radius: 3px;
                        background-image: linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%);
                        animation: rangeLodingMove 1.5s linear infinite;



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

    40% {
        left: 45%;
    }

    60% {
        left: 55%;
    }

    100% {
        left: 100%;
    }

}</style>