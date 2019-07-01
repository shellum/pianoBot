<template>
    <div>
        Login
        <input v-model="username" placeholder="edit me">
        <button @click='login()'>Go</button>
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
</style>