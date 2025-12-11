<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import TaskAdd from './TaskAdd.vue'
import TaskList from './TaskList.vue'

const store = useTaskStore()
</script>
<template>
  <div class="task-content container">
    <div class="task-content__wrapper">
      <TaskAdd @add-task="(text: string) => store.addTask(text)" />
      <TaskList />
    </div>
  </div>
</template>
<style scoped lang="scss">
.task-content {
  margin-top: 50px;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
