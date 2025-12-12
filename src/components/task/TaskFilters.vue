<script setup lang="ts">
import { useTaskStore, type TTaskFilter } from '@/stores/task'
import BaseButton from '../ui/BaseButton.vue'
const taskStore = useTaskStore()

interface ITaskFilter {
  id: number
  label: TTaskFilter
  title: string
}

const filters: ITaskFilter[] = [
  {
    id: 1,
    label: 'all',
    title: 'Все',
  },
  {
    id: 2,
    label: 'completed',
    title: 'Выполненные',
  },
  {
    id: 3,
    label: 'unfulfilled',
    title: 'Невыполненные',
  },
]
</script>
<template>
  <div class="task-filters">
    <ul>
      <li v-for="filter in filters" :key="filter.id" class="task-filters__item">
        <BaseButton
          :label="filter.title"
          size="xs"
          :color="taskStore.filtersData.status === filter.label ? 'success' : 'white'"
          @click="taskStore.setFilter(filter.label)"
        />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.task-filters {
  margin-block: 30px;
  ul {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
