<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import TaskAdd from './TaskAdd.vue'
import TaskList from './TaskList.vue'
import TaskCounter from './TaskCounter.vue'
import TaskSearch from './TaskSearch.vue'
import ModalComponent from '../ModalComponent.vue'

const store = useTaskStore()

const updateTaskByNewText = (payload: { id: number; text: string }) => {
  store.updateTask(payload.id, payload.text)
}
</script>
<template>
  <div class="task-content container">
    <div class="task-content__wrapper">
      <!-- <ModalComponent /> -->
      <TaskCounter :count="store.totalUnfulfilledTasks" />
      <div class="task-content__wrapper-actions">
        <TaskAdd
          class="task-content__wrapper-actions-add"
          @add-task="(text: string) => store.addTask(text)"
        />
        <TaskSearch class="task-content__wrapper-actions-search" />
      </div>
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
  margin-block: 50px;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-actions {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 50px;

      &-add {
        width: 100%;
      }
      &-search {
        width: 100%;
      }
    }
  }
}
</style>
