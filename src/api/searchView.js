import request from "./http";

// 轮播图
// /banner?type=2
export function getBanner(params){
    return request({
        url:"/banner",
        method:"get",
        params
    })
}


//搜索推荐
// /search/multimatch?keywords=海阔天空
// /search/suggest?keywords=海阔天空&type=mobile

export function getsuggest(params){
    return request({
        // url:"/song/detail",
        url:"/search/suggest",
        method:"get",
        params
    })
}






