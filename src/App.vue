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
import Session from './components/Session.vue'

export default {
  name: 'pianoBot',
  components: {
    Bot,
    Login,
    Admin,
    Session
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
    eventBus.$on('userLoggedOut', () => {
      this.componentName = 'Login'
      location.reload()
    })
    eventBus.$on('timeUp',(username) => {
      this.componentName = 'Session'
    })
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
