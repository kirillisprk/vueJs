<template>
  <div>
    <template>
      <div class="text-center">
        <v-pagination
          v-model="p"
          :length="this.countPages"
          :total-visible="7"
          @input="clickPage">
        </v-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Pagination',
  props: {
    countPages: Number
  },
  data () {
    return {
      p: this.getPage
    }
  },
  computed: {
    ...mapGetters(['getCurrentPage']),
    getPage () {
      let p = this.getCurrentPage.slice(-1);
      return parseInt(p)
    },

  },
  methods: {
    clickPage (n) {
      if (this.$route.path !== `/dashboard/${n}`) {
        this.$router.push({path: `/dashboard/${n}`})
        this.$emit('changePage')
      }
    }
  },
  created () {
    this.p = this.getPage
  }

}
</script>

<style scoped>

</style>
