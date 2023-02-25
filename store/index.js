// 从vuex中导入store的构造方法
import { createStore } from 'vuex'

//声明store的三个最基础的组成部分
const mutations = {};
const actions = {}
const state = {
  userinfo: {
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
