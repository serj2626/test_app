<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import BaseButton from '../ui/BaseButton.vue'
import { formatDate } from '@/utils/functions'
import { reactive, ref } from 'vue'
import BaseInput from '../ui/BaseInput.vue'
import { validateText } from '@/utils/validations'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import DoneIcon from '@/assets/icons/DoneIcon.vue'
import EmptyComponent from '../EmptyComponent.vue'
import TaskFilters from './TaskFilters.vue'

const store = useTaskStore()

//draggedTaskId хранит id задачи, которую мы тянем.
const draggedTaskId = ref<number | null>(null)

const emit = defineEmits<{
  'delete-task': [id: number]
  'update-status-task': [id: number]
  'edit-text-task': [payload: { id: number; text: string }]
}>()

const newTaskText = reactive<{ value: string; error: string; id: number | null }>({
  value: '',
  error: '',
  id: null,
})

const updateTextByTask = () => {
  const res = validateText(newTaskText.value)
  if (res) {
    newTaskText.error = res
  } else {
    emit('edit-text-task', {
      id: newTaskText.id!,
      text: newTaskText.value,
    })
    setTimeout(() => {
      resetData()
    }, 200)
  }
}

const resetData = () => {
  newTaskText.value = ''
  newTaskText.error = ''
  newTaskText.id = null
}

const onDragStart = (id: number) => {
  draggedTaskId.value = id
}

const onDrop = (targetId: number) => {
  if (draggedTaskId.value === null || draggedTaskId.value === targetId) return

  const tasksCopy = [...store.tasks]
  const draggedIndex = tasksCopy.findIndex((t) => t.id === draggedTaskId.value)
  const targetIndex = tasksCopy.findIndex((t) => t.id === targetId)

  // меняем местами
  const [movedTask] = tasksCopy.splice(draggedIndex, 1)
  tasksCopy.splice(targetIndex, 0, movedTask)

  store.tasks = tasksCopy
  draggedTaskId.value = null
}
</script>
<template>
  <div class="task-list">
    <p class="task-list__title">Список задач: {{ store.totalCount }}</p>
    <TaskFilters />
    <table v-if="store.totalCount">
      <thead>
        <tr>
          <th>№</th>
          <th>Текст задачи</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="task-list__item"
          v-for="task in store.allTasks"
          :key="task.id"
          :draggable="true"
          @dragstart="onDragStart(task.id)"
          @dragover.prevent
          @drop="onDrop(task.id)"
        >
          <td>
            {{ task.id }}
          </td>

          <td
            v-if="newTaskText.id !== task.id"
            class="task-list__item-text"
            @dblclick="newTaskText.id = task.id"
          >
            {{ task.text }}
          </td>
          <td v-else>
            <BaseInput
              placeholder="Введите новый текст задачи"
              v-model:input-value="newTaskText.value"
              v-model:error="newTaskText.error"
              @reset-error="newTaskText.error = ''"
            />
            <div class="task-list__item-text--actions">
              <BaseButton label="Отмена" color="red" size="xss" @click="resetData" />
              <BaseButton
                label="Сохранить"
                color="success"
                size="xss"
                :disabled="newTaskText.value.trim() === ''"
                @click="updateTextByTask"
              />
            </div>
          </td>

          <td :style="{ color: task.status ? 'green' : 'red' }">
            {{ task.status ? 'Выполнена' : 'Не выполнена' }}
          </td>
          <td>
            {{ formatDate(task.createdAt) }}
          </td>
          <td class="task-list__item-actions">
            <button
              class="task-list__item-actions-btn"
              title="Удалить задачу"
              @click="emit('delete-task', task.id)"
            >
              <DeleteIcon />
            </button>
            <button
              v-if="!task.status"
              class="task-list__item-actions-btn"
              title="Отметить как выполненную"
              @click="emit('update-status-task', task.id)"
            >
              <DoneIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <EmptyComponent v-else shadow="error">
      <template #header>
        <p>📭 Список задач пуст</p>
      </template>

      <template #default>
        <p>➕ Вы можете создать задачу</p>
      </template>
    </EmptyComponent>
  </div>
</template>
<style scoped lang="scss">
.task-list__title {
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: separate;
}
th,
td {
  border: 1px solid;
  padding: 10px;
  text-align: left;
}

.task-list__item {
  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    &-btn {
      cursor: pointer;
      width: 30px;
      padding: 5px;
      transition: scale 0.3s ease-in-out;

      &:hover {
        scale: 0.9;
      }
    }
  }
}

.task-list__item-text {
  &:hover {
    background-color: #aeaeae;
    color: $white;
    cursor: pointer;
  }

  &--actions {
    display: flex;
    justify-content: end;
    margin-top: 10px;
    gap: 10px;
  }
}
</style>
