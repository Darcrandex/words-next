<script setup lang="ts">
/**
 * @name Index
 * @author darcrand
 * @description
 */

import { ref, onMounted } from 'vue'
import { apiGetList, Paragraph } from '@/apis/paragraph'

const list = ref<(Paragraph & { height: number })[]>([])
onMounted(() => {
  apiGetList().then(res => (list.value = res.map(v => ({ ...v, height: ~~(Math.random() * 30) + 20 }))))
})
</script>

<template>
  <section class="m-4 mt-0 p-2 rounded text-center text-gray-400 text-xs bg-gray-100">搜索</section>

  <div class="m-4 mb-8 rounded-lg overflow-hidden shadow-lg" v-for="item in list" :key="item._id">
    <section class="h-40 bg-center bg-cover" :style="`background-image: url('${item.cover}')`"></section>

    <section class="m-4">
      <p class="mb-1 last:mb-0 text-sm text-gray-600" v-for="p in item.content?.split('\n')" :key="p">{{ p }}</p>
    </section>

    <section class="mx-4 text-xs text-gray-400">#&nbsp;{{ item.resource }}</section>

    <section class="grid grid-cols-3">
      <div class="flex items-center p-4">
        <i class="iconfont icon-collection text-lg text-center text-gray-400"></i>
        <span class="ml-1 text-xs text-gray-400">0</span>
      </div>
      <div class="flex items-center justify-center p-4">
        <i class="iconfont icon-sound-filling-fill text-lg text-center text-gray-400"></i>
        <span class="ml-1 text-xs text-gray-400">45</span>
      </div>
      <div class="flex items-center justify-end p-4">
        <i class="iconfont icon-quick text-lg text-center text-gray-400"></i>
        <span class="ml-1 text-xs text-gray-400">10K+</span>
      </div>
    </section>
  </div>

  <!-- ios 会使margin失效，导致贴底 -->
  <div style="height: 1px;"></div>
</template>
