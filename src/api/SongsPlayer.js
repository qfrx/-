import request from "./http";


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


// 获取歌词
// /lyric?id=863046037
export function getLyric(params){
    return request({
        url:"/lyric",
        // url:"/DataJson/lyric.json",
        method:"get",
        params
    })
}

