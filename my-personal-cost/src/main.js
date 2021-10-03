import Vue from 'vue'
import App from './App.vue'
// импортируем экземпляр созданного хранилища из листинга выше
import store from '../store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
