import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppSettings = defineStore('app-settings', () => {
  const settings = ref<TaroGeneral.SafeAreaResult>({ bottom: 0, top: 0, right: 0, left: 0, width: 0, height: 0 })
  const updateSettings = (data: Partial<TaroGeneral.SafeAreaResult>) => {
    Object.assign(settings.value, data)
  }

  return { settings, updateSettings }
})
