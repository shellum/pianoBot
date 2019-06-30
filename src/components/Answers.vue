<template>
    <div class="columns is-variable is-6">
        <div class="column"><div class="answer has-text-centered" @click="answer('c')">C</div></div>
        <div class="column"><div class="answer has-text-centered" @click="answer('d')">D</div></div>
        <div class="column"><div class="answer has-text-centered" @click="answer('e')">E</div></div>
        <div class="column"><div class="answer has-text-centered" @click="answer('f')">F</div></div>
        <div class="column"><div class="answer has-text-centered" @click="answer('g')">G</div></div>
        <div class="column"><div class="answer has-text-centered" @click="answer('a')">A</div></div>
        <div class="column"><div class="answer has-text-centered" @click="answer('b')">B</div></div>
    </div>
</template>

<script>
import { eventBus } from '../main'
export default {
    data: function() {
        return {

        }
    },
    props: ['note'],
    methods: {
        answer(noteSelected) {
            console.log(noteSelected + ' : ' + this.note)
            if (this.note.split("")[0] != noteSelected) {
                console.log('emitting wrong from answer')
                eventBus.$emit('wrongAnswer', this.note)
            }
            else
                eventBus.$emit('rightAnswer', this.note)
        }
    }
}
</script>

<style scoped>
.answer {
    border-radius: 2px;
    font-weight: bold;
    font-size: 14pt;
    color: white;
    background-color: rgb(49, 160, 86);
    padding: 7px;
    transition: all .2s ease-in-out; 
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.answer:hover { transform: scale(1.1); }
</style>