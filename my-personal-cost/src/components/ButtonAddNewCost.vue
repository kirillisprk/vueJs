<template>
  <div>
    <button
      @click="showForm">
      ADD NEW COST
      <v-icon>mdi-plus</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonAddNewCost',
  methods: {
    showForm () {
      this.$emit('emitShowForm')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
