<template>
  <div ref="root" class="relative inline-block text-left">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="inline-flex items-center gap-2 px-3 py-2 bg-white border-dark-700 rounded-md shadow hover:bg-gray-50"
    >
      <img
        v-if="modelValue?.icon"
        :src="iconSrc(modelValue.icon)"
        :alt="modelValue.code"
        class="w-5 h-5"
      />
      <div v-else class="w-5 h-5 rounded-full bg-gray-200" />
      <span class="font-medium text-black">{{ modelValue?.code || 'Aud' }}</span>
      <svg class="w-4 h-4 ml-1 opacity-70" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.25 7.5 10 12.25 14.75 7.5h-9.5z" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 w-36 max-h-72 overflow-auto bg-white border rounded-md shadow-lg p-1"
      role="listbox"
    >
      <button
        v-for="el in filteredItems"
        :key="el.code"
        @click="select(el)"
        class="w-full text-black flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-left"
        role="option"
      >
        <img v-if="el.icon" :src="iconSrc(el.icon)" :alt="el.code" class="w-5 h-5" />
        <div v-else class="w-5 h-5 rounded-full bg-gray-200" />
        <span class="font-medium">{{ el.code }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: null },
  items: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue', 'change'])
const filteredItems = computed(() =>
    (props.items || []).filter(el => el.code !== props.modelValue?.code)
)
const root = ref(null)
const isOpen = ref(false)

const iconSrc = (b64) => `data:image/svg+xml;base64,${b64}`

function select(el) {
  emit('update:modelValue', el)
  emit('change', el)
  isOpen.value = false
}

function onClickOutside(e) {
  if (!root.value?.contains(e.target)) isOpen.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside, true))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside, true))
</script>
