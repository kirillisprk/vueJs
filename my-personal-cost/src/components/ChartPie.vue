<script>
import {Doughnut, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins
export default {
  mixins: [reactiveProp],
  extends: Doughnut,
  props: ['options'],
  data () {
    return {
      chartOptions: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>

</style>
