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
      if (this.$route.path !== `/dashboard/${n}`) {
        this.$router.push({path: `/dashboard/${n}`})
        this.$emit('changePage')
      }
      // console.log(this.$route.params.page)
    }
  }
}
</script>

<style scoped>

</style>
