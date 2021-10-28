<template>
  <div id="app">
    <Header :text-header="textHeader"/>
    <ButtonAddNewCost @emitShowForm="showFormAdd = !showFormAdd"/>
    <AddPaymentForm v-show="showFormAdd" @emitName="methodName"/>
    <PaymentsDisplay :items="paymentsList"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ButtonAddNewCost from './components/ButtonAddNewCost'
import AddPaymentForm from './components/AddPaymentForm';
import PaymentsDisplay from './components/PaymentsDisplay'

export default {
  name: 'App',
  components: {
    Header,
    ButtonAddNewCost,
    AddPaymentForm,
    PaymentsDisplay
  },
  data () {
    return {
      textHeader: 'My personal const',
      showFormAdd: false,
      paymentsList: []
    }
  },
  methods: {
    fetchData () {
      return [
        {
          id: 1,
          date: '28.03.2020',
          category: 'Food',
          amount: 169
        },
        {
          id: 2,
          date: '24.03.2020',
          category: 'Transport',
          amount: 360
        },
        {
          id: 3,
          date: '24.03.2020',
          category: 'Food',
          amount: 532
        }
      ]
    },
    methodName (data) {
      data.id = this.paymentsList.length + 1
      this.paymentsList = [...this.paymentsList, data]
    }
  },
  created () {
    this.paymentsList = this.fetchData()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-gap: 10px;
}

body {
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
