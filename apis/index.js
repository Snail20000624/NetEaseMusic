import request from "@/utils/request.js"

// 轮播图请求接口
const apiGetBanner = (data) => {
  return request.request({
    url: '/banner',
    method: 'GET',
    data
  })
}

// 推荐歌单
const apiGetRecommendSongs = (data) => {
  return request.request({
    url: '/personalized',
    method: 'GET',
    data
  })
}

// 新碟 / 新歌
const apiGetTopAlbum = (data) => {
  return request.request({
    url: '/album/newest',
    method: 'GET',
    data
  })
}

// 精选视频
const apiGetRelatedVideo = (data) => {
  return request.request({
    url: '/related/allvideo',
    method: "GET",
    data
  })
}
export default {
  apiGetBanner,
  apiGetRecommendSongs,
  apiGetTopAlbum,
  apiGetRelatedVideo
}