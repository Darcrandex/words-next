<script setup lang="ts">
/**
 * @name GetUser
 * @author darcrand
 * @description 用于触发获取用户授权信息的容器
 */

import Taro from '@tarojs/taro'

const emits = defineEmits<{ (event: 'ok', res?: Taro.getUserProfile.SuccessCallbackResult): void }>()

const getWechatUserInfo = async () => {
  // 坑点，不能同时使用 wx.login 和 wx.getUserProfile
  const res = await Taro.getUserProfile({ desc: '登陆授权' })
  emits('ok', res)
}
</script>

<template>
  <section class="m-2 p-2" @click="getWechatUserInfo" open-type="getUserInfo">
    <slot></slot>
  </section>
</template>
