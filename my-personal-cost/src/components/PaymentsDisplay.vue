<template>
  <div>
    <template>
      <span>Total Prise: {{ this.getFullPaymentAmount }}</span>
      <v-data-table
        :headers="headers"
        :items="getPagePaymentsList[currentPage]"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item.actions="{ item }">
          <ContextMenuComponent
            :item-param="{id: item.id, date: item.date, category: item.category, amount: item.amount}"/>
        </template>
      </v-data-table>
      <pagination
        :count-pages="this.getCountPages"
        @changePage="getDataPage"
      />
    </template>
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
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {text: 'Date', value: 'date', sortable: true},
        {text: 'Category', value: 'category', sortable: true},
        {text: 'amount', value: 'amount', sortable: true},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      currentPage: '',

    }
  },
  computed: {
    ...mapGetters(['getFullPaymentAmount', 'getPagePaymentsList', 'getCountPages']),
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
