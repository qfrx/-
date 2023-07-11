<template>
    <div>
        <div class="Player">
            <audio 
            :src="songUrl" 
            ref="audio"  
            autoplay 
            @loadeddata="onloadeddataFn"
            @timeupdate="ontimeupdataFn" 
            ></audio>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import {getSongUrl} from '../api/SongsPlayer'
export default {
    data() {
        return {
            songUrl:null,
            timeLeft:0,
            timeRight:0,
        }
    },
    methods: {
        getSongUrlFn(id){ //获取歌曲url
            getSongUrl({
                id:id
            }).then(data=>{
                // console.log(data.data[0]);
                this.songUrl = data.data[0].url
            })
        },
        togglePlay(){ // 播放状态切换
            if (this.playflag) {
                this.$refs.audio.play()
                // this.ontimeupdataFn()
            }else{
                this.$refs.audio.pause()
            }
        },
        ontimeupdataFn(){ // 歌曲播放进度
            this.timeLeft = this.$refs.audio.currentTime
            this.$store.commit("setRangValue",100 * (this.timeLeft / this.timeRight))
        },
        onloadeddataFn(){  // 歌曲mp3加载完成
            this.$store.commit("setRangeFlag",true) //播放歌曲
            this.$store.commit("setPlayflag",true) //播放歌曲
            this.togglePlay();
            this.timeRight = this.$refs.audio.duration;
        },
        changeRange(){  // 进度条拖动 改变 播放进度
            let touchTime = (this.rangValue / 100) * this.timeRight
            this.timeLeft = touchTime
            this.$refs.audio.currentTime = touchTime
        }
    },
    watch:{
        '$store.state.songId':function(){
            this.getSongUrlFn(this.songId)
            this.$store.commit("setRangeFlag",false) // 改变进度条-加载
        },
        '$store.state.playflag':function(){
           this.togglePlay()
        },
        '$store.state.rangValue':function(){
            if (this.playflag===false) { // 判断是否拖拽状态
                this.changeRange()
            }
        },

    },
    computed:{
        ...mapState(['songId','listId','playflag','rangValue'])
    },
}
</script>