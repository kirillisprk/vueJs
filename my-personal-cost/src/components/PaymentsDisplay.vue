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
      <tr v-for="item in items" v-bind:key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.amount }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PaymentsDisplay',
  props: {
    items: {
      type: Array
    }
  },
  data () {
    return {}
  }
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
