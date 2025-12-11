<script setup lang="ts">
import { computed, ref } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

type TInputTypes =
  | 'button'
  | 'checkbox'
  | 'email'
  | 'image'
  | 'number'
  | 'radio'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'

interface IInputProps {
  placeholder?: string
  type?: TInputTypes
}

const inputValue = defineModel<string | number>('inputValue')
const error = defineModel<string>('error')

defineProps<IInputProps>()
const emit = defineEmits(['resetError', 'showDropdown'])

const handleFocus = () => {
  isFocused.value = true
  emit('showDropdown')
  if (error.value) {
    emit('resetError')
  }
}

const handleBlur = () => {
  isFocused.value = false
}

// Вычисляемое свойство для определения видимости плейсхолдера
const shouldShowPlaceholder = computed(() => {
  return !isFocused.value && !inputValue.value && !error.value
})
</script>

<template>
  <div class="base-input-wrapper" v-bind="$attrs">
    <label
      class="base-input"
      :class="{
        'base-input_isfocused': isFocused,
        'base-input_error': error,
        'base-input_has-value': inputValue,
      }"
    >
      <input
        ref="inputRef"
        v-model="inputValue"
        class="base-input__input"
        :type="type"
        :placeholder="isFocused || inputValue ? '' : placeholder"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span
        class="base-input__placeholder"
        :class="{
          'base-input__placeholder--hidden': !shouldShowPlaceholder,
        }"
      >
        {{ placeholder }}
      </span>
    </label>

    <Transition name="error">
      <small v-if="error" class="base-input__error">
        {{ error }}
      </small>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.base-input {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: 2px solid $txt;
  border-radius: 5px;
  transition: all 0.5s ease-in;
  background: $white;
  overflow: hidden; /* Важно для анимации */

  &_isfocused {
    outline-color: #2a5f8a8e;
  }

  &_error {
    transition: all 0.5s ease-in;
    outline-color: $danger;
  }

  &__placeholder {
    position: absolute;
    color: $text-secondary;
    padding-left: 15px;
    font-size: 14px;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    opacity: 1;
    transform: translateY(0);

    /* Состояние когда плейсхолдер скрыт */
    &--hidden {
      opacity: 0;
      transform: translateY(-100%);
    }

    @include mediaTablet {
      font-size: 16px;
    }
  }

  &__input {
    padding: 10px 15px;
    cursor: auto;
    color: $txt;
    transition: all 0.3s ease-in-out;
    font-size: 15px;
    font-weight: 600;
    background: transparent;
    border: none;
    outline: none;
    width: 100%;

    &::placeholder {
      color: transparent;
    }

    @include mediaTablet {
      font-size: 16px;
    }
  }

  &__error {
    color: $danger;
    font-size: 11px;
    font-weight: 500;
    padding: 0 4px;
    font-weight: 600;
    letter-spacing: 0.7px;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background-color: $white;
    opacity: 0.7;
    cursor: pointer;
  }
}

.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease-in;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
