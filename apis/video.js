// 视频页面 api 接口
import request from '@/utils/request.js'

const apiGetNavList = (data) => {
  return request.request({
    url: '/video/group/list',
    method: 'GET',
    data
  })
}


export default{
  apiGetNavList
}