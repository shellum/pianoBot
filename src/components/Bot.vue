<template>
  <div class="mybot">
    <div class='header'>
      <div class='header-section header-small' style='float:left;'>👤{{ username }}</div>
      <div class='header-section'>PianoBot<span class='center' v-for="badge in badges"><img class='img-small' v-bind:src="getBadgeImage(badge)"></span></div>
      <div class='header-section header-small link' @click='logout()' style='float:right;'>Logout</div>
    </div>
    <Session class='session' :username='username'></Session>
    <FlashCard :note='note' class="flashcard"></FlashCard>
    <Answers :note='note' class="answers"></Answers>
    <button @click='changeNote()'></button>
  </div>
</template>

<script>
  import { eventBus } from '../main'
  import { util } from '../util'

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
      badges: [],
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
    },
    getBadgeImage(badge) {
      return './dist/'+util.getBadgeInfo(badge).img
    },
    logout() {
      firebase.auth().signOut().then(function() {
        eventBus.$emit('userLoggedOut',{})
      })
    }
  },
  created() {
    eventBus.$on('rightAnswer', (noteInfo) => {
      this.changeNote()
    })
    eventBus.$on('badgesUpdate', (badges) => {
      this.badges = badges
    })

  }
}
</script>

<style scoped>
  #bar-chart {
    width: 0px;
    height: 0px;
  }
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
    width:0px;
    height:0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    opacity: 0;
    position: absolute;
    top:0px;
  }
  .header-section {
    display: inline-block;
    margin: 0px 20px 0px 20px;
  }
  .header {
    vertical-align: middle;
    text-align: center;
    font-size: 18pt;
    font-family: Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color: rgba(80,155,90,0.5);
    width:100%;
    margin: 10px 0px 10px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: default;
  }
  .link {
    cursor: pointer;
  }
  .header-small {
    font-size: 12pt;
    margin-top: 7px;
  }
  .img-small {
    margin-left: 10px;
    width: 25px;
    height: 25px;
  }
  .center {
    vertical-align: middle;
  }
</style>
