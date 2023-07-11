<template>
    <div>
       <div class="PhoneLogon">
          <div class="head-nav">
            <span @click="back">
                <i class="iconfont icon-guanbijiantou"></i>
            </span>
          </div>
          <div class="title">
             <h2>登录后领取免费会员</h2>
          </div>
          <div class="logon">
            <div class="phone-way" >
                <div class="form">
                    <div class="item">
                        <input type="text" placeholder="账号/手机号码" v-model="phone" >
                    </div>
                    <div class="item">
                        <span class="iconfont icon-mima"></span>
                        <input type="password" placeholder="密码" v-model="password" >
                    </div>
          
                    <div :class="['submit',{'open':checked}]" >
                        <div :class="['submit',{'open':checked}]" @click="submit" >提交</div>
                    </div>
                </div>
                <div class="get-userNumber">
                    <p>没有账号？<span>立即注册</span></p>
                </div>
                <div class="bottom-box">
                <van-checkbox v-model="checked" shape="square" :checked-color="'#000'" :icon-size="'12px'"></van-checkbox>
                    <p>我们的服务依赖于使用抖音账号登录，请阅读并同意”<em>用户登录指引协议</em> “</p>
                </div>
            </div>
          </div>
       </div>

    </div>
</template>


<script>
import {reFresh} from '../api/Logon'
import { Toast } from 'vant';
export default {
    data() {
        return {
            phone:'',
            password:'',
            checked:false,
            user:{
                userNmae:'18567121923',
                password:'123456789'
            },
            token:'MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Sat, 20 May 2023 01:07:29 GMT; Path=/;__csrf=3a8b767971719b7631094d41d1c869aa; Max-Age=1296010; Expires=Sun, 04 Jun 2023 01:07:39 GMT; Path=/;;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_U=008C9570A723B1F2F4EC054334B585986EB12ECA7D85506E5494D7F6C11565A5E2749A006D441DD908EF44BE6745AC3C89BB25B0F9773F1050B71B02367DC552D0066824C6E0548094281E2BCBEC72575F4E008738F7097C7C621F02C8FDDE2E007ED5AAC5153525B7A3455A6B42FFA6FC2FEE795DDB08EA49788F810FF28F5087628691FA1831081F8AE12656C25274893105ECB496E5681716975B4F75642EF9253B83B4E3195C6E06F75EFA08CD514E75990A7661F44C053E3B283B26CDCB88F526847E4B76CF3ECF7763331F46B8077D4551E9376FEB56D86242B0EA00FD9EE2739BEBB86D99BF0D252452496290E810E0A7F277FAD105E6D81C2D0A4714402FD3D13EC8AD9BEA41380A6D1B837364BF22E74D0BB8B1D4B8981C7FBD7E50BF1123A701F911BDE10B2FDD98C0079A91DFFB96C73ECE550BA47B9C5FECA8DAFC5A26E11C9D2F1053B73E0123F356D6813FF26FD836A918D78F6276C2629340B5BB59103AB5A70FE840428D67621FC3FD5C4F3BD8EFCE821B7D4E255C5591CC17; Max-Age=15552000; Expires=Thu, 16 Nov 2023 01:07:29 GMT; Path=/; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1683979612211; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1683979612033; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 04:21:36 GMT; Path=/eapi/clientlog; HTTPOnly'
        }
    },
    methods: {
        back(){
            this.$router.push('/LogonView')
        },
        submit(){
            let PhoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/

            let pass =  /^[a-zA-Z0-9]\w{8,17}$/;

            if (!PhoneReg.test(this.phone) || !pass.test(this.password)) {
                Toast("请输入正确的手机号和密码")
                return
            }


            if (this.phone != this.user.userNmae || this.password != this.user.password) {
                Toast("账号或密码错误")
                return
            }
            if (this.phone == this.user.userNmae || this.password == this.user.password) {
                Toast("登录成功")
                localStorage.setItem('token',JSON.stringify(this.token))
                this.reFresh()
                this.$router.push('/UserlInfo')
            }
           

        },
        reFresh(){ //刷新登录
            console.log('刷新');
            reFresh().then(data=>{
                console.log(data);
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .PhoneLogon{
        background-color: #fff;
        height: 100vh;
        width: 100%;
        .head-nav{
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 12px;
            span{
                i{
                    color: #000000;
                    font-weight: bold;
                }
            }
        }
        .title{
            margin-top: 30px;
            padding-left: 30px;
            h2{
                color: #000;
                font-size: 16px;
            }
        }
        .logon{
            margin-top: 50px;
            .phone-way{
                .form{
                    .item{
                        width: 76%;
                        height: 30px;
                        line-height: 30px;
                        margin: 0 auto;
                        margin-bottom: 12px;
                        border-bottom: 2px solid rgb(194, 194, 194);
                        input{
                            background-color: transparent;
                            border:0px;
                            outline: none;
                            text-indent: 0.5em;
                            font-size: 14px;
                            color:#000;
                        }
                        span{
                            font-size: 20px;
                            margin-left: 10px;
                            display: inline-block;
                            vertical-align: middle;
                        }
                        .getCode{
                            border:1px solid #fff;
                            height: 20px;
                            line-height: 20px;
                            width: 50px;
                            border-radius: 20px;
                            font-size: 12px;
                            color:#808080;
                            float: right;
                            margin:5px;
                        }
                    }
                    .submit{
                        background-color: rgb(211, 210, 210);
                        height: 40px;
                        width: 80%;
                        margin: 20px auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 20px;
                        &.open{
                            background-color: rgb(253, 48, 48);
                   
                        }
                    }
                }
                .get-userNumber{
                    text-align: right;
                    font-size: 12px;
                    p{
                        width: 100%;
                        color: #000;
                        span{
                            color: blue;
                            padding-right: 12px;
                        }
                    }
                }
                .bottom-box{
                    margin-top: 20px;
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
        }
    }
</style>
