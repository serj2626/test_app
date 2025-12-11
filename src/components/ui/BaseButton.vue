<script lang="ts" setup>
interface IBaseButton {
  size?: 'xss' | 'xs' | 'sm' | 'md' | 'lg'
  color?: 'grey' | 'blue' | 'red' | 'success'
  label?: string
  disabled?: boolean
  radius?: string
  outline?: boolean
}

const {
  color = 'blue',
  disabled = false,
  size = 'md',
  radius = '5px',
  label = '',
  outline = false,
} = defineProps<IBaseButton>()
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'base-button',
      `base-button_${color}`,
      `base-button_${size}`,
      { 'base-button_disabled': disabled, 'base-button_outline': outline },
    ]"
  >
    {{ label }}
  </button>
</template>
<style scoped lang="scss">
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: $txt;

  user-select: none;
  border-radius: v-bind(radius);
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  width: fit-content;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &_blue {
    background-color: $info;
    color: $white;
  }
  &_red {
    background-color: $danger;
    color: $white;
  }
  &_success {
    background-color: $success;
    color: $white;
  }

  &_grey {
    background-color: $text-secondary;
    font-weight: 600;
    color: $white;
  }
  &_disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &_outline {
    border: 1px solid v-bind(color);
    color: v-bind(color);
    transition: all 0.3s ease-in-out;
    background-color: transparent;
    &:hover {
      background-color: v-bind(color);
      color: $txt;
    }
  }

  &_xss {
    padding: 4px 6px;
    font-size: 14px;
  }

  &_xs {
    padding: 6px 9px;
  }

  &_sm {
    padding: 6px 12px;
    font-size: 15px;
  }

  &_md {
    padding: 8px 16px;
    font-size: 16px;
  }

  &_lg {
    padding: 16px 28px;
  }
}
</style>
