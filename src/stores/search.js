import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useSearchStore = defineStore('searchStore', () => {
  
  const searchDto = ref({
    "aisleType": '',
    "householdCount": '',
    "parkPerHouse": '',
  })
    
    const clicked = ref(false);
    const findDong = ref(false);
  const dongCode = ref('');
    const searchNameDto = ref({
        "aptName": '',
        "dongCode":''
    })
  
  return { searchDto,clicked ,searchNameDto,findDong,dongCode }
})