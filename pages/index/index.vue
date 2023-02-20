<template>
  <view>
    <!-- 轮播 -->
    <view class="banner">
      <swiper :indicator-dots="true" :autoplay="true"
              indicator-color="rgba(255,255,255,0.5)"
              indicator-active-color="#ff372b"
              :interval="3000" :duration="500" :current="0">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view class="item">
                <image :src="item.imageUrl" class="img"></image>
                <view class="tag">
                  {{item.typeTitle}}
                </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup>
  import {onMounted,ref} from "vue";
  const swiperList = ref([])
  const getBanner = () => {
    uni.request({
      url: 'http://localhost:3000/banner',
      method: "GET",
      success: (res) => {
        swiperList.value = res.data.banners;
        console.log(swiperList);
      }
    })
  }
  
  onMounted(() => {
    getBanner();
  })
</script>

<style lang="scss">
  page {
    color: #1a1a1a;
    font-size: 24rpx;
  }

  .banner {
    width: 100%;
    height: 268rpx;
    margin: 30rpx auto 44rpx;

    .swiper {
      height: 268rpx;
    }

    .item {
      position: relative;
      display: block;
      width: 686rpx;
      height: 268rpx;
      margin: 0 auto;
      border-radius: 14rpx;
      overflow: hidden;
    }

    .img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .tag {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 34rpx;
      padding: 0 14rpx;
      line-height: 34rpx;
      color: #fff;
      background: #43a5f0;
      z-index: 10;
      border-top-left-radius: 14rpx;
    }
  }


</style>
