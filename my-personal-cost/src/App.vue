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
            <v-btn color="teal mb-8" dark @click="state='Add'; dialog = true">
              ADD NEW COST
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <AddPaymentForm @hideAdd="closeWindow" :dialog="dialog" :state="this.state" :editElement="editElement"/>
            <router-view/>
            <FastAddList @showAdd="showWindow"/>
          </v-col>
          <v-col>
            <chart-pie v-if="showChart" :chart-data="datacollection"/>
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
import {mapGetters} from "vuex";
import ChartPie from "@/components/ChartPie";

export default {
  name: 'App',
  components: {
    Header,
    ButtonAddNewCost,
    FastAddList,
    AddPaymentForm,
    ChartPie
  },
  data: () => ({
    datacollection: null,
    showChart: false,
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
      this.dialog = true;
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
      this.state = 'Add'
    }
  },
  computed: {
    ...mapGetters([
      'getCategoriesList',
      'getStatistics'
    ]),
    getLabel: function () {
      if (this.getStatistics) {
        this.showChart = true
        return Object.keys(this.getStatistics)
      } else return ['']
    },
    getData: function () {
      if (this.getStatistics) {
        return Object.values(this.getStatistics)
      } else return ['']
    }
  },
  watch: {
    $route (to) {
      this.showFormAdd = to.name === 'addPayment';
    },
    getData () {
      this.datacollection = {
        labels: this.getLabel,
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#ff0202"],
            data: this.getData
          }
        ]
      }
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
