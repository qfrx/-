import request from "./http";



// /user/subcount
export function reFresh(){
    return request({
        url:"/user/subcount",
        // url:"DataJson/songDetail.json",
        method:"get",
    })
}

// 登录状态
// /login/status

export function getUser(){
    return request({
        url:"/login/status",
        method:"get",
    })
}


// 用户信息
// /user/detail?uid=32953014

export function getUsermore(params){
    return request({
        url:"/user/detail",
        method:"get",
        params
    })
}


// // 获取账号信息

export function getUserDetails(){
    return request({
        url:"/user/account",
        method:"get"
    })
}


// 获取用户歌单
export function getUserUserList(params){
    return request({
        url:"/user/playlist",
        method:"get",
        params
    })
}

