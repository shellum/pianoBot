<script>
import { Bar } from 'vue-chartjs'
import { util } from '../main'

export default {
  extends: Bar,
  props: ['username'],
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
 console.log('tu: '+this.username)
    var history = {}
           var that = this
            var docRef = db.collection("sessions").doc(this.username);
            docRef.get().then(function(doc) {
              console.log(doc.data())
                var cookieObj = {}
                if (doc.exists) {
                    cookieObj = doc.data()
                    console.log('exists: '+doc.exists)
                }
                that.history = cookieObj
                var rights = []
                var wrongs = []
                var times = []
                var timeLens = []
                var sessions = []
                var reducedTimes = []
                Object.keys(that.history).map(function(hKey,hIndex) {
                    var session = that.history[hKey]
                    rights.push(0)
                    wrongs.push(0)
                    times.push(0)
                    timeLens.push(0)
                    sessions.push(rights.length)
                    Object.keys(session).map(function(sKey,sIndex) {
                        var note = session[sKey]
                        var right = note.right
                        var wrong = note.wrong
                        var timesSum = note.times.reduce((acc,curr)=> {return acc+curr},0)
                        var timeLen = note.times.length
                        rights[rights.length-1]+=right
                        wrongs[wrongs.length-1]+=wrong
                        times[times.length-1]+=timesSum
                        timeLens[timeLens.length-1]+=timeLen
                    })
                    times.forEach(function (value, i) {
                        reducedTimes.push(times[i]/Math.max(1,timeLens[i]))
                    })
                })
                that.chartdata.datasets.push({
                      label: 'Correct',
                      id: "y-axis-0",
                      backgroundColor: 'rgba(80,155,90,1)',
                      data: rights
                })
                that.chartdata.datasets.push({
                      label: 'Incorrect',
                      id: "y-axis-0",
                      backgroundColor: '#FF7F50',
                      data: wrongs
                })
                that.chartdata.datasets.push({
                      label: 'Average sec/note',
                      id: "y-axis-1",
                      backgroundColor: 'rgb(0,191,255)',
                      data: reducedTimes
                })
                that.chartdata.labels = sessions
                that.renderChart(that.chartdata, that.options)
            })
            
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
  }
}
</script>

<style>
</style>