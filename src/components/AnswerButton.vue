<template>
    <div class="answer has-text-centered" :class="{wrong: wrong}">{{text}}</div>
</template>

<script>
import { eventBus } from '../main'
export default {
    data: function() {
        return {
            wrong: false,
        }
    },
    props: ['text'],
    created() {
        var that = this
        eventBus.$on('wrongAnswer', (noteInfo) => {
            var selectedNote = noteInfo.noteSelected.toLowerCase()
            var thisButton = that.text.toLowerCase()
            if (selectedNote == thisButton)
                that.wrong = true;
        })
        eventBus.$on('rightAnswer', (noteInfo) => {
            that.wrong = false;
        })

    }
}
</script>

<style scoped>
.answer {
    border-radius: 2px;
    font-weight: bold;
    font-size: 14pt;
    color: white;
    padding: 7px;
    transition: all .2s ease-in-out; 
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.wrong {
    background-color: red;
}
</style>