<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import TaskAdd from './TaskAdd.vue'
import TaskList from './TaskList.vue'
import TaskCounter from './TaskCounter.vue'

const store = useTaskStore()

const updateTaskByNewText = (payload: { id: number; text: string }) => {
  store.updateTask(payload.id, payload.text)
}
</script>
<template>
  <div class="task-content container">
    <div class="task-content__wrapper">
      <TaskCounter />
      <TaskAdd @add-task="(text: string) => store.addTask(text)" />
      <TaskList
        @delete-task="(id: number) => store.deleteTask(id)"
        @update-status-task="(id: number) => store.updateStatusTask(id)"
        @edit-text-task="updateTaskByNewText"
      />
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
