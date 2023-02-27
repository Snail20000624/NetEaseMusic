<script>
  import {useStore} from 'vuex'
  const store = useStore();
	export default {
		onLaunch: function() {
			console.log('App Launch');
      uni.getStorage({
        key: 'userInfo',
        success: (res) => {
          console.log(res);
          // 将用户信息存储到vuex中
          store.storeLogin(JSON.parse(res.data));
        }
      })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "@/common/css/common.scss";
  @import "@/common/css/iconfont.css";
</style>
