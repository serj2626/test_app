import { computed, reactive, ref, watch } from 'vue'

import { defineStore } from 'pinia'

export interface ITask {
  id: number
  text: string
  status: boolean
  createdAt: string
}

export type TTaskFilter = 'completed' | 'all' | 'unfulfilled'
export interface IFiltersData {
  search: string
  status: TTaskFilter
}

export const useTaskStore = defineStore('task-store', () => {
  const tasks = ref<ITask[]>([])
  const filtersData = reactive<IFiltersData>({
    search: '',
    status: 'all',
  })

  function loadTasks() {
    const saved = localStorage.getItem('vue-tasks')
    tasks.value = saved ? JSON.parse(saved) : []
  }
  function loadFilters() {
    const saved = localStorage.getItem('vue-task-filters')
    if (saved) {
      const parsed = JSON.parse(saved) as IFiltersData
      filtersData.search = parsed.search
      filtersData.status = parsed.status
    }
  }

  loadTasks()
  loadFilters()

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
    filtersData.status = newFilter
  }

  const totalCount = computed(() => allTasks.value.length)

  const totalUnfulfilledTasks = computed(() => tasks.value.filter((task) => !task.status).length)

  const allTasks = computed(() => {
    let list = tasks.value

    if (filtersData.status === 'completed') {
      list = list.filter((t) => t.status)
    } else if (filtersData.status === 'unfulfilled') {
      list = list.filter((t) => !t.status)
    }

    if (filtersData.search.trim()) {
      const query = filtersData.search.trim().toLowerCase()
      list = list.filter((t) => t.text.toLowerCase().includes(query))
    }
    return list
  })

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  watch(
    filtersData,
    (newFilters) => {
      localStorage.setItem('vue-task-filters', JSON.stringify(newFilters))
    },
    { deep: true },
  )

  return {
    // STATE
    tasks,
    filtersData,
    // GETTERS
    totalCount,
    totalUnfulfilledTasks,
    allTasks,
    // SETTERS
    loadTasks,
    updateTask,
    deleteTask,
    setFilter,
    addTask,
    updateStatusTask,
  }
})
