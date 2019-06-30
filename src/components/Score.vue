<template>
<div class='me'>
    <div style="margin-bottom:10px;">Correct {{ right }}/{{ wrong + right }}</div>
    <div>% breakdown per note</div>
    <ul>
        <li v-for="(wrongNote,i) in wrongNoteIndex">
            <div v-show="(rightNoteIndex[i] + wrongNoteIndex[i]) != 0">
                <div style="display:inline-block;width:30%">{{ i.split("")[0].toUpperCase() }}: {{ rightNoteIndex[i] }}/{{ rightNoteIndex[i]+wrongNoteIndex[i] }}</div>
                <div style="display:inline-block;width:60%">
                    <div v-show="wrongNote != 0" :style="{backgroundColor: '#FF7F50', width: (wrongNote * 100 / wrong) + '%',height: '5px'}"></div>
                    <div v-show="rightNoteIndex[i] != 0" :style="{backgroundColor: 'rgba(80,155,90,1)', width: (rightNoteIndex[i] * 100 / right) + '%',height: '5px'}"></div>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import { eventBus } from '../main'
export default {
    data: function() {
        return {
            wrongNoteIndex: {},
            rightNoteIndex: {},
            right: 0,
            wrong: 0
        }
    },
    props: ['notes'],
    created() {
        this.wrongNoteIndex = {}
        console.log(this.notes)
        this.notes.map(note => this.wrongNoteIndex[note] = 0) 
        this.rightNoteIndex = {}
        this.notes.map(note => this.rightNoteIndex[note] = 0) 
        eventBus.$on('wrongAnswer', (note) => {
            this.wrong++
            this.wrongNoteIndex[note]++
        })
        eventBus.$on('rightAnswer', (note) => {
            this.right++
            this.rightNoteIndex[note]++
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