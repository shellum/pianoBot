<template>
    <div class="session">
    <div class="me">
        {{ username }}, thanks for playing PianoBot!
        <hr>
        Here is your playing history:
        <History :width="200" :height="300" class='history' :username='username'></History>
    </div>
    </div>
</template>

<script>
import History from './History.vue'
import { eventBus } from '../main'
export default {
    components: {
        History
    },
    data: function() {
        return {
            startTime: 0,
            timeElapsed: ''
        }
    },
    props: ['username'],
    methods: {
        updateTimeElapsed() {
            var currentTime = (new Date()).getTime()
            var seconds = Math.floor((currentTime - this.startTime)/1000)
            if (seconds >= 300)
                eventBus.$emit('timeUp', username)

            if (seconds >=60) {
               var minutes = Math.floor(seconds / 60)
                var secondsMinusMinutes = seconds - (minutes * 60)
                var minuteText = 'minutes'
                if (minutes == 1)
                    minuteText = 'minute'
                var secondText = 'seconds'
                if (secondsMinusMinutes == 1)
                    secondText = 'second'
                this.timeElapsed = minutes + ' ' + minuteText + ', ' + secondsMinusMinutes + ' ' + secondText
            }
            else if (seconds > 1) {
                this.timeElapsed = seconds + ' seconds'
            }
            else if (seconds == 1) {
                this.timeElapsed = '1 second'
            }
            else {
                this.timeElapsed = '0 seconds'
            }
            
        }
    },
    created() {
        this.startTime = (new Date()).getTime()
        setInterval(this.updateTimeElapsed,1000)
    }
}
</script>

<style scoped>
    .me {
    margin: auto;
    width: 220px;
    float: left;
    padding: 10px;
    }
    .history {
        width: 200px;
        height: 300px;
        margin: 20px 0px 0px 0px;
    }
    .session {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>