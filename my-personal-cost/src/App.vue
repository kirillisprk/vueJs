<template>
  <div id="app">
    <Header :text-header="textHeader"/>
    <ButtonAddNewCost @emitShowForm="showFormAdd = !showFormAdd"/>
    <AddPaymentForm v-show="showFormAdd"/>
    <PaymentsDisplay/>
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
    }
  },
  methods: {},

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
