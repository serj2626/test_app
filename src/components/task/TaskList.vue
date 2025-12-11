<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import BaseButton from '../ui/BaseButton.vue'
import { formatDate } from '@/utils/functions'

const store = useTaskStore()
</script>
<template>
  <div class="task-list">
    <table>
      <caption>
        Список задач
      </caption>
      <thead>
        <tr>
          <th colspan="2">Текст задачи</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in store.tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.text }}</td>
          <td>{{ task.status ? 'Выполнена' : 'Не выполнена' }}</td>
          <td>{{ formatDate(task.createdAt) }}</td>
          <td v-if="task.status"><BaseButton label="Удалить" color="red" size="sm" /></td>
          <td v-else><BaseButton label="Выполнить" color="success" size="sm" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
caption {
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
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

tr:hover {
  background-color:  #aeaeae;
  color: $white;
}
</style>
