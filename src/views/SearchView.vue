<template>
    <div>
        <div class="SearchView">
            <div class="bg-box"  :style="{ 'background-image':'linear-gradient(140deg,'+ '#ecaec0' + ' 0%,#121212 45%)'}" ></div>
            <div class="content">
                <div class="head-nav">
                    <div class="left">
                        <span @click="backHome">
                            <i class="iconfont icon-jiantouyou"></i>
                        </span>
                    </div>
                    <div class="input-box">
                        <van-search 
                        v-model="value" placeholder="歌手 / 歌曲 / 专辑" 
                        background="transparent"
                        :error="true"
                        :autofocus="true"
                        />
                    </div>
                </div>
                <div class="null-box"></div>
                <div class="search-face" v-if="faceFlag">
                    <div class="history">
                        <div class="top" v-if="searchHistory.length != 0">
                            <div class="title">
                                <h4>搜索历史</h4>
                            </div>
                            <div class="del">
                                <span @click="clearHistory">
                                    <i class="iconfont icon-shanchu"></i>
                                </span>
                            </div>
                        </div>
                        <div class="bottom">
                            <ul>
                                <li v-for="(item,index) in searchHistory" :key="index" @click="selectHistory(item)">
                                    {{ item }}
                                </li>
                            
                            </ul>
                        </div>
                    </div>
                    <div class="banner" v-if="banners">
                        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators="false">
                            <van-swipe-item v-for="(item,index) in banners" :key="index">
                                <div class="img-box">
                                <img :src="item.pic" alt="">
                                </div>
                            </van-swipe-item>
                    
                        </van-swipe>
                    </div>
                </div>
                <div class="suggest">
                    <ul>
                        <li v-if="suggestList.length!=0" @click="getResult(keyWord)">
                            <div class="left">
                                <span class="iconfont icon-sousuo"></span>
                            </div>
                            <p class="one-txt-cut" >{{ keyWord }}</p>
                        </li>
                        <li v-for="(item,index) in suggestList" :key="index" @click="getResult(item.keyword)">
                            <div class="left">
                                <span class="iconfont icon-sousuo"></span>
                            </div>
                            <p class="one-txt-cut">{{ item.keyword }}</p>
                        </li>
                    
                    </ul>
                </div>
       
            </div>
        </div>
    </div>
</template>
<script>
import { getBanner,getsuggest } from "../api/searchView";
export default {
    data() {
        return {
            bgColor:'#ecaec0',
            value: '',
            searchHistory:[],  // 搜索历史
            banners:null, // 轮播图
            keyWord:null, // 搜索关键词
            suggestList:[], //搜索建议
            faceFlag: true, // 搜索首页显示开关 
            active:0,  //选项卡索引
            // resultFlag:false // 结果显示开关 


       
        }
    },
    methods: {
        getBanner(){ //获取轮播图数据
            getBanner({
                type:'1'
            }).then(data=>{
               this.banners = data.banners

            })

        },
        clearHistory(){ //清空历史记录
            this.searchHistory = []

        },
        backHome(){ // 返回首页
            this.$router.go(-1)
            this.$store.commit("setHomeTabFlag",true)
        },
        getsuggestFn(){ // 获取搜索建议词
            getsuggest({
                keywords:this.keyWord,
                type:'mobile'
            }).then(data=>{
                if (data.code == 200) {
                    this.faceFlag = false
                    this.suggestList = data.result.allMatch
                }
            })
        },
  
        getResult(word){ //选取建议关键词
           this.$store.commit("setHomeTabFlag",false)
           let index = this.searchHistory.findIndex(item => item==word)
            if (index == -1) {
                this.searchHistory.push(word)
                localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
            }
           this.$router.push({
              name: 'SearchResultView',
              params:{
                keyWord: word
              }
           })
        },
        selectHistory(word){ // 点击搜索历史
            this.keyWord = word
            this.$router.push({
              name: 'SearchResultView',
              params:{
                keyWord: word
              }
           })

        },
        getHistory(){ // 读取/更改历史记录
            if (localStorage.getItem('searchHistory')) {
                let word = JSON.parse(localStorage.getItem('searchHistory'))
                this.searchHistory = word
            }else{
                localStorage.setItem('searchHistory',JSON.stringify([]))
            }
        }
       
    },
  
    watch:{
        'value':function(){
            var time = null
            time = setTimeout(() => {
                this.keyWord = this.value
                clearInterval(time)
            }, 300);

        },
        'keyWord':function () {
           if (this.keyWord == '') {
                this.suggestList = []
                this.faceFlag = true
            }else{
                this.getsuggestFn()
                this.faceFlag = false
            }
        },
        'searchHistory':function(){
            localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
        }
      
    },
    created() {
        this.$store.commit("setHomeTabFlag",false)
        this.bgColor = this.$route.params.bgColor
        this.getBanner()
        this.getHistory()
      
    },

    
}

</script>

<style lang="scss" scoped>
.SearchView{
    position: relative;
    .bg-box{
        position: absolute;
        width: 100%;
        height: 2000px;
        top: -750px;
        left: 0px;
        z-index: 2;
    }
    .content{
        position: relative;
        top: 0;
        width: 100%;
        z-index: 99;
        .head-nav{
            padding: 2px 0;
            display: flex;
            height: 40px;
            align-items: center;
            position: fixed;
            z-index: 999;
            width: 100%;
            top: 0;
            left: 0;
            // background-color: #161616;
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
        .search-face{
            .history{
                margin-top: 10px;
                .top{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 15px 0 12px;
                    .title{
                        h4{
                            font-size: 12px;
                            opacity: .8;
                            font-weight: normal;

                        }
                    }
                    .del{
                        span{
                            i{
                                font-size: 12px;
                                opacity: .8;

                            }
                        }
                    }
                }
                .bottom{
                    ul{
                        display: flex;
                        padding: 0 15px 0 12px;
                        flex-wrap: wrap;
                        li{
                            margin-right: 10px;
                            font-size: 12px;
                            zoom: .9;
                            opacity: .7;
                            padding: 6px 10px;
                            background-color: rgba(255, 255, 255, 0.172);
                            border-radius: 12px;
                            margin-top: 10px;

                        }
                    }
                }
            }
            .banner{
                width: 100%;
                margin-top: 25px;
                .img-box{
                    width: 100%;
                    padding: 0 12px;
                    height: 136px;
                    box-sizing: border-box;
                    border-radius: 7px;
                    overflow: hidden;
                    img{
                        border-radius: 7px;
                        width: 100%;
                        
                      
                    }
                }
        
            }

        }
        .suggest{
            ul{
                li{
                    display: flex;
                    align-items: center;
                    margin-top: 15px;
                    &:first-child{
                        p{
                            color: green;
                        }
                    }
            
                    .left{
                        padding:0 3px 0 12px;
                        span{
                            i{
                                font-size: 12px;

                            }
                        }
                    }
                    p{
                        flex: 1;
                        font-size: 12px;
                        font-weight: 100;

                    }
                }
            }
        }
   

    }
}

    
</style>