import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { sleep } from '@/utils'

export const useUser = defineStore('user', () => {
  const info = reactive({ name: 'nick name' })
  const login = async () => {
    await sleep(2000)
    info.name = 'Tony'
  }
  return { info, login }
})
