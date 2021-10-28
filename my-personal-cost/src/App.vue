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
            {{ this.getStatistics }}
            <chart-pie :chartdata="chartData"/>
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
    loaded: false,
    dialog: false,
    textHeader: 'My personal const',
    showFormAdd: false,
    page: 'about',
    modalSettings: {},
    editIsShow: false,
    editElement: {},
    state: '',
    //chartLabels: Object.keys(this.getStatistics),
    //chartData: Object.values(this.getStatistics),
    chartOptions: null,
    chartData: {
      labels: ['Food'],
      data: [333]
    }
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
    },
    showGraphic () {
      this.renderChart(this.dataSet)
    }
  },
  computed: {
    ...mapGetters([
      'getCategoriesList',
      'getStatistics'
    ]),
    getLabels () {
      console.log('345', this.getStatistics)
      return ['Food']
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
