<template>
  <div>
    PageAbout
    <button @click="openModal">testMODAL</button>
  </div>
</template>

<script>
export default {
  name: "PageAbout",
  methods: {
    openModal () {
      this.$modal.show({title: "Modal", content: "Modal"})
    }
  }
}
</script>

<style scoped>

</style>
