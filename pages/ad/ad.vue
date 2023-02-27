<template>
  <view class="ad-page">
    <!-- logo页面 -->
    <view class="logo-bg">
      <image class="top-logo" src="../../static/image/ad/1.png" mode="aspectFit"></image>
      <image class="bot-logo" src="../../static/image/ad/2.png" mode="aspectFit"></image>
    </view>
    <!-- 广告页 -->
    <view class="ad-bg" :class="{active: isShowAd}">
      <image :src="picture" mode="aspectFit"></image>
      <view class="ad-logo">
        <image class="img" src="../../static/image/ad/3.png" mode="widthFix"></image>
      </view>
    </view>
    <view class="close" @click="close">
      跳过
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from "vue";
  import apisAd from '@/apis/ad.js'
  import {
    onShow
  } from "@dcloudio/uni-app"

  onShow(() => {
    getAd();
    //
  })

  // 控制广告页显示
  const isShowAd = ref(false);
  let picture = ref('');
  // 请求广告页接口
  const getAd = () => {
    isShowAd.value = false;
    apisAd.apiAd().then(res => {
      console.log(res);
    })
  }
  // 关闭广告页
  const close = () =>{
    console.log("close");
    // clearTimeout(adTimer);  //清除未开始的定时任务
    // 跳转
    uni.switchTab({
      url: '../../pages/index/index'
    })
  }
</script>

<style lang="scss">
  .ad-page {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #da2d1f;
    z-index: 1000;

    .top-logo {
      position: absolute;
      top: 423rpx;
      left: 50%;
      width: 450rpx;
      height: 93rpx;
      transform: translateX(-50%);
    }

    .bot-logo {
      position: absolute;
      bottom: 40rpx;
      left: 50%;
      width: 220rpx;
      height: 43rpx;
      transform: translateX(-50%);
    }

    .ad {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: #fff;
    }

    .logo-bg {
      opacity: 1;
      transition: opacity 0.3s;

      &.active {
        opacity: 0;
        display: none;
      }
    }

    .ad-bg {
      opacity: 0;
      transition: opacity 0.3s;

      &.active {
        opacity: 1;
        display: block;
      }
    }

    .ad-logo {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 168rpx;
      background: #fff;
      z-index: 3;

      .img {
        display: block;
        width: 258rpx;
        height: 86rpx;
        margin: 40rpx auto 0;
      }
    }
  }

  .close {
    position: absolute;
    right: 20rpx;
    bottom: 190rpx;
    width: 146rpx;
    height: 62rpx;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 62rpx;
    text-align: center;
    line-height: 62rpx;
    z-index: 101;
  }
</style>
