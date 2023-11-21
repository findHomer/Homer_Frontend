import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', () => {
  
  const searchDto = ref({
    "aptName": '',
    "aisleType": '',
    "householdCount": '',
    "parkPerHouse": '',
})
  return { searchDto }
})