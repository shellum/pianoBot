<template>
    <div>
        <div class='header'>PianoBot</div>
        <div class='login'>
            <input v-model="username" autofocus v-on:keyup.enter="login()" placeholder="Enter username here">
            <button @click='login()'>Login</button>
        </div>
    </div>
</template>

<script>
import { eventBus } from '../main'

export default {
    data: function() {
        return {
            username: ''
        }
    },
    methods: {
        login() {
            eventBus.$emit('userLoggedIn',this.username)
        }
    }
}
</script>

<style>
  .header {
    text-align: center;
    font-size: 18pt;
    font-family: Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color: rgba(80,155,90,0.5);
    width:100%;
    margin: 10px 0px 10px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .login {
      padding: 20px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>