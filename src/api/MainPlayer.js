import request from "./http";



// 获取歌曲详情
// /song/detail?ids=863046037

export function getSongDetail(params){
    return request({
        url:"/song/detail",
        method:"get",
        params
    })
}


// 获取歌单所有歌曲
// /playlist/track/all?id=24381616&limit=10&offset=1
export function getListSongs(params){
    return request({
        url:"/playlist/track/all",
        method:"get",
        params
    })
}