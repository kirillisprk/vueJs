<template>
  <div>
    <template>
      <span>Total Prise: {{ this.getFullPaymentAmount }}</span>
      <v-simple-table
        fixed-header>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              #
            </th>
            <th class="text-left">
              Date
            </th>
            <th class="text-left">
              Category
            </th>
            <th class="text-left">
              Value
            </th>
            <th class="text-left">

            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in getPagePaymentsList[currentPage]" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.amount }}</td>
            <td>
              <ContextMenuComponent
                :item-param="{id: item.id, date: item.date, category: item.category, amount: item.amount}"/>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <pagination
      :count-pages="this.getCountPages"
      @changePage="getDataPage"
    />

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import Pagination from '@/components/Pagination'
import ContextMenuComponent from '@/components/ContextMenuComponent'

export default {
  name: 'PaymentsDisplay',
  components: {
    Pagination,
    ContextMenuComponent
  },
  data () {
    return {
      currentPage: ''
    }
  },
  computed: {
    ...mapGetters(['getFullPaymentAmount', 'getPagePaymentsList', 'getCountPages'])

  },
  methods: {
    ...mapActions(['fetchDataPage']),
    ...mapMutations(['setCurrentPage', 'deleteCurrentElement']),

    getDataPage () {
      const p = `Page${this.$route.params.page}`
      this.setCurrentPage(p)
      this.currentPage = p

      const cashPage = Object.keys(this.getPagePaymentsList)
      if (!cashPage.includes(this.currentPage)) {
        this.fetchDataPage(p)
        this.cashPage = this.getPagePaymentsList
      }
    },
    deleteCurrent (id) {
      this.deleteCurrentElement(id)
    }
  },

  mounted () {
    this.getDataPage(1)
  },
  created () {
    this.currentPage = `Page${this.$route.params.page}`
    this.$contextMenu.EventBus.$on('deleteMenu', this.deleteCurrent)
  }

}
</script>

<style scoped lang="scss">

</style>
