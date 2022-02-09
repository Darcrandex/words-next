<script setup lang="ts">
/**
 * @name Mine
 * @author darcrand
 * @description 我的
 */

import { computed, onMounted, ref } from 'vue'
import { apiGetList, Paragraph } from '@/apis/paragraph'

const avatarUrl = 'https://w.wallhaven.cc/full/8o/wallhaven-8ok7vk.jpg'

const list = ref<(Paragraph & { height: number })[]>([])
onMounted(() => {
  apiGetList().then(res => (list.value = res.map(v => ({ ...v, height: ~~(Math.random() * 150) + 100 }))))
})

const groups = computed(() => {
  const leftList: (Paragraph & { height: number })[] = []
  let leftListTotalHeight = 0
  const rightList: (Paragraph & { height: number })[] = []
  let rightListTotalHeight = 0

  list.value.forEach(item => {
    const currHeight = item.height + item.content.length
    if (leftListTotalHeight > rightListTotalHeight) {
      rightListTotalHeight += currHeight
      rightList.push(item)
    } else {
      leftListTotalHeight += currHeight
      leftList.push(item)
    }
  })

  return [
    { key: 'left', list: leftList },
    { key: 'right', list: rightList }
  ]
})
</script>

<template>
  <section class="relative p-4 pt-0 overflow-hidden">
    <div class="rounded-bg"></div>
    <div class="relative z-2 p-4 rounded-lg bg-gray-50 shadow-lg">
      <section class="flex items-center">
        <img :src="avatarUrl" alt="" class="mr-2 w-15 h-15 rounded-full bg-gray-500 border-none" />
        <div>
          <h2 class="mb-1 text-gray-800">Nick Name Name</h2>
          <p>
            <span class="inline-block text-xs text-gray-400">LV 1</span>
            <span class="inline-block ml-2 px-1 text-xs text-gray-50 rounded-tl-lg rounded-r-lg bg-red-400"
              >小萌新</span
            >
          </p>
        </div>
      </section>
    </div>
  </section>

  <h3 class="flex items-center m-4">
    <i class="w-1 h-4 bg-red-400 mr-1 rounded-tr rounded-bl"></i>
    <span class="text-gray-800">我的收藏</span>
  </h3>

  <section class="flex m-2">
    <div v-for="group in groups" :key="group.key" style="width: 50%;">
      <article v-for="item in group.list" :key="item._id">
        <section class="shadow-md rounded-lg overflow-hidden mx-2 mb-4">
          <div
            class="bg-center bg-cover"
            :style="`background-image: url('${item.cover}'); height:${item.height}px`"
          ></div>
          <section class="m-2">
            <p class="mb-1 last:mb-0 text-xs text-gray-600" v-for="p in item.content?.split('\n')" :key="p">{{ p }}</p>
          </section>
          <p class="pb-2 text-xs text-gray-400">{{ item.resource }}</p>
        </section>
      </article>
    </div>
  </section>
</template>

<style lang="less">
.rounded-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 120%;
  height: 60px;
  background-color: #ff5252;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  transform: translateX(-8.33%);
}
</style>
