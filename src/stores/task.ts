import { computed, ref, watch } from 'vue'

export interface ITask {
  id: number
  text: string
  status: boolean
  createdAt: string
}

export function useTaskStore() {
  /**
   * @returns - возвращает созданные задачи из стора
   */
  const loadTasks = () => {
    const saved = localStorage.getItem('vue-tasks')
    return saved ? JSON.parse(saved) : []
  }

  // Состояние
  const tasks = ref<ITask[]>(loadTasks())
  const filter = ref<'active' | 'completed' | 'all'>('all')

  /**
   * Следим за изменениями в tasks
   */
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  const totalCount = computed(() => tasks.value.length)

  // Действия (actions)
  const addTask = (text: string) => {
    if (!text.trim()) return

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      status: false,
      createdAt: new Date().toISOString(),
    }

    tasks.value.push(newTask)
  }

  // const toggleTask = (id) => {
  //   const task = tasks.value.find((t) => t.id === id)
  //   if (task) {
  //     task.completed = !task.completed
  //     task.updatedAt = new Date().toISOString()
  //   }
  // }

  const updateTask = (id: number, newText: string) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task && newText.trim()) {
      task.text = newText.trim()
    }
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  return {
    // Состояние
    tasks,
    filter,

    // Геттеры

    totalCount,

    // Действия
    addTask,
    updateTask,
    deleteTask,
    setFilter,
  }
}
