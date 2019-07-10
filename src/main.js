import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue();

export const util = {
}

new Vue({
  el: '#app',
  render: h => h(App)
})

