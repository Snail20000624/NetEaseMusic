<template>
  <view>
    <view class="login-form">
      <input type="text" class="input-row" v-model="account" maxlength="11" placeholder="请输入账号:" />
      <input type="password" class="input-row" v-model="password" maxlength="11" placeholder="请输入密码:" />
      <button type="button" class="btn login-btn" @click="login">登录</button>
      <view class="bot flex-box">
        <navigator class="sign" hover-class="none">立即注册</navigator>
        <navigator class="forget" hover-class="none">忘记密码</navigator>
      </view>
    </view>

  </view>
</template>

<script setup>
  import {
    ref
  } from "vue";
  import apisAccount from '/apis/account.js'
  import { useStore } from 'vuex'
  //  登录
  let account = ref('');
  let password = ref('');
  const store = useStore();
  // 提示框
  const alert = (msg, type='none') => {
    uni.showToast({
      title: msg,
      icon: type
    })
  }
  const alertModal = (msg) =>{
    uni,uni.showModal({
      content: msg,
      showCancel: false
    });
  }
  const login = () => {
    if (!account.value) {
      alert('请输入账号','error');
      return false;
    }
    if (!password.value) {
      alert('请输入密码','error');
      return false;
    }
    // 去掉输入框左右两边的空格
    const user = account.value.trim();
    const pass = password.value.trim();
    // 检查密码长度
    if(pass.length < 6){
      alert('密码最短为6个字符！');
      return false;
    }
    // 检查完毕，登录中
    uni.showLoading({
      title:'登录中...'
    });
    // 调用接口
    const params = {
      userName: user,
      password: pass
    };
    apisAccount.apiLogin(params).then(res =>{
      // 登录失败
      if(res.data.code != 200){
        alert(res.errMsg,'error');
        return false;
      }
      // 登录成功 把登录信息保存Vuex并跳转到首页
      const temp = {
        token: res.data.account.token,
        profile: res.data.profile
      } 
      store.storeLogin(temp);
      // 跳转
      uni.switchTab({
        url: '/pages/index/index'
      })
    })
  }
</script>

<style lang="scss">
  .input-row {
    width: 600rpx;
    height: 75rpx;
    margin: 0 auto;
    border: 1px solid #E04B28;
    color: #6c6c6c;
    border-radius: 75rpx;
    padding: 0 50rpx;
    line-height: 75rpx;
    margin-bottom: 45rpx;
    font-size: 26rpx;
  }

  .login-form {
    padding-top: 220rpx;
  }

  .login-btn {
    width: 600rpx;
    height: 75rpx;
    margin: 0 auto;
    border: 1px solid #E04B28;
    border-radius: 75rpx;
    padding: 0 50rpx;
    line-height: 75rpx;
    margin-bottom: 45rpx;
    font-size: 26rpx;
    color: #fff;
    background: #E04B28;
  }

  .bot {
    width: 600rpx;
    padding: 0 17rpx;
    font-size: 26rpx;
    margin: 0 auto;
    justify-content: space-between;
  }

  .sign {
    color: #E04B28;
  }

  .auth-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    bottom: 100rpx;
    left: 0;
    width: 100%;

    .auth-image {
      width: 50px;
      height: 50px;
      border: 1px solid #dddddd;
      border-radius: 50px;
      margin: 0 20px;
      background-color: #ffffff;
      overflow: hidden;
    }

    .img {
      width: 30px;
      height: 30px;
      margin: 10px;
    }

    input {
      outline: none;
      border: none;
      list-style: none;
    }
  }

  .log-btn {
    margin: 0;
    padding: 0;
    background: #fff !important;
    height: 48px;

    &::after {
      background-color: transparent;
      margin: 0;
      padding: 0;
      border: 0;
    }
  }
</style>
