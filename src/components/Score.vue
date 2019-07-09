<template>
<div class='me'>
    <div style="margin-bottom:10px;">Correct {{ right }}/{{ wrong + right }}</div>
    <div>% breakdown per note</div>
    <ul>
        <li v-for="(specificNode,i) in noteScoreInfo">
            <div v-show="(noteScoreInfo[i].right + noteScoreInfo[i].wrong) != 0">
                <div style="display:inline-block;width:30%">{{ i.split("")[0].toUpperCase() }}: {{ noteScoreInfo[i].right }}/{{ noteScoreInfo[i].right + noteScoreInfo[i].wrong }}</div>
                <div style="display:inline-block;width:60%">
                    <div v-show="noteScoreInfo[i].wrong != 0" :style="{backgroundColor: '#FF7F50', width: (noteScoreInfo[i].wrong * 100 / wrong) + '%',height: '5px'}"></div>
                    <div v-show="noteScoreInfo[i].right != 0" :style="{backgroundColor: 'rgba(80,155,90,1)', width: (noteScoreInfo[i].right * 100 / right) + '%',height: '5px'}"></div>
                    <div v-show="noteScoreInfo[i].times.length != 0" :style="{backgroundColor: 'rgb(0,191,255)', width: (Math.min(getNoteTimeAverage(i),30) * 100 / 30) + '%',height: '5px'}"></div>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import { eventBus } from '../main'
import { util } from '../main'
export default {
    data: function() {
        return {
            noteScoreInfo: {},
            right: 0,
            wrong: 0,
            sessionId: 0
        }
    },
    methods: {
        getNoteTimeAverage(note) {
            var times = []
            if (this.noteScoreInfo[note]) times = this.noteScoreInfo[note].times
            var totalTime = times.reduce((acc,curr)=> {
                return acc + curr
            },0)
            if (times.length == 0) {
                return 0;
            }
            else {
                return totalTime / times.length
            }
        }
    },
    props: ['notes','username'],
    created() {
        this.sessionId = ''+((new Date()).getTime())
        this.noteScoreInfo = {}
        this.notes.map(note => this.noteScoreInfo[note] = {right:0,wrong:0,times:[]}) 
        eventBus.$on('wrongAnswer', (noteInfo) => {
            this.wrong++
            this.noteScoreInfo[noteInfo.note].wrong++
        })
        eventBus.$on('rightAnswer', (noteInfo) => {
            this.right++
            this.noteScoreInfo[noteInfo.note].right++
        })
        eventBus.$on('timeToGuess', (noteGuessInfo) => {
            var now = (new Date()).getTime()
            var seconds = Math.ceil((now - noteGuessInfo.time) / 1000)
            console.log('took: '+seconds)
            this.noteScoreInfo[noteGuessInfo.note].times.push(seconds)
            console.log(JSON.stringify(this.noteScoreInfo))
            var that = this
            var docRef = db.collection("sessions").doc(this.username);
            docRef.get().then(function(doc) {
                var cookieObj = {}
                if (doc.exists) {
                    cookieObj = doc.data()
                    console.log(JSON.stringify(doc.data()))
                }
                cookieObj[that.sessionId] = that.noteScoreInfo
                db.collection("sessions").doc(that.username).set(cookieObj)
            })

        })
   }
}
</script>

<style scoped>
.me {
    margin: auto;
    width: 220px;
    float: right;
    padding: 10px;
}
</style>