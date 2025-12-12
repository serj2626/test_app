<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import BaseInput from '../ui/BaseInput.vue'
import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const store = useTaskStore()

const localSearch = ref(store.filtersData.search)

const debouncedSearch = useDebounce(localSearch, 400)

watch(debouncedSearch, (val) => {
  store.filtersData.search = val
})
</script>
<template>
  <div class="task-search">
    <label>Поиск задачи</label>
    <BaseInput
      v-model:input-value="localSearch"
      type="search"
      placeholder="Введите текст из задачи"
    />
  </div>
</template>
<style scoped lang="scss">
.task-search {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
