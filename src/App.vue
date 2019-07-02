<template>
  <div class="myapp">
    <component :is="componentName" v-bind:username='username'></component>
  </div>
</template>

<script>
import { eventBus } from './main'

import Bot from './components/Bot.vue'
import Login from './components/Login.vue'
import Admin from './components/Admin.vue'

export default {
  name: 'pianoBot',
  components: {
    Bot,
    Login,
    Admin
  },
  data () {
    return {
      componentName: 'Login',
      username: ''
    }
  },
  methods: {
  },
  created() {
    eventBus.$on('userLoggedIn', (username) => {
      this.username = username
      if (username==='admin') {
        this.componentName = 'Admin'
      }
      else {
        this.componentName = 'Bot'
      }
    })
  }
}
</script>

<style scoped>
  .myapp {
    margin: auto;
    width: 100%;
  }
</style>
