import { ref, watch, type Ref } from 'vue'

export function useDebounce(value: Ref<any>, delay = 300) {
  const debounced = ref(value.value)

  let timer: number | null = null

  watch(
    value,
    (newVal) => {
      if (timer) clearTimeout(timer)

      timer = window.setTimeout(() => {
        debounced.value = newVal
      }, delay)
    },
    { immediate: true }
  )

  return debounced
}
