<script setup>
  import {
    useStore
  } from 'vuex'
  import {
    onLaunch,
    onShow,
    onHide
  } from "@dcloudio/uni-app"


  const store = useStore();
  onLaunch(() => {
      console.log('App Launch');
      uni.getStorage({
        key: 'userInfo',
        success: (res) => {
          console.log(res);
          // 将用户信息存储到vuex中
          store.storeLogin(JSON.parse(res.data));
        }
      })
    }),
    onShow(() => {
      console.log('App Show')
    }),
    onHide(() => {
      console.log('App Hide')
    })
</script>

<style lang="scss">
  /*每个页面公共css */
  @import "@/common/css/common.scss";
  @import "@/common/css/iconfont.css";
</style>
