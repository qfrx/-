
import request from "./http";



// 获取歌单所有歌曲
// /playlist/track/all?id=24381616&limit=10&offset=1
export function getListSongs(params){
    return request({
        url:"/playlist/track/all",
        method:"get",
        params
    })
}

// 歌单详情
// /playlist/detail?id=24381616
export function getListMore(params){
    return request({
        url:"/playlist/detail",
        method:"get",
        params
    })
}


// 获取歌曲url
// /song/url?id=863046037

export function getSongUrl(params){
    return request({
        url:"/song/url",
        // url:"DataJson/songUrlId.json",
        method:"get",
        params
    })
}
