import request from "./http";


// 舒心登录状态
// /login/refresh

export function reFresh(){
    return request({
        url:"/login/refresh",
        // url:"DataJson/songDetail.json",
        method:"get",
    })
}




// 二维码调用用接口
// /login/qr/key
export function getLoginQrKey(){
    return request({
        url:"/login/qr/key",
        method:"post",
        data:{
            time:new Date().getTime() //防止缓存
        }
    })
}

// 二维码生成接口

// /login/qr/create?key=xxx
export function getLoginQrCreate(data){
    return request({
        url:"/login/qr/create",
        method:"post",
        data
    })
}
// 二维码检测扫码状态接口
// /login/qr/check?key=xxx
export function getLoginQrCheck(data){
    return request({
        url:"/login/qr/check",
        method:"post",
        data
    })
}

// 退出登录
// /logout

export function getLogout(data){
    return request({
        url:"/logout",
        method:"post",
        data
    })
}
