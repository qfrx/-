import request from "./http";

// /search?keywords=海阔天空&type=10
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)

export function searchResult(params){
    return request({
        url:"/search",
        method:"get",
        params
    })
}