<template>
  <div id="app">
    <Header :text-header="textHeader"/>
    <FastAddList/>
    <ButtonAddNewCost @emitShowForm="showFormAdd = !showFormAdd"/>
    <AddPaymentForm v-show="showFormAdd"/>
    <AddPaymentForm v-if="editIsShow" :state="this.state" :editElement="editElement"/>
    <header>
      <router-link to="/dashboard/1">Dashboard</router-link>
      <router-link to="/Calculator">Calculator</router-link>
      <router-link to="/about">About</router-link>
    </header>
    <router-view/>
  </div>

</template>

<script>
import Header from './components/Header.vue'
import ButtonAddNewCost from './components/ButtonAddNewCost'
import AddPaymentForm from './components/AddPaymentForm';
import FastAddList from "@/components/FastAddList";

export default {
  name: 'App',
  components: {
    Header,
    ButtonAddNewCost,
    FastAddList,
    AddPaymentForm,
  },
  data () {
    return {
      textHeader: 'My personal const',
      showFormAdd: false,
      page: 'about',
      modalSettings: {},
      editIsShow: false,
      editElement: {},
      state: ''
    }
  },
  methods: {
    edit (element) {
      this.editIsShow = true;
      this.state = 'edit'
      this.editElement = element
    },
    closeEdit () {
      this.editIsShow = false
    }
  },
  watch: {
    $route (to) {
      this.showFormAdd = to.name === 'addPayment';
    }
  },
  created () {
    if (this.$route.path === '/') {
      this.$router.push({name: 'dashboard', params: {page: '1'}})
    }
  },
  mounted () {
    this.$contextMenu.EventBus.$on('editElement', this.edit)
    this.$contextMenu.EventBus.$on('closeEdit', this.closeEdit)
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
header {
  display: grid;
  grid-auto-flow: column;
  justify-items: start;
}
</style>
