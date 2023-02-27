// 从vuex中导入store的构造方法
import { createStore } from 'vuex'

//声明store的三个最基础的组成部分
const mutations = {
  // 保存用户信息
  storeLogin(state, payload){
    const temp = {
      hasLogin: true,
      token: payload.token,
      profile: payload.profile
    }
    state.userinfo = temp;
    // 用户信息持久化到 storage
    uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    
  }
};
const actions = {}
const state = {
  userInfo: {
      hasLogin: false,
    }
  }

//创建一个新的store实例，然后挂载上面的三个对象
const store = createStore({
  actions,
  mutations,
  state
})

export default store
