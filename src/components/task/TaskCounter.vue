<script setup lang="ts">
defineProps<{ count: number }>()
</script>
<template>
  <div class="task-counter">
    <p class="task-counter__text">
      Количество невыполненных задач: <span class="task-counter__count">{{ count }}</span>
    </p>
  </div>
</template>
<style scoped lang="scss">
  .task-counter {
    text-align: center;
    &__text {
      font-size: 20px;
    }
    &__count {
      font-weight: 600;
      color: $danger;
    }
  }
</style>
