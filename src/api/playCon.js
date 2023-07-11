import request from "./http";

// 推荐歌曲
// /recommend/songs

export function getSuggestSongs(){
    return request({
        // url:"/recommend/songs",
        url : 'DataJson/suggestSongs.json' ,
        method:"get",
    })
}

// 获取歌单（热/新）
// /top/playlist?limit=10&order=new

export function getListByType(){
    return request({
        url:"/top/playlist",
        // url:"DataJson/songDetail.json",
        method:"get",
    })
}



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


// export function getListSongs(params){
//     return request({
//         url:"/playlist/detail",
//         method:"get",
//         params
//     })
// }

// /playlist/detail?id=24381616









// 获取歌曲url
// /song/url?id=863046037

// export function getSongUrl(params){
//     return request({
//         url:"/song/url",
//         // url:"DataJson/songUrlId.json",
//         method:"get",
//         params
//     })
// }


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

