<script setup lang="ts">
const { shadow = 'gray' } = defineProps<{
  shadow: 'gray' | 'error' | 'success'
}>()
</script>
<template>
  <div class="empty-component" :class="{ [`empty-component--${shadow}`]: shadow }">
    <slot name="header"></slot>
    <slot name="default"></slot>
  </div>
</template>
<style scoped lang="scss">
.empty-component {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: $border-radius;
  padding: 10px 20px;
  max-width: 500px;
  margin-inline: auto;

  &--gray {
    box-shadow: $shadow;
  }
  &--error {
    box-shadow: $shadow-error;
  }
  &--success {
    box-shadow: $shadow-success;
  }
}
</style>
