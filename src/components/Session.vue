<template>
    <div class="me">
        <div>Time in current session:</div>
        <div>{{ timeElapsed }}</div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            startTime: 0,
            timeElapsed: ''
        }
    },
    methods: {
        updateTimeElapsed() {
            var currentTime = (new Date()).getTime()
            var seconds = Math.floor((currentTime - this.startTime)/1000)
            if (seconds >=60) {
               var minutes = Math.floor(seconds / 60)
               console.log('minutes: '+ minutes)
                var secondsMinusMinutes = seconds - (minutes * 60)
                console.log('secondsMinusMinutes: '+secondsMinusMinutes)
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
</style>