<template>
  <view class="mine">
    <!-- 导航条 -->
    <scroll-view class="nav-list scroll-view" scroll-x="true">
      <view class="item" v-for="(item, index) in navList" :key="index">
        <image class="img" :src="'/static/image/mine/'+item.imd+'.png'" mode="aspectFit"></image>
        <view class="desc">{{item.name}}</view>
      </view>
    </scroll-view>
    <!-- 菜单列表 -->
    <uniList>
      <uniListItem title="本地音乐" thumb="/static/image/mine/m_15.png"></uniListItem>
      <uniListItem title="最近播放" thumb="/static/image/mine/m_17.png"></uniListItem>
      <uniListItem title="我的电台" thumb="/static/image/mine/m_19.png"></uniListItem>
      <uniListItem title="我的收藏" thumb="/static/image/mine/m_21.png"></uniListItem>
    </uniList>
    <!-- 推荐歌单 -->
    <SongList title="推荐歌单" link="" :list="recommendSongs"></SongList>
  </view>
</template>

<script setup>
  import uniList from "@/uni_modules/uni-list/components/uni-list/uni-list.vue"
  import uniListItem from "@/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"
  import SongList from '../../components/songList.vue'
  import apisIndex from "@/apis/index.js"
  import { onMounted, ref } from "vue";

  // 整理列表
  const navList = ref([
    {name: '私人FM', imd: 1},
    {name: '最嗨电音', imd: 2},
    {name: 'ACG专区', imd: 3},
    {name: 'Sati空间', imd: 4},
    {name: '私藏推荐', imd: 5},
    { name: '因乐交友', imd: 6 },
    { name: '亲子频道', imd: 7 },
    { name: '古典专区', imd: 8 }]);
  // 推荐歌单
  const recommendSongs = ref([]);
  const getRecommendSongs = () => {
    apisIndex.apiGetRecommendSongs().then(res => {
      recommendSongs.value = res.result;
      // 格式化播放量数据
      const formatCount = data => {
        let tmp = data;
        if (data > 10000) {
          tmp = (parseInt(data / 10000) + '万');
        }
        return tmp;
      }
      recommendSongs.value.forEach(item => {
        item.playCount = formatCount(item.playCount);
      })
    })
  }
  
  onMounted(()=>{
    getRecommendSongs();
  })
</script>

<style scoped lang="scss">
  .top-img {
    width: 50rpx;
    height: 40rpx;

    &.left {
      margin-left: 10rpx;
    }
  }

  .page-content {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0px;
  }

  .nav-list {
    height: 220rpx;
    padding-top: 70rpx;
    padding-bottom: 14rpx;
    white-space: nowrap;
    text-align: center;
    line-height: 76rpx;
    color: #666;
    border-bottom: 1rpx solid #e6e6e6;
    font-size: 24rpx;
    background: #fff;

    .item {
      position: relative;
      display: inline-block;
      height: 210rpx;
      width: 166rpx;

    }

    .img {
      display: block;
      width: 70rpx;
      height: 70rpx;
      margin: 0 auto;
      border-radius: 50%;
    }
  }

  .line-item {
    .icon {
      float: left;
      width: 70rpx;
      height: 70rpx;
      margin-top: 24rpx;
      margin-right: 36rpx;
    }

    .lab {
      font-size: 32rpx;
      color: #444;
    }

    .con {
      position: relative;
      height: 100rpx;
      overflow: hidden;

      &:before {
        position: absolute;
        content: "";
        right: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 1rpx solid #e6e6e6;
      }
    }
  }

  .recommend-list {
    border-top: 16rpx solid #f8f8f8;
  }
</style>
