import request from "./http";


// 获取轮播图数据
// http://192.168.36.2:3000/banner

    // 精品歌单分类
    export function getRadioStationList(){
        return request({
            url:"/playlist/highquality/tags",
            method:"get",
        })
    }



// 获取歌单分类详情
// /top/playlist/highquality

export function getTypeListContent(params){
    return request({
        url:"/top/playlist/highquality",
        method:"get",
        params
    })
}



//?id=24381616
//获取歌单详情(歌曲)


    export function getListContent(params){
        return request({
            url:"/playlist/track/all",
            method:"get",
            params
        })
    }


    // 获取歌单所有歌曲
    // /playlist/track/all?id=24381616&limit=10

//    export function getListSongs(params){
//         return request({
//             url:"/playlist/track/all?",
//             method:"get",
//             params
//         })
//     }


    // 推荐歌单
    // /personalized?limit=1

    export function getHostList(params){
        return request({
            url:"/personalized",
            method:"get",
            params
        })
    }

    

    // export function gettest(){
    //     return request({
    //         url:"DataJson/homeAudio.json",
    //         method:"get",
    //     })
    // }



    // 所有榜单
    // /toplist

    export function getChart(){
        return request({
            url:"/toplist",
            method:"get",
        })
    }



        

    export function gettest(){
        return request({
            url:"/fastmockapi/homeAudio.json",
            method:"get",
        })
    }





