<template>
  <div>
    <table class="blueTable">
      <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Category</th>
        <th>Amount</th>
      </tr>
      </thead>
      <tfoot>
      </tfoot>
      <tbody>
      <tr v-for="item in getPagePaymentsList[currentPage]" v-bind:key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.amount }}</td>
      </tr>
      </tbody>
    </table>
    <span>Total Prise: {{ this.getFullPaymentAmount }}</span>
    <br/>
    <pagination :count-pages="this.getCountPages" @changePage="getDataPage"/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import Pagination from "@/components/Pagination";

export default {
  name: 'PaymentsDisplay',
  components: {
    Pagination
  },
  data () {
    return {
      currentPage: ''
    }
  },
  computed: {
    ...mapGetters(['getFullPaymentAmount', 'getPagePaymentsList', 'getCountPages']),

  },
  methods: {
    ...mapActions(['fetchDataPage']),
    ...mapMutations(['setCurrentPage']),

    getDataPage (n) {
      let p = `Page${n}`;
      this.setCurrentPage(p);
      this.currentPage = p;
      let cashPage = Object.keys(this.getPagePaymentsList);
      if (!cashPage.includes(this.currentPage)) {
        this.fetchDataPage(p)
        this.cashPage = this.getPagePaymentsList
      }
    },
  },

  mounted () {
    this.getDataPage(1)
  },

}
</script>

<style scoped lang="scss">

.blueTable {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  font-size: 13px;

  td, th {
    border-bottom: 1px solid #AAAAAA;
    padding: 10px;
  }

  thead {
    th {
      font-size: 15px;

      &:first-child {
        border-left: none;
      }
    }
  }

}

</style>
