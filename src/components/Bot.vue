<template>
  <div class="mybot">
User: {{ username }}
    <div class='header'>PianoBot</div>
    <Session class='session' :username='username'></Session>
    <Score :notes='notes' class='score' :username='username'></Score>
    <FlashCard :note='note' class="flashcard"></FlashCard>
    <Answers :note='note' class="answers"></Answers>
    <button @click='changeNote()'></button>
  </div>
</template>

<script>
import { eventBus } from '../main'

import FlashCard from './FlashCard.vue'
import Answers from './Answers.vue'
import Score from './Score.vue'
import Session from './Session.vue'

export default {
  components: {
    FlashCard,
    Answers,
    Score,
    Session
  },
  props: ['username'],
  data () {
    return {
      note: 'c1',
      notes: ['c1','d1','e1','f1','g1','a1','b1','c2','d2','e2','f2'],
      timeWhenCurrentNoteStarted: (new Date()).getTime()
    }
  },
  methods: {
    changeNote() {
      eventBus.$emit('timeToGuess',{note: this.note,time: this.timeWhenCurrentNoteStarted})
      this.note = this.notes[Math.floor(Math.random() * this.notes.length)]
      this.timeWhenCurrentNoteStarted = (new Date()).getTime()
    }
  },
  created() {
    eventBus.$on('rightAnswer', (note) => {
      this.changeNote()
    })
  }
}
</script>

<style scoped>
  .mybot {
    margin: auto;
    width: 100%;
  }
  .answers {
    margin: 10px;
  }
  .flashcard {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .score {
    width: 300px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .session {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .header {
    text-align: center;
    font-size: 18pt;
    font-family: Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color: rgba(80,155,90,0.5);
    width:100%;
    margin: 10px 0px 10px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
