import request from "./http";

// 歌词评论
// /comment/playlist?id=705123491
export function getComment(params){
    return request({
        url:"/comment/playlist",
        method:"get",
        params
    })
}
// 点赞
// /comment/like?id=29178366&cid=12840183&t=1&type=0
export function setLike(params){
    return request({
        url:"/comment/like",
        method:"get",
        params
    })
}