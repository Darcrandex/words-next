import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUser = defineStore('user', () => {
  const info = reactive({ nickname: '', age: 1 })

  const login = async () => {
    info.nickname = 'Tony'
  }

  return { info, login }
})
