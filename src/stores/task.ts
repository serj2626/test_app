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
  const tasks = ref<ITask[]>([
    { id: 1, text: 'Помыться с мочалкой', status: false, createdAt: new Date().toISOString() },
    { id: 2, text: 'Почистить зубы', status: true, createdAt: new Date().toISOString() },
    {
      id: 3,
      text: 'Купить проездной, сходить на работу',
      status: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      text: 'Сходить в зал, придти домой и помыться, затем поесть, почистить зубы, ну и наконец-то лечь спать в кроватку',
      status: true,
      createdAt: new Date().toISOString(),
    },
  ])

  // const newTaskText = reactive<{ value: string; error: string }>({
  //   value: '',
  //   error: '',
  // })

  const filter = ref<TTaskFilter>('all')

  // const tasks = ref<ITask[]>(loadTasks())

  const loadTasks = () => {
    const saved = localStorage.getItem('vue-tasks')
    return saved ? JSON.parse(saved) : []
  }

  const addTask = (text: string) => {
    if (!text.trim()) return

    const newTask = {
      id: totalCount.value + 1,
      text: text.trim(),
      status: false,
      createdAt: new Date().toISOString(),
    }

    tasks.value.push(newTask)
  }

  const updateTask = (id: number, newText: string) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task && newText.trim()) {
      task.text = newText.trim()
    }
  }

  const updateStatusTask = (id: number) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = !task.status
    }
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const setFilter = (newFilter: TTaskFilter) => {
    filter.value = newFilter
  }

  const totalCount = computed(() => tasks.value.length)

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  return {
    tasks,
    // newTaskText,
    filter,
    totalCount,
    loadTasks,
    updateTask,
    deleteTask,
    setFilter,
    addTask,
    updateStatusTask,
  }
})
