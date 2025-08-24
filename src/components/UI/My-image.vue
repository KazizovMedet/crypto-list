<template>
  <img
      v-if="item.icon"
      :src="`data:image/svg+xml;base64,${item.icon}`"
      alt="icon"
      class="w-8 h-8"
  />
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>