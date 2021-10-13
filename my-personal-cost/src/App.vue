<template>
  <v-app>
    <v-app-bar app flat color="teal" dark>
      <v-btn plain :ripple="false" to="/dashboard/1">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/Calculator">Calculator</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <Header :text-header="textHeader"/>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="teal mb-8" dark @click="dialog = true">
              ADD NEW COST
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <AddPaymentForm @hideAdd="closeWindow" :dialog="dialog"/>
            <router-view/>
            <FastAddList @showAdd="showWindow"/>
            <AddPaymentForm v-if="editIsShow" :state="this.state" :editElement="editElement"/>
          </v-col>
          <v-col>
            тут график
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Header from "@/components/Header";
import ButtonAddNewCost from "@/components/ButtonAddNewCost";
import FastAddList from "@/components/FastAddList";
import AddPaymentForm from "@/components/AddPaymentForm";

export default {
  name: 'App',
  components: {
    Header,
    ButtonAddNewCost,
    FastAddList,
    AddPaymentForm,
  },
  data: () => ({
    dialog: false,
    textHeader: 'My personal const',
    showFormAdd: false,
    page: 'about',
    modalSettings: {},
    editIsShow: false,
    editElement: {},
    state: ''
  }),
  methods: {
    edit (element) {
      this.editIsShow = true;
      this.state = 'edit'
      this.editElement = element
    },
    closeEdit () {
      this.editIsShow = false
    },
    closeWindow () {
      this.dialog = false
    },
    showWindow () {
      this.dialog = true
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
