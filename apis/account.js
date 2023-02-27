import request from "../utils/request"

// 账户 - 登录接口
const apiLogin = (data) => {
  return request.request({
    url: '/test/login',
    method: 'POST',
    data
  })
};
// 用户详情
const apiUserDetail = (data)=>{
  return request.request({
    url: '/test/user/detail',
    method: 'GET',
    data
  })
}

// 用户注销
const apiLogout = (data) =>{
  return request.request({
    url: 'logout',
    method: 'GET',
    data
  })
}

export default{
  apiLogin,
  apiUserDetail,
  apiLogout
}