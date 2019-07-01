<script>
import { Bar } from 'vue-chartjs'
import { util } from '../main'

export default {
  extends: Bar,
  props: ['username'],
  data: () => ({
    chartdata: {
      labels: ['1','2','3','4','5','6'],
      datasets: [
        
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    var history = util.getHistoryFromCookie(this.username)
    var rights = []
    var wrongs = []
    var times = []
    var sessions = []
    Object.keys(history).map(function(hKey,hIndex) {
        var session = history[hKey]
        rights.push(0)
        wrongs.push(0)
        times.push(0)
        sessions.push(0)
        Object.keys(session).map(function(sKey,sIndex) {
            var note = session[sKey]
            var right = note.right
            var wrong = note.wrong
            var times = note.times
            console.log('session['+hKey+'], note['+sKey+'] '+right+' - '+wrong)
            rights[rights.length-1]+=right
            wrongs[wrongs.length-1]+=wrong
        })
    })
    this.chartdata.datasets.push({
          label: 'Correct',
          backgroundColor: 'rgba(80,155,90,1)',
          data: rights
    })
    this.chartdata.datasets.push({
          label: 'Incorrect',
          backgroundColor: '#FF7F50',
          data: wrongs
    })
    this.chartdata.labels = sessions
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>