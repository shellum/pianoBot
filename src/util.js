export const util = {
  getStatsFromFullPayload: function(fullPayload) {
    var rights = []
    var wrongs = []
    var timeInEachSession = []
    var timeLens = []
    var sessions = []
    var averageTimePerNote = []
    var currentRights = 0
    var currentWrongs = 0
    var currentTimePerNote = 0
    var currentTimeInSession = 0
    var currentTimeLens = 0

    var mostRecentSession = Object.keys(fullPayload).reduce((acc,curr)=>{
      if (parseInt(curr,10) > acc)
        return parseInt(curr,10)
      else
        return acc
    },0)

    Object.keys(fullPayload[mostRecentSession]).map(function(sKey,sIndex) {

      var note = fullPayload[mostRecentSession][sKey]
      var right = note.right
      var wrong = note.wrong
      var timesSum = note.times.reduce((acc,curr)=> {return acc+curr},0)
      var timeLen = note.times.length
      currentRights+=right
      currentWrongs+=wrong
      currentTimeInSession+=timesSum
      currentTimeLens+=timeLen
    })
    currentTimePerNote = currentTimeInSession/Math.max(1,currentTimeLens)

    Object.keys(fullPayload).map(function(hKey,hIndex) {
        var session = fullPayload[hKey]
        rights.push(0)
        wrongs.push(0)
        timeInEachSession.push(0)
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
            timeInEachSession[timeInEachSession.length-1]+=timesSum
            timeLens[timeLens.length-1]+=timeLen
        })
    })
    timeInEachSession.forEach(function (value, i) {
        averageTimePerNote.push(timeInEachSession[i]/Math.max(1,timeLens[i]))
    })

    return {
      rights: rights,
      wrongs: wrongs,
      averageTimePerNote: averageTimePerNote,
      timeInEachSession: timeInEachSession,
      sessions: sessions,
      currentRights: currentRights,
      currentWrongs: currentWrongs,
      currentTimePerNote: currentTimePerNote,
      currentTimeInSession: currentTimeInSession
    }
  }
}
