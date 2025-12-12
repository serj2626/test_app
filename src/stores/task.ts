import { computed, ref, watch } from 'vue'

import { defineStore } from 'pinia'

export interface ITask {
  id: number
  text: string
  status: boolean
  createdAt: string
}

type TTaskFilter = 'active' | 'completed' | 'all'

export const useTaskStore = defineStore('task-store', () => {
  const filter = ref<TTaskFilter>('all')
  const tasks = ref<ITask[]>(loadTasks())

  function loadTasks() {
    const saved = localStorage.getItem('vue-tasks')
    return saved ? JSON.parse(saved) : []
  }

  const nextIndex = computed(() => {
    const lastTask = tasks.value[tasks.value.length - 1]
    if (lastTask) return lastTask.id + 1
    if (totalCount.value === 0) return 0
    return Math.random()
  })

  function addTask(text: string) {
    if (!text.trim()) return

    const newTask = {
      id: nextIndex.value,
      text: text.trim(),
      status: false,
      createdAt: new Date().toISOString(),
    }

    tasks.value.push(newTask)
  }

  function updateTask(id: number, newText: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task && newText.trim()) {
      task.text = newText.trim()
    }
  }

  function updateStatusTask(id: number) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = !task.status
    }
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  function setFilter(newFilter: TTaskFilter) {
    filter.value = newFilter
  }

  const totalCount = computed(() => tasks.value.length)

  const totalUnfulfilledTasks = computed(() => tasks.value.filter((task) => !task.status).length)

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  return {
    tasks,
    filter,
    totalCount,
    totalUnfulfilledTasks,

    loadTasks,
    updateTask,
    deleteTask,
    setFilter,
    addTask,
    updateStatusTask,
  }
})
