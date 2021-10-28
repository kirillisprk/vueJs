<template>
  <div>
    <button v-for="page in this.countPages" v-bind:key="page"
            @click="clickPage(page)">{{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    countPages: Number
  },
  methods: {
    clickPage (n) {
      this.$emit('changePage', n)
    }
  }
}
</script>

<style scoped>

</style>
