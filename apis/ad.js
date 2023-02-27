import request from "@/utils/request.js"
// 广告请求接口
const apiAd = (data) =>{
  return request.request({
    url: '/adMock',
    method: 'GET',
    data
  })
}

export default{
  apiAd
}