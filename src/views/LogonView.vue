<template>
    <div>
      <div class="LogonView">
        <div class="head-nav">
            <span @click="backHome">
                <i class="iconfont icon-guanbijiantou"></i>
            </span>
            <div class="right">
                <h5>
                    帮助与设置
                </h5>
            </div>
        </div>
        <div class="logo-box">
            <div class="img-box">
                <img src="../assets/img/logo-big.png" alt="">
            </div>
        </div>
        <div class="btn-box">
            <div class="fast-logon" @click="QRLogon">
                <span>
                    <i class="iconfont icon-erweima"></i>
                </span>
                <p>扫码等录</p>
            </div>
            <van-popup v-model="show">
                <h4>请扫描二维码</h4>
                <div class="pic" >
                    <img :src="picCode" width="200" alt="">
                </div>
            </van-popup>
            <div class="phone-logon" @click="phoneLogon">
                <p>手机号登录</p>
            </div>
        </div>
        <div class="bottom-box">
            <van-checkbox v-model="checked" :checked-color="'#000'" :icon-size="'8px'"></van-checkbox>
            <p>
                我们的服务依赖于使用抖音账号登录，请阅读并同意“<em>用户登录指引协议</em>
            </p>
        </div>
      </div>
    </div>
</template>

<script>
import {getLoginQrKey,getLoginQrCreate,getLoginQrCheck} from "../api/Logon"
import {Toast} from 'vant'

    export default{
        data() {
            return {
                checked: false, //协议同意按钮
                show:false,
                code:"",
                picCode:"", //二维码
                unikey:"", // 唯一key
                clearCheck:null,
            }
        },
        methods: {
            backHome(){ //返回主页
                this.$router.push('/home')
                this.$store.commit("setHomeTabFlag",true)
                this.$store.commit("setTabIndex",0)
            },
            phoneLogon(){
                if (this.checked === true) {
                    this.$router.push('/PhoneLogon')
                }
            },
            // 二维码等录
            changeWay(){
                getLoginQrKey().then(data=>{
                // console.log(data);
                    this.unikey = data.data.unikey;
                    getLoginQrCreate({key:data.data.unikey,qrimg:"base64",time:new Date().getTime()}).then(pic=>{
                        // console.log(pic);
                        this.picCode = pic.data.qrimg;
                    })
                }),
                this.clearCheck = setInterval(()=>{
                    getLoginQrCheck({key:this.unikey,time:new Date().getTime()}).then(data=>{
                        if(data.code == 803){
                            // 完成登录后清除定时器
                            clearInterval(this.clearCheck);
                            Toast("登录成功");
                            window.localStorage.setItem("token",data.cookie);
                            this.$store.commit("setTabIndex",2)
                            this.$router.push("/home");

                        }else{
                            console.log(data);
                        }
                    })
                },1000)
            },
            //改变二维码的显示状态
            QRLogon(){
                if (this.checked === true) {
                    this.show = true
                }
            }
        },
        watch:{
            'show':function(){
                if (this.show) {
                    this.changeWay()
                }else{
                    clearInterval(this.clearCheck)
                }
            }
        },
    
        created() {
            this.$store.commit("setHomeTabFlag",false)
        },
    }
</script>

<style lang="scss">
.LogonView{
    background-color: #fff;
    height: 100vh;
    width: 100%;
    color: #2f2f2f;
    .head-nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 0 12px;
        span{
            i{
                color: #000000;
                font-weight: bold;

            }
        }
        .right{
            h5{
                color: #2f2f2f;

            }
        }
    }
    .logo-box{
        .img-box{
            padding: 50px 0 200px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 70%;
            }
        }
    }
    .btn-box{
        padding: 0 20px;
        h4{
                color: #000;
                font-weight: bold;
                text-align: center;
            }
        .fast-logon{
            background-color: #121212;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            span{
                i{
                    font-size: 12px;
                }
            }
            p{
                margin-left: 5px;
                font-size: 12px;
                font-weight: bold;
                color: rgb(219, 219, 219);
            }
          
        }
        .phone-logon{
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.07);
            p{
                color: rgb(45, 45, 45);
                font-size: 12px;
                font-weight: bold;
                
            }

        }
    }
    .bottom-box{
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
          p{
              font-size: 12px;
              margin-left: 20px;
              zoom: .7;
              color: rgba(0, 0, 0, 0.484);
              em{
                color: #000;
                font-size: 14px;
              }
          }
      }
}
    
</style>