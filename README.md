
[一. 必备依赖](#必备依赖)

[二. 安装并运行](#安装并运行)

[三. 技术栈](#技术栈)

[四. 功能与特点](#功能与特点)

[五. 效果图展示](#效果图展示)

[六. 视频展示](#视频展示)

# 必备依赖

1. 在开始前，请先检查您的电脑是否已经安装了 node.js 环境.
2. 按下<kbd>win</kbd>+<kbd>R</kbd>按键。输入 `cmd`,打开命令终端
3. 在终端中,执行`node -v`,查看 node 版本,若未提示版本号,或版本号提示`<16`,则需安装最新版.若`>16`,则请移步至第 6 步
4. 若 node.js 版本过低,或未安装.则进入[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)官网,点击下载`长期维护版`.文件下载完毕后双击执行安装.安装过程中一直` next` `下一步 `即可.
5. 安装完毕后,重复第 3 步,查看 node.js 版本号.若`>16`,即可下一步.否则查阅更多`node`安装教程
6. 在命令终端(第 2 步)中执行`Git --version`,若未提示版本号表示未安装.若已安装,则请移步至[📦 安装并运行](#安装并运行)
7. 打开[https://git-scm.com/download/win](https://git-scm.com/download/win),点击安装'Standalone Installer'版本下的 64bit.文件下载完毕后双击执行安装.安装过程中一直` next` `下一步 `即可.
8. 安装完毕后,重复第 6 步,查看 git 版本号.若已安装,即可下一步

# 安装并运行

1. 将项目克隆至本地，在项目路径下打开集成终端
2. 若人在国内,推荐安装'淘宝镜像源'.在命令终端中执行`$ npm install -g cnpm --registry=https://registry.npmmirror.com`即可
4. 在命令终端中执行`cnpm i`或`cnpm install`,使用淘宝镜像源安装项目依赖
5. 在命令终端中执行`npm run serve`,启动服务器(请耐心等待).

> 该项目基于移动端设计.请在浏览器中<kbd>右键</kbd>,选择最下方的`检查`.然后按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>切换至移动端模式.并选择合适的"设备尺寸"(推荐 iPhone XR),然后在右侧'缩放比例'中选择'适合窗口大小'
>
> <div style="display:flex;align-items:center;"><img src="https://i.imgloc.com/2023/05/31/VWgTPv.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWg1W3.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWgu48.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWxZNZ.png"style="width:25%"/></div>


### 数据来源


1. 请在确保成功安装node环境后，将下方文件下载到本地，并解压
2. 成功下载大鳌本地后，通过在 **win + R**开启输入cmd开启命令提示符，cd大奥文件路径下，输入 $node app.js命令运行该node项目
3. 显示 ``server running @ http://localhost:3000``，证明已经运行成功，api接口就可以正常访问了！

[NeteaseCloudMusicApi-master.zip](https://pan.baidu.com/s/1lLuMMi39BMt2qO2LZGwDnw )
提取码：6666

# 技术栈

- ## vue: ^2.6.14,
- ## vue-router: ^3.5.1,
- ## vuex: ^3.6.2
- ## axios: ^1.4.0,
- ## colorthief: ^2.4.0,
- ## core-js: ^3.8.3,
- ## sass: ^1.32.7,
- ## swiper: ^3.4.2,
- ## vant: latest-v2,


# 功能与特点

- 首页/歌单页/播放页背景色自动适配
- 暗色 + 渐变主题
- 歌单/个人页滚动动画特效
- 排行榜：三种榜单左右滑动切换
- 首页下拉刷新歌单/电台推荐数据，排行榜到底部显示回顶按钮
- 音乐随心刷：3种推荐模式自由切换，上下滑动无缝随心刷
- 播放音乐：顺序/随机/单曲循环3种模式切换，进度拖动更改进度
- 搜索：轮播展示热门，历史记录，推荐搜索词，搜索结果可按5种分类按需加载结果
- 登录：手机号登录/二维码登录
- 评论：查看其他人的评价
- 歌单/歌曲点赞分享，添加喜欢的音乐


# 效果图展示

![首页.png](./displayIesources/img/%E9%A6%96%E9%A1%B5.png)
![歌单.png](./displayIesources/img/%E6%AD%8C%E5%8D%95.png)
![播放.png](./displayIesources/img/%E6%92%AD%E6%94%BE.png)
![用户.png](./displayIesources/img/%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5.png)
![搜索结果.png](./displayIesources/img/%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C.png)
![随心刷.png](./displayIesources/img/%E9%9A%8F%E5%BF%83%E5%88%B7.png)
![搜索.png](./displayIesources/img/%E6%90%9C%E7%B4%A2.png)
![评论.png](./displayIesources/img/%E8%AF%84%E8%AE%BA.png)
![登录.png](./displayIesources/img/%E7%99%BB%E5%BD%95.png)
![二维码登录.png](./displayIesources/img/%E6%89%AB%E7%A0%81%E7%99%BB%E5%BD%95.png)
![手机号登录.png](./displayIesources/img/%E6%89%8B%E6%9C%BA%E7%99%BB%E5%BD%95.png)

# 视频展示
