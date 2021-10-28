<template>
  <div class="addPaymentForm">
    <button class="buttonShowForm" @click="showForm">ADD NEW COST+</button>
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

.addPaymentForm {
  display: grid;
  grid-gap: 10px;
}

.buttonShowForm {
  width: 50%;
}
</style>
