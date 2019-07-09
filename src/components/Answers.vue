<template>
    <div class="columns is-variable is-6">
        <div class="column"><AnswerButton @click.native="answer('c')" :text="'C'"></AnswerButton></div>
        <div class="column"><AnswerButton @click.native="answer('d')" :text="'D'"></AnswerButton></div>
        <div class="column"><AnswerButton @click.native="answer('e')" :text="'E'"></AnswerButton></div>
        <div class="column"><AnswerButton @click.native="answer('f')" :text="'F'"></AnswerButton></div>
        <div class="column"><AnswerButton @click.native="answer('g')" :text="'G'"></AnswerButton></div>
        <div class="column"><AnswerButton @click.native="answer('a')" :text="'A'"></AnswerButton></div>
        <div class="column"><AnswerButton @click.native="answer('b')" :text="'B'"></AnswerButton></div>
    </div>
</template>

<script>
import { eventBus } from '../main'
import AnswerButton from './AnswerButton.vue'
export default {
    data: function() {
        return {

        }
    },
    components: {
        AnswerButton
    },
    props: ['note'],
    methods: {
        answer(noteSelected) {
            if (this.note.split("")[0] != noteSelected) {
                eventBus.$emit('wrongAnswer', {note: this.note, noteSelected: noteSelected})
            }
            else
                eventBus.$emit('rightAnswer', {note: this.note, noteSelected: noteSelected})
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