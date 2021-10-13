<template>
  <div>
    <v-col>
      <v-btn color="teal mx-4" dark
             v-for="page in this.countPages"
             :key="page"
             @click="clickPage(page)">
        {{ page }}
      </v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    countPages: Number
  },
  methods: {
    clickPage (n) {
      if (this.$route.path !== `/dashboard/${n}`) {
        this.$router.push({path: `/dashboard/${n}`})
        this.$emit('changePage')
      }
    }
  }
}
</script>

<style scoped>

</style>
