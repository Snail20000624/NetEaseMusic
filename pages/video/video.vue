<template>
  <view class="video">
    <view class="topbar">
      <scroll-view class="scroll-view" scroll-x="true" :show-scrollbar="false">
        <view class="rel">
          <!-- 导航条 -->
          <view class="item" v-for="(item, index) in navList" :key="index" 
          :class="{active: curNav == item.id}" @click="switchNav(item.id, index)">
            <view class="desc">
              {{item.name}}
            </view>
          </view>
          <!-- 下划线 -->
          <view class="slide" :style="'width:'+sliderWidth+'rpx; transform:translateX(' + sliderOffset + 'rpx)'">      
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 视频列表 -->
    <MescrollUni :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
      <view class="video-list">
        <view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
          <view class="video-wrap">
            <image class="img" :src="item.coverUrl" mode="aspectFit"></image>
            <view class="desc ellipsis">
              {{item.title}}
            </view>
          </view>
        </view>
      </view>
    </MescrollUni>
  </view>
</template>

<script setup>
  import apisVideo from '@/apis/video.js'
  import apisIndex from '@/apis/index.js'
  import { onMounted, ref } from "vue";
  import MescrollUni from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue"
  // 顶部栏
  const navList = ref([]); // 所有导航条
  const curNav = ref(); //当前选中的导航条
  const getNavList = () => {
    apisVideo.apiGetNavList().then(res => {
      navList.value = res.data.slice(0, 10);
      // 默认选中第一项
      switchNav(navList.value[0].id, 0);
    })
  }
    // 导航条高亮切换
  const switchNav = (itemId, index) =>{
    curNav.value = itemId;
    // 导航条的宽度 140是4个字的宽度
    sliderOffset.value = 144 * index + (index == 0 ? 33 : 0);
    // 加载第一项对应的视频列表
    getList(1, 5, res=>{
      relatedVideo.value = res.data;
      // console.log(res);
    });
  }
    // 导航栏底部下划线
  let sliderWidth = ref(60); // 导航条默认宽度
  let sliderOffset = ref(33); //偏移距离
  
  // 视频列表
  const downOption = {  //下拉刷新
    auto: false
  };
  const upOption = {  // 上拉加载下一页
    auto: false,
    page: {
      num: 0,   // 其实页
      size: 10  //一页条数
    }
  };
  let relatedVideo = ref([]);   // 视频列表
  const getList = (pageNum, pageSize, successCallback, errCallback) => {
    let params = {
      id: curNav.value,
      pageNum,
      pageSize
    };
    apisIndex.apiGetRelatedVideo(params).then(res => {
      successCallback && successCallback(res);
    }, err => {
      errCallback && errCallback(err);
    })
  };
    // 下拉刷新回调
  const downCallback = (mescroll)=>{
    // console.log("downCallback...");
    // 重置列表为第一页（自动执行 page.num=1，再触发 upcallback 方法）
    mescroll.resetUpScroll();
  };
    // 上拉加载回调
  const upCallback = (mescroll)=>{
    // console.log("upCallback...", mescroll);
    // 加载下一页数据
    getList(mescroll.num, mescroll.size, res =>{
      // 若是第一页，则清空
      if(mescroll.num ==1){
        relatedVideo = ref([]);
      }
      console.log(res.data);
      // 累加数据
      relatedVideo.value = relatedVideo.value.concat(Array.from(res.data));
      console.log(relatedVideo.value);
      // relatedVideo.value = relatedVideo.value.concat(res.data);
      // 成功的回调，结束刷新操作
      mescroll.endSuccess();
    }, () => {
      // 失败的回调，隐藏下拉刷新状态
      mescroll.endErr();
    });
  }
  
  onMounted(() => {
    getNavList();
  })
</script>

<style lang="scss">
  .topbar {
    .h86 {
      height: 86rpx;
    }
  }
  .scroll-view {
    position: fixed;
    top: 0;
    width: 100%;
    height: 86rpx;
    white-space: nowrap;
    text-align: center;
    line-height: 86rpx;
    color: #333;
    font-weight: 600;
    border-bottom: 1rpx solid #e6e6e6;
    z-index: 10;
    background: #fff;

    .item {
      position: relative;
      display: inline-block;
      min-width: 126rpx;
      height: 86rpx;
      line-height: 86rpx;
      padding: 0 20rpx;

      &.active {
        color: #f32628;
      }
    }
  }

  .slide {
    position: absolute;
    width: 60rpx;
    height: 4rpx;
    left: 0;
    bottom: 0rpx;
    background: #f32628;
    transition: transform 0.3s;
    z-index: 2;
    /* #ifdef MP-WEIXIN */
    bottom: 2rpx;
    /* #endif */
  }

  .video-list {
    color: #333;
    background: #f8f8f8;

    .tit-bar {
      padding-left: 32rpx;
    }

    .video-item {
      padding-top: 32rpx;
      background: #fff;
      border-bottom: 24rpx solid #f8f8f8;
    }

    .video-wrap {
      width: 686rpx;
      margin: 0 auto;
    }

    .img {
      display: block;
      width: 686rpx;
      height: 390rpx;
      border-radius: 10rpx;
      background: #eee;
    }

    .desc {
      font-size: 30rpx;
      font-weight: 600;
      line-height: 84rpx;
      border-bottom: 1rpx solid #e6e6e6;
    }
  }

  .creater-bar {
    height: 100rpx;
    justify-content: space-between;
    align-items: center;

    .avactor-box {
      align-items: center;
    }

    .avactor {
      width: 66rpx;
      height: 66rpx;
      margin-right: 10rpx;
      border-radius: 66rpx;
      background: #eee;
    }

    .name {
      line-height: 100rpx;
    }
  }
</style>
