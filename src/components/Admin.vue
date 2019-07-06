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
        var that = this
        db.collection("sessions")
            .get()
            .then(function(querySnapshot) {
                var usernames = []
                querySnapshot.forEach(function(doc) {
                    usernames.push(doc.id)
                });
                that.usernames = usernames
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
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