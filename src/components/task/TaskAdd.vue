<script setup lang="ts">
import { reactive } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseInput from '../ui/BaseInput.vue'

const newTask = reactive<{ value: string; error: string }>({
  value: '',
  error: '',
})

const emit = defineEmits<{
  'add-task': [text: string]
}>()

const createTask = () => {
  if (!newTask.value.trim()) {
    newTask.error = 'Поле не должно быть пустым'
  } else if (newTask.value.trim().length < 3) {
    newTask.error = 'Поле не должно быть менее 3 символов'
  } else {
    emit('add-task', newTask.value)
    newTask.value = ''
  }
}
</script>
<template>
  <div class="task-add">
    <p>Создание задачи</p>
    <BaseInput
      v-model:input-value="newTask.value"
      v-model:error="newTask.error"
      @reset-error="newTask.error = ''"
    />
    <BaseButton label="Создать" @click="createTask" />
  </div>
</template>
<style scoped lang="scss">
.task-add {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
