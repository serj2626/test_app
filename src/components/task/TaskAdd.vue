<script setup lang="ts">
import { reactive } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseInput from '../ui/BaseInput.vue'
import { validateText } from '@/utils/validations';

const newTask = reactive<{ value: string; error: string }>({
  value: '',
  error: '',
})

const emit = defineEmits<{
  'add-task': [text: string]
}>()

const createTask = () => {
  const resValidateText = validateText(newTask.value)
  if (resValidateText) {
    newTask.error = resValidateText
    return
  } else{
    emit('add-task', newTask.value)
    newTask.value = ''
    newTask.error = ''
  }
}
</script>
<template>
  <div class="task-add">
    <p>Создание задачи</p>
    <BaseInput
      placeholder="Введите текст задачи"
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
