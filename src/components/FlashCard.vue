<template>
    <div class="me">
        <canvas id='noteCanvas' height='300' width='300'>
        </canvas>
    </div>
</template>

<script type="text/javascript" charset="utf-8">
    var canvas
    var context
    var canvasWidth = 400
    var canvasHeight = 400
    var padding = canvasHeight / 3
    var spaceBetweenLines = (canvasHeight - padding * 2) / 4
    var mapAndSum = {
        'map': {},
        'sum': padding
    }
    var notes = ['c1','d1','e1','f1','g1','a1','b1','c2','d2','e2','f2']
    var reducer = (acc,curr)=> {
        var map = acc.map
        var sum = acc.sum
        map[curr] = sum
        return {
            'map': map,
            'sum': sum + (spaceBetweenLines/2)
        }
    }
    var noteMap = notes.reverse().reduce(reducer,mapAndSum).map
    function drawStaff() {
        var canvas = document.getElementById("noteCanvas")
        var context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.strokeStyle = "#555";
        context.fillStyle = "#555";
        for (let y of [0,1,2,3,4]) {
            context.beginPath();
            context.moveTo(padding/4, y * spaceBetweenLines + padding)
            context.lineTo(canvas.width - padding/4 ,y * spaceBetweenLines + padding)
            context.stroke()
        }
    }

    function drawNote(note) {
            var img = new Image;
            img.src = './dist/trebble.png';
            var canvas = document.getElementById("noteCanvas")
            var context = canvas.getContext("2d")
            img.onload = function(){
                context.drawImage(img,10,100);
            };
            context.strokeStyle = "#111";
            context.fillStyle = "#111";

            context.beginPath();
            context.ellipse(canvasWidth / 2, noteMap[note], 15, 20, Math.PI/2, 0, 2 * Math.PI);
            context.fill()

            if (note == 'c1') {
                context.beginPath();
                context.moveTo(canvasWidth / 2 - 30, 5 * spaceBetweenLines + padding)
                context.lineTo(canvasWidth / 2 + 30,5 * spaceBetweenLines + padding)
                context.stroke()
            }
    }

    export default {
        props: ['note'],
        mounted() {
            var canvas = document.getElementById("noteCanvas")
            var context = canvas.getContext("2d")
            canvas.width = canvasWidth
            canvas.height = canvasHeight

            drawStaff()
            drawNote(this.note)
        },
        watch: {
            note: function(newNote, oldNote) {
                drawStaff()
                drawNote(newNote)
            }
        }
    }
</script>

<style>
canvas {
   
}
.me {
    margin: 10px auto 10px auto;
    width: 400px;
    height: 400px;
}
</style>
    