<template>
    <div>
        <div class="SearchResultView">
         
            <div class="head-nav" @click="backHome">
                <div class="left">
                    <span >
                        <i class="iconfont icon-jiantouyou"></i>
                    </span>
                </div>
                <div class="input-box">
                    <van-search 
                    v-model="value" placeholder="歌手 / 歌曲 / 专辑" 
                    background="transparent"
                    :error="true"
                    :autofocus="true"
                    @focus="reInput"
                    />
                </div>
            </div>
            <div class="null-box"></div>
            <div class="result-box">
                <div class="result">
                    <van-tabs v-model="active" :animated="true" :swipeable="true" :sticky="true" offset-top="40" :lazy-render="true">
                        <van-tab title="综合" >
                            <div class="all-tab" v-if="allData">
                                <div class="floor maybe" v-if="allData.song.songs.length!=0">
                                    <div class="title">你可能想搜</div>
                                    <ul>
                                        <li>
                                            <div class="left">
                                                <div class="img-box">
                                                    <img :src="allData.artist.artists[0].img1v1Url + '?param=40y40'" alt="">
                                                </div>
                                            </div>
                                            <div class="center">
                                                <div class="name">
                                                    <h4>{{ allData.artist.artists[0].name }}</h4>
                                                </div>
                                                <div class="des">
                                                    <p>共 {{ allData.artist.artists[0].mvSize }} 首歌曲</p>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <span>
                                                    <i class="iconfont icon-jiantouyou"></i>
                                                </span>
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                                <div class="floor song" v-if="allData.song.songs.length!=0">
                                    <div class="title">歌曲</div>
                                    <ul>
                                        <li v-for="item in allData.song.songs" :key="item.id" @click="playSong(item.id)">
                                            <div class="left">
                                                <div class="name">
                                                    <h3>
                                                        {{ item.name }}
                                                    </h3>
                                                </div>
                                                <div class="des">
                                                    <span class="vip" v-if="item.fee == 1">vip</span>
                                                    <span class="own" v-if="item.originCoverType">原唱</span>
                                                    <p>
                                                        {{ item.ar[0].name }} {{  item.alia[0] }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <span>
                                                    <i class="iconfont icon-xihuan"></i>
                                                </span>
                                                <span>
                                                    <i class="iconfont icon-more_vert"></i>
                                                </span>
                                            </div>
                                            
                                        </li>
                                    </ul>
                                    <div class="more" @click="active=1">
                                        <p>查看所有歌曲</p>
                                        <span>
                                            <i class="iconfont icon-jiantouyou"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="floor singer" v-if="allData.artist.artists.length!=0">
                                    <div class="title">音乐人</div>
                                    <ul>
                                        <li v-for="item in allData.artist.artists" :key="item.id">
                                            <div class="img-box">
                                                <img :src="item.picUrl +'?param=40y40'" alt="">
                                            </div>
                                            <div class="left">
                                                <div class="name">
                                                    <h3>
                                                        {{ item.name }}
                                                    </h3>
                                                </div>
                                                <div class="des">
                                                    <p>
                                                        共 {{ item.mvSize }} 首歌曲
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <span>
                                                    <i class="iconfont icon-jiantouyou"></i>
                                                </span>
                                            </div>
                                            
                                        </li>
                                    </ul>
                                    <div class="more" @click="active=2">
                                        <p>查看所有音乐人</p>
                                        <span>
                                            <i class="iconfont icon-jiantouyou"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="floor songlist" v-if="allData.playList.playLists.length!=0">
                                    <div class="title">歌单</div>
                                    <ul>
                                        <li v-for="item in allData.playList.playLists" :key="item.id" @click="openListPage(item.id)">
                                            <div class="img-box">
                                                <img :src="item.coverImgUrl +'?param=40y40'" alt="">
                                            </div>
                                            <div class="left">
                                                <div class="name">
                                                    <h3 class="one-txt-cut">
                                                        {{ item.name }}
                                                    </h3>
                                                </div>
                                                <div class="des">
                                              
                                                    <p>
                                                        {{ item.track.artists[0].name }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <span>
                                                    <i class="iconfont icon-jiantouyou"></i>
                                                </span>
                                            </div>
                                            
                                        </li>
                                    </ul>
                                    <div class="more" @click="active=3">
                                        <p>查看所有歌单</p>
                                        <span>
                                            <i class="iconfont icon-jiantouyou"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="floor list" v-if="allData.album.albums.length!=0">
                                    <div class="title">专辑</div>
                                    <ul>
                                        <li v-for="item in allData.album.albums" :key="item.id" @click="openListPage(item.id)">
                                            <div class="img-box">
                                                <img :src="item.picUrl +'?param=40y40'" alt="">
                                            </div>
                                            <div class="left">
                                                <div class="name">
                                                    <h3>
                                                        {{ item.name }}
                                                    </h3>
                                                </div>
                                                <div class="des">
                                                    <p>
                                                        {{ item.artist.name }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <span >
                                                    <i class="iconfont icon-jiantouyou"></i>
                                                </span>
                                            </div>
                                            
                                        </li>
                                    </ul>
                                    <div class="more" @click="active=4">
                                        <p>查看所有歌单</p>
                                        <span>
                                            <i class="iconfont icon-jiantouyou"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="歌曲">
                             <div class="song-tab"  v-if="songData">
                                <ul>
                                    <li v-for="item in songData" :key="item.id" @click="playSong(item.id)">
                                        <div class="left">
                                            <div class="name">
                                                <h3>
                                                    {{ item.name }}
                                                </h3>
                                            </div>
                                            <div class="des">
                                                <span class="vip" v-if="item.fee == 1">vip</span>
                                                <span class="own" v-if="item.originCoverType">原唱</span>
                                                <p>
                                                   {{ item.artists[0].name }} - {{ item.album.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <span>
                                                <i class="iconfont icon-xihuan"></i>
                                            </span>
                                            <span>
                                                <i class="iconfont icon-more_vert"></i>
                                            </span>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div> 
                           
                        </van-tab>
                        <van-tab title="音乐人">
                            <div class="singer-tab" v-if="singerData">
                                <ul>
                                    <li v-for="item in singerData" :key="item.id">
                                        <div class="img-box">
                                            <img :src="item.picUrl +'?param=40y40'" alt="">
                                        </div>
                                        <div class="left">
                                            <div class="name">
                                                <h3>
                                                    {{ item.name }}
                                                </h3>
                                            </div>
                                            <div class="des">
                                                <p>
                                                    共 {{ item.mvSize }} 首歌曲
                                                </p>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <span>
                                                <i class="iconfont icon-jiantouyou"></i>
                                            </span>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div>
                            
                        </van-tab>
                        <van-tab title="歌单">
                            <div class="songlist-tab" v-if="songlistData">
                                <ul>
                                    <li v-for="item in songlistData" :key="item.id" @click="openListPage(item.id)">
                                        <div class="img-box">
                                            <img :src="item.coverImgUrl +'?param=40y40'" alt="">
                                        </div>
                                        <div class="left">
                                            <div class="name">
                                                <h3 class="one-txt-cut">
                                                    {{ item.name }}
                                                </h3>
                                            </div>
                                            <div class="des">
                                            
                                                <p>
                                                    {{ item.track.artists[0].name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <span>
                                                <i class="iconfont icon-jiantouyou"></i>
                                            </span>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div>
                        </van-tab>
                        <van-tab title="专辑">
                            <div class="list-tab" v-if="listData">
                                <ul>
                                    <li v-for="item in listData" :key="item.id" @click="openListPage(item.id)">
                                        <div class="img-box">
                                            <img :src="item.picUrl +'?param=40y40'" alt="">
                                        </div>
                                        <div class="left">
                                            <div class="name">
                                                <h3>
                                                    {{ item.name }}
                                                </h3>
                                            </div>
                                            <div class="des">
                                                <p>
                                                    {{ item.artist.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <span >
                                                <i class="iconfont icon-jiantouyou"></i>
                                            </span>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div> 
             
        
        </div>

    </div>
</template>


<script>
import { mapState } from "vuex";
import { searchResult } from "../api/SearchResultView";
    export default{
        data() {
            return {
                value:'', //搜索框的值
                active:0, //展示分类下标
                allData:null, //综合
                songData:null, //歌曲
                singerData:null, //歌手
                songlistData:null, //歌单
                listData:null, //专辑
          
            }
        },
        methods: {
            reInput(){  // 重新输入搜索内容
                this.$router.push('/SearchView')
            },
            backHome(){  // 返回主页
                this.$router.go(-1)
                this.$store.commit("setHomeTabFlag",true)
            },
            searchResultAllFn(keyword){ // 综合数据
                searchResult({
                    type : 1018,
                    keywords : keyword
                }).then(data=>{
                    this.allData = data.result
                })
            },
            searchResultSongFn(keyword){ // 歌曲数据
                searchResult({
                    type : 1,
                    keywords : keyword
                }).then(data=>{
                    this.songData = data.result.songs
                })
             
            },
            searchResultSingerFn(keyword){ // 音乐人数据
                searchResult({
                    type : 100,
                    keywords : keyword
                }).then(data=>{
                    this.singerData = data.result.artists
                })
            },
            searchResultSonglistFn(keyword){ // 歌单数据
                searchResult({
                    type : 1000,
                    keywords : keyword
                }).then(data=>{
                    this.songlistData = data.result.playlists
                })
            },
            searchResultListFn(keyword){ // 专辑数据
                searchResult({
                    type : 10,
                    keywords : keyword
                }).then(data=>{
                    this.listData = data.result.albums
                })
            },
            playSong(id){ //比方歌曲
                this.$store.commit("setSongId",id)

            },
            openListPage(id){ //跳转到对应歌单/专辑
                this.$store.commit("setListConId",id)
                this.$router.push('/listView')
        
            },
        },
        watch:{
            'active':function(){
                if (this.active === 1) {
                    this.searchResultSongFn(this.value)
                }else if (this.active === 2) {
                    this.searchResultSingerFn(this.value)
                }else if (this.active === 3) {
                    this.searchResultSonglistFn(this.value)
                }else if (this.active === 4) {
                    this.searchResultListFn(this.value)
                }
            }

        },
        computed:{
            ...mapState(['HomeTabFlag','songId'])
        },
        created() {
           this.value = this.$route.params.keyWord
            // console.log(this.$route.params.keyWord);
            this.searchResultAllFn(this.value)
            
        },
    
    }
</script>

<style lang="scss" scoped>
    .SearchResultView{
          background-color: #161616;
          li{
            &:active{
                background-color: rgba(255, 255, 255, 0.07);
            }
          }
        .head-nav{
            background-color: #161616;
            padding: 2px 0;
            display: flex;
            height: 40px;
            align-items: center;
            position: fixed;
            z-index: 999;
            width: 100%;
            top: 0;
            left: 0;
            .left{
                span{
                    display: block;
                    transform: rotateZ(180deg);
                    display: flex;
                    padding: 0 10px 0 12px;
                    
                    i{

                    }
                }
            }
            .input-box{
                flex: 1;
                padding-right: 14px;
                ::v-deep .van-search__content {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 13px;
                }
                ::v-deep .van-search{
                    padding: 0;
                }
                ::v-deep .van-field{
                    padding: 0;
                    height: 26px;
                    input{
                        line-height: 26px;
                        color: rgba(255, 255, 255, 0.776);
                        caret-color:green;
                        font-size: 14px;
                        box-sizing: border-box;
                   }
                    input::-webkit-input-placeholder{ /*WebKit browsers*/
                        color: #fff;
                        opacity: .4;
                        font-size: 12px;
                        zoom: .9;
                    }
                    input::-moz-input-placeholder{ /*Mozilla Firefox*/
                        color: #fff;
                        opacity: .4;
                        font-size: 12px;
                        zoom: .9;
                    }
                    input::-ms-input-placeholder{ /*Internet Explorer*/ 
                        color: #fff;
                        opacity: .4;
                        font-size: 12px;
                        zoom: .9;
                    }
                }
            }
        }
        .null-box{
            height: 40px;
        }
        .result-box{
            .result{
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
                .all-tab{
                    padding: 11px;
                    .floor{
                        border-radius: 15px;
                        padding: 11px;
                        background-color: rgba(255, 255, 255, 0.08);
                        margin-top: 10px;
                        
                    }
                    .maybe{
                        .title{
                            font-size: 12px;
                            opacity: .9;
                        }
                        ul{
                            margin-top: 11px;
                            li{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .left{
                                    .img-box{
                                        img{
                                            width: 35px;
                                            height: 35px;
                                            border-radius: 50%;
                                        }
                                    }
                                }
                                .center{
                                    flex: 1;
                                    padding-left: 11px;
                                    .name{
                                        h4{
                                            font-size: 12px;
                                            zoom: .9;
                                            opacity: .9;

                                        }
                                    }
                                    .des{
                                        margin-top: 2px;
                                        p{
                                            font-size: 12px;
                                            zoom: .6;
                                            opacity: .5;

                                        }
                                    }
                                }
                                .right{
                                    span{
                                        i{
                                            font-size: 12px;
                                            opacity: .6;
                                            
                                        }
                                    }
                                }
                            }
                        }
                        

                    }
                    .song{
                        .title{
                            font-size: 12px;
                            opacity: .9;
                        }
                        ul{
                            margin-top: 10px;
                            li{
                                padding: 11px 0;
                                display: flex;
                                justify-content: space-between;
                                .left{
                                    .name{
                                        h3{
                                            font-size: 12px;
                                            zoom: .9;
                                            opacity: .9;

                                        }
                                    }
                                    .des{
                                        margin-top: 6px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            margin-right: 8px;
                                            font-size: 12px;
                                            color: #00c561;
                                            padding: 2px 5px;
                                            zoom: .5;
                                            background-color: #00c5633b;
                                        }
                                        p{
                                            font-size: 12px;
                                            zoom: .6;
                                            opacity: .5;

                                        }
                                        
                                    }
                                }
                                .right{
                                    span{
                                        &:nth-child(1){
                                            margin-right: 18px;
                                        }
                                        i{
                                            opacity: .4;

                                        }
                                    }
                                }
                            }
                        }
                        .more{
                            padding: 11px 0;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            p{
                                font-size: 12px;
                                opacity: .6;
                            }
                            span{
                                font-size: 12px;
                                zoom: .8;
                                opacity: .6;

                            }
                        }
                    }
                    .singer{
                        .title{
                            font-size: 12px;
                            opacity: .9;
                        }
                        ul{
                            margin-top: 10px;
                            li{
                                padding: 11px 0;
                                display: flex;
                                justify-content: space-between;
                                .img-box{
                                    margin-right: 11px;
                                    img{
                                        width: 35px;
                                        height: 35px;
                                        border-radius: 50%;
                                    }
                                }
                                .left{
                                    flex: 1;
                                    .name{
                                        h3{
                                            font-size: 12px;
                                            zoom: .9;
                                            opacity: .9;

                                        }
                                    }
                                    .des{
                                        margin-top: 6px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            margin-right: 8px;
                                            font-size: 12px;
                                            color: #00c561;
                                            padding: 2px 5px;
                                            zoom: .5;
                                            background-color: #00c5633b;
                                        }
                                        p{
                                            font-size: 12px;
                                            zoom: .6;
                                            opacity: .5;

                                        }
                                        
                                    }
                                }
                                .right{
                                    span{
                                        font-size: 12px;
                                        zoom: .8;
                                        opacity: .6;
                                    }
                                }
                            }
                        }
                        .more{
                            padding: 11px 0;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            p{
                                font-size: 12px;
                                opacity: .6;
                            }
                            span{
                                font-size: 12px;
                                zoom: .8;
                                opacity: .6;

                            }
                        }
                    }
                    .songlist{
                        .title{
                            font-size: 12px;
                            opacity: .9;
                        }
                        ul{
                            margin-top: 10px;
                            li{
                                padding: 11px 0;
                                display: flex;
                                justify-content: space-between;
                                .img-box{
                                    margin-right: 11px;
                                    img{
                                        width: 35px;
                                        height: 35px;
                                        border-radius: 5px;
                                    }
                                }
                                .left{
                                    flex: 1;
                                    .name{
                                        h3{
                                            font-size: 12px;
                                            zoom: .9;
                                            opacity: .9;

                                        }
                                    }
                                    .des{
                                        margin-top: 6px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            margin-right: 8px;
                                            font-size: 12px;
                                            color: #00c561;
                                            padding: 2px 5px;
                                            zoom: .5;
                                            background-color: #00c5633b;
                                        }
                                        p{
                                            font-size: 12px;
                                            zoom: .6;
                                            opacity: .5;

                                        }
                                        
                                    }
                                }
                                .right{
                                    span{
                                        font-size: 12px;
                                        zoom: .8;
                                        opacity: .6;
                                    }
                                }
                            }
                        }
                        .more{
                            padding: 11px 0;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            p{
                                font-size: 12px;
                                opacity: .6;
                            }
                            span{
                                font-size: 12px;
                                zoom: .8;
                                opacity: .6;

                            }
                        }
                    }
                    .list{
                        .title{
                            font-size: 12px;
                            opacity: .9;
                        }
                        ul{
                            margin-top: 10px;
                            li{
                                padding: 11px 0;
                                display: flex;
                                justify-content: space-between;
                                .img-box{
                                    margin-right: 11px;
                                    img{
                                        width: 35px;
                                        height: 35px;
                                        border-radius: 5px;
                                    }
                                }
                                .left{
                                    flex: 1;
                                    .name{
                                        h3{
                                            font-size: 12px;
                                            zoom: .9;
                                            opacity: .9;

                                        }
                                    }
                                    .des{
                                        margin-top: 6px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            margin-right: 8px;
                                            font-size: 12px;
                                            color: #00c561;
                                            padding: 2px 5px;
                                            zoom: .5;
                                            background-color: #00c5633b;
                                        }
                                        p{
                                            font-size: 12px;
                                            zoom: .6;
                                            opacity: .5;

                                        }
                                        
                                    }
                                }
                                .right{
                                    span{
                                        font-size: 12px;
                                        zoom: .8;
                                        opacity: .6;
                                    }
                                }
                            }
                        }
                        .more{
                            padding: 11px 0;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            p{
                                font-size: 12px;
                                opacity: .6;
                            }
                            span{
                                font-size: 12px;
                                zoom: .8;
                                opacity: .6;

                            }
                        }
                    }

                }
                .song-tab{
                    ul{
                        margin-top: 10px;
                        padding: 0 12px;
                        li{
                            padding: 11px 0;
                            display: flex;
                            justify-content: space-between;
                            .left{
                                .name{
                                    h3{
                                        font-size: 12px;
                                        zoom: .9;
                                        opacity: .9;

                                    }
                                }
                                .des{
                                    margin-top: 6px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        margin-right: 8px;
                                        font-size: 12px;
                                        color: #00c561;
                                        padding: 2px 5px;
                                        zoom: .5;
                                        background-color: #00c5633b;
                                    }
                                    p{
                                        font-size: 12px;
                                        zoom: .6;
                                        opacity: .5;

                                    }
                                    
                                }
                            }
                            .right{
                                span{
                                    &:nth-child(1){
                                        margin-right: 18px;
                                    }
                                    i{
                                        opacity: .4;

                                    }
                                }
                            }
                        }
                    }

                }
                .singer-tab{
                    ul{
                        margin-top: 10px;
                        padding: 0 12px;
                        li{
                            padding: 11px 0;
                            display: flex;
                            justify-content: space-between;
                            .img-box{
                                margin-right: 11px;
                                img{
                                    width: 35px;
                                    height: 35px;
                                    border-radius: 50%;
                                }
                            }
                            .left{
                                flex: 1;
                                .name{
                                    h3{
                                        font-size: 12px;
                                        zoom: .9;
                                        opacity: .9;

                                    }
                                }
                                .des{
                                    margin-top: 6px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        margin-right: 8px;
                                        font-size: 12px;
                                        color: #00c561;
                                        padding: 2px 5px;
                                        zoom: .5;
                                        background-color: #00c5633b;
                                    }
                                    p{
                                        font-size: 12px;
                                        zoom: .6;
                                        opacity: .5;

                                    }
                                    
                                }
                            }
                            .right{
                                span{
                                    font-size: 12px;
                                    zoom: .8;
                                    opacity: .6;
                                }
                            }
                        }
                    }
                }
                .songlist-tab{
                    ul{
                        padding: 0 12px;
                        margin-top: 10px;
                        li{
                            padding: 11px 0;
                            display: flex;
                            justify-content: space-between;
                            .img-box{
                                margin-right: 11px;
                                img{
                                    width: 35px;
                                    height: 35px;
                                    border-radius: 5px;
                                }
                            }
                            .left{
                                flex: 1;
                                .name{
                                    h3{
                                        font-size: 12px;
                                        zoom: .9;
                                        opacity: .9;

                                    }
                                }
                                .des{
                                    margin-top: 6px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        margin-right: 8px;
                                        font-size: 12px;
                                        color: #00c561;
                                        padding: 2px 5px;
                                        zoom: .5;
                                        background-color: #00c5633b;
                                    }
                                    p{
                                        font-size: 12px;
                                        zoom: .6;
                                        opacity: .5;

                                    }
                                    
                                }
                            }
                            .right{
                                span{
                                    font-size: 12px;
                                    zoom: .8;
                                    opacity: .6;
                                }
                            }
                        }
                    }
                }
                .list-tab{
                    ul{
                        padding: 0 12px;
                        margin-top: 10px;
                        li{
                            padding: 11px 0;
                            display: flex;
                            justify-content: space-between;
                            .img-box{
                                margin-right: 11px;
                                img{
                                    width: 35px;
                                    height: 35px;
                                    border-radius: 5px;
                                }
                            }
                            .left{
                                flex: 1;
                                .name{
                                    h3{
                                        font-size: 12px;
                                        zoom: .9;
                                        opacity: .9;

                                    }
                                }
                                .des{
                                    margin-top: 6px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        margin-right: 8px;
                                        font-size: 12px;
                                        color: #00c561;
                                        padding: 2px 5px;
                                        zoom: .5;
                                        background-color: #00c5633b;
                                    }
                                    p{
                                        font-size: 12px;
                                        zoom: .6;
                                        opacity: .5;

                                    }
                                    
                                }
                            }
                            .right{
                                span{
                                    font-size: 12px;
                                    zoom: .8;
                                    opacity: .6;
                                }
                            }
                        }
                    }
                }
            }
       }
     
    }
</style>

