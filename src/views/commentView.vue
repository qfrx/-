<template>
    <div>
      <div class="commentview" v-if="commentList">
        <div class="load-box" v-if="loadFlag">
            <van-loading color="#fff" size="26" />
        </div>
        <div class="head-nav">
            <div class="left">
                <span @click="back">
                    <i class="iconfont icon-jiantoushang"></i>
                </span>
            </div>
            <div class="title">
                <h3>评论({{ commentNum }})</h3>
            </div>
        </div>
        <div class="null-box"></div>
        <div class="list-box">
            <ul>
                <li v-for="item in commentList" :key="item.commentId">
                    <div class="top">
                        <div class="left">
                            <div class="img-box">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                        </div>
                        <div class="right">
                            <div class="name">
                                <h3>{{ item.user.nickname }}</h3>
                            </div>
                            <div class="time">
                                <p>{{ item.timeStr }}</p>
                            </div>
                            <div class="btn" @click="likeFun(item)">
                                <i class="iconfont icon-dianzan" :style="{'color':item.liked?'red':''}"></i>
                                <span>{{ item.liked?item.likedCount+1:item.likedCount }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <p>{{ item.content }}</p>
                    </div>
                    <div class="answer" v-if="item.beReplied.length!=0">
                        <span>---查看共{{ item.beReplied.length }}条回复</span>
                        <span>
                            <i class="iconfont icon-jiantouyou"></i>
                        </span>
                    </div>

                </li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
import {getComment,setLike} from '../api/comment'
export default{
    data() {
        return {
            listid:null,
            commentList:null,
            likeFlag:false,
            commentNum:0,
            loadFlag:true,
            value:''
        }
    },
    methods: {
        back(){ // 返回
            this.$router.push(this.$route.params.fromName)
        },
        getCommentFn(){  //获取评论数据
            getComment({
                id:this.$route.params.listId,
                limit:99
            }).then(data=>{
                this.commentList = data.comments
                console.log(data);
                this.commentNum = data.total
                setTimeout(()=>{
                    this.loadFlag = false
                },500)

            })
        },
        likeFun(item){
            item.liked = !item.liked
            this.setLikeFun(item)
        },
        setLikeFun(obj){    // 请求数据点赞
            setLike({
                cid:obj.commentId,
                type:2,
                t:obj.liked?1:0
            })
        }
    
     
    },
  
    created() {
        this.getCommentFn()
    
    },
}
</script>

<style lang="scss">
    .commentview{
        position: relative;
        z-index: 999;
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
            position: absolute;
            z-index: 900;
            background-color: #161616;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 40px;
            position: fixed;
            top: 0;
            left: 0;
            .left{
                position: absolute;
                left: 12px;
                transform: rotateZ(180deg);
                span{
                    i{
                        font-size: 14px;

                    }
                }
            }
            .title{
                h3{
                    font-size: 14px;

                }
            }
        }
        .null-box{
            height: 40px;
            width: 100%;
        }
        .list-box{
            ul{
                background-color: #161616;
                li{
                    padding: 10px 0;
                    .top{
                        display: flex;
                        .left{
                            width: 40px;
                            padding-left: 12px;
                            box-sizing: border-box;
                            .img-box{
                                img{
                                    height: 22px;
                                    width: 22px;
                                    border-radius:50% ;
                                }
                            }
                        }
                        .right{
                            height: 25px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            flex: 1;
                            position: relative;
                            .name{
                                h3{
                                    font-size: 12px;
                                    zoom: .8;
                                }
                            }
                            .time{
                                p{
                                    font-size: 12px;
                                    zoom: .6;
                                    opacity: .6;
                                }
                            }
                            .btn{
                                display: flex;
                                flex-direction: column;
                                position: absolute;
                                right: 12px;
                                bottom: -10px;
                                &.active{
                                    span{
                                        color: red;
                                    }
                                    i{
                                        color: red;
                                    }
                                }
                                
                                i{
                                    font-size: 12px;
                                    opacity: .7;
                                }
                                span{
                                    padding-top: 10px;
                                    font-size: 12px;
                                    zoom: .6;
                                    opacity: .7;
                                    text-align: center;
                                   
                                }
                            }
                        }

                    }
                    .bottom{
                        margin-top: 8px;
                        width: 100%;
                        padding:0 45px 0 40px;
                        box-sizing: border-box;
                        p{
                            font-size: 12px;
                            opacity: .9;
                            zoom: .8;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 5;
                        }

                   
                    
                    }
                    .answer{
                        padding-left: 40px;
                        margin-top: 10px;
                        span{
                            font-size: 12px;
                            zoom: .7;
                            opacity: .6;
                            margin-right: 5px;
                            i{
                                font-size: 12px;
                                zoom: .8;
                            }

                        }

                    }
                }
            }
        }
    }
</style>