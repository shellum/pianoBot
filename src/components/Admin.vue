<template>
    <div>
        <div v-for="username in usernames">
            <div class='side'>
            {{ username}}:
            <History :width="200" :height="300" class='history' :username='username'></History>
            </div>
        </div>
    </div>
</template>

<script>
import History from './History.vue'

export default {
    components: {
        History
    },
    data: function() {
        return {
            usernames: []
        }
    },
    created() {
        var cookie = document.cookie
        var cookies = cookie.split(';')
        var appCookies = cookies.filter(x=>{return x.trim().indexOf('pianoBot_')==0})
        var usernames = appCookies.map(x => {return x.split("=")[0].trim().replace("pianoBot_","")})
        this.usernames = usernames
    }
}
</script>

<style scoped>
    .history {
        width: 200px;
        height: 300px;
        margin: 20px 0px 0px 0px;
    }
    .side {
        diaply:inline;
        margin:20px;
    }
</style>