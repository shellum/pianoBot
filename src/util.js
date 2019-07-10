export const util = {
  getNewBadges: function(currentBadges, fullPayload) {
    var stats = this.getStatsFromFullPayload(fullPayload)
    var badgesQualifiedFor = this.findBadgesQualifiedFor(stats)
    var newBadges = badgesQualifiedFor.filter(x => !currentBadges.includes(x))
    return newBadges
  },

  getBadgeInfo: function(badgeId) {
    if (badgeId == 'right1')
      return {id: 'right1', name: '5 Right', img: 'badge.png'}
    else if (badgeId == 'right2')
      return {id: 'right2', name: '100 Right', img: 'badge.png'}
    else if (badgeId == 'right3')
      return {id: 'right3', name: '500 Right', img: 'badge.png'}
    else if (badgeId == 'practice1')
      return {id: 'practice1', name: 'Great Practice', img: 'badge.png'}
    else if (badgeId == 'practice2')
      return {id: 'practice2', name: 'Monster Practice', img: 'badge.png'}
    else if (badgeId == 'speed1')
      return {id: 'speed1', name: 'Wind Quick', img: 'badge.png'}
  },

  findBadgesQualifiedFor: function(stats) {
    var badgesQualifiedFor = []
    if (stats.currentRights >= 5)
      badgesQualifiedFor.push('right1')
    if (stats.currentRights >= 100)
      badgesQualifiedFor.push('right2')
    if (stats.currentRights >= 500)
      badgesQualifiedFor.push('right3')
    if (stats.currentTimeInSession >= 5*60 && stats.currentTimePerNote < 15)
      badgesQualifiedFor.push('practice1')
    if (stats.currentTimeInSession >= 5*60 && stats.currentTimePerNote < 10)
      badgesQualifiedFor.push('practice2')
    if (stats.currentTimePerNote <= 10 && stats.currentRights >= 10)
      badgesQualifiedFor.push('speed1')
    return badgesQualifiedFor
  },

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

    var fullPayloadSessionKeys = Object.keys(fullPayload).filter(x => x != 'badges')

    var mostRecentSession = fullPayloadSessionKeys.reduce((acc,curr)=>{
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

    fullPayloadSessionKeys.map(function(hKey,hIndex) {
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
