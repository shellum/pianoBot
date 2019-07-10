<script>
import { Bar } from 'vue-chartjs'
import { util } from '../util'
import { eventBus } from '../main'

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
    var history = {}
           var that = this
            var docRef = db.collection("sessions").doc(this.username);
            docRef.get().then(function(doc) {
                var cookieObj = {}
                if (doc.exists) {
                    cookieObj = doc.data()
                    eventBus.$emit('badgesUpdate',cookieObj.badges)
                }
                var stats = util.getStatsFromFullPayload(cookieObj)
                that.chartdata.datasets.push({
                      label: 'Correct',
                      id: "y-axis-0",
                      backgroundColor: 'rgba(80,155,90,1)',
                      data: stats.rights
                })
                that.chartdata.datasets.push({
                      label: 'Incorrect',
                      id: "y-axis-0",
                      backgroundColor: '#FF7F50',
                      data: stats.wrongs
                })
                that.chartdata.datasets.push({
                      label: 'Average sec/note',
                      id: "y-axis-1",
                      backgroundColor: 'rgb(0,191,255)',
                      data: stats.averageTimePerNote
                })
                that.chartdata.labels = stats.sessions
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
